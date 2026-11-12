import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { A1_FPS, A1_SEGMENTS } from "./a1_scenes";

const CHUNK_SIZE = 12;

export const A1Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const seg = A1_SEGMENTS.find(
    (s) => frame >= s.start_frame && frame < s.start_frame + s.duration_frames + 6
  );
  if (!seg) return null;

  const f = frame - seg.start_frame;
  const color = seg.tone === "cool" ? "#FFE600" : "#FFFFFF";
  const allWords = seg.clean_text.split(/\s+/).filter(Boolean);

  const chunks: { words: string[]; weight: number }[] = [];
  for (let i = 0; i < allWords.length; i += CHUNK_SIZE) {
    const slice = allWords.slice(i, i + CHUNK_SIZE);
    const weight = slice.reduce((acc, w) => acc + w.length + 2, 0);
    chunks.push({ words: slice, weight });
  }

  const totalWeight = chunks.reduce((a, c) => a + c.weight, 0);
  const t0 = 3;
  const t1 = Math.max(t0 + 10, seg.duration_frames - 4);
  const overallProgress = Math.min(1, Math.max(0, (f - t0) / (t1 - t0)));

  let accW = 0;
  let activeChunkIdx = chunks.length - 1;
  let chunkStartProgress = 0;
  let chunkEndProgress = 1;

  for (let i = 0; i < chunks.length; i++) {
    const frac = chunks[i].weight / totalWeight;
    if (overallProgress <= accW + frac || i === chunks.length - 1) {
      activeChunkIdx = i;
      chunkStartProgress = accW;
      chunkEndProgress = accW + frac;
      break;
    }
    accW += frac;
  }

  const chunk = chunks[activeChunkIdx] ?? chunks[0];
  const chunkWords = chunk.words;
  const chunkRelProgress =
    chunkEndProgress > chunkStartProgress
      ? Math.min(1, Math.max(0, (overallProgress - chunkStartProgress) / (chunkEndProgress - chunkStartProgress)))
      : 1;

  const wWeights = chunkWords.map((w) => w.length + 2);
  const wTotal = wWeights.reduce((a, b) => a + b, 0);
  let wAcc = 0;
  let activeWordIdx = chunkWords.length - 1;
  for (let i = 0; i < chunkWords.length; i++) {
    wAcc += wWeights[i] / wTotal;
    if (chunkRelProgress <= wAcc) {
      activeWordIdx = i;
      break;
    }
  }

  const chunkStartFrame = t0 + chunkStartProgress * (t1 - t0);
  const fInChunk = Math.max(0, f - chunkStartFrame);

  const exit = interpolate(f, [seg.duration_frames - 4, seg.duration_frames + 5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        bottom: 66,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: exit,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div
        key={`${seg.id}-c${activeChunkIdx}`}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 16,
          rowGap: 4,
          maxWidth: 1580,
          textAlign: "center",
        }}
      >
        {chunkWords.map((w, i) => {
          const enter = spring({
            frame: fInChunk - Math.min(i * 1.1, 12),
            fps: A1_FPS,
            config: { damping: 18, stiffness: 190 },
          });
          const rise = interpolate(enter, [0, 1], [100, 0]);
          const isActive = i === activeWordIdx && overallProgress < 1;
          const wordColor = isActive ? (seg.tone === "cool" ? "#00F2FE" : "#FFE600") : color;
          const liftY = isActive ? -4 : 0;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                translate: `0 ${liftY}px`,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  padding: "8px 6px 14px",
                  margin: "-8px -6px -14px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    translate: `0 ${rise}%`,
                    fontFamily: "'Plus Jakarta Sans', 'Outfit', system-ui, sans-serif",
                    fontSize: 48,
                    fontWeight: 900,
                    lineHeight: 1.28,
                    color: wordColor,
                    WebkitTextStroke: "8px #000",
                    paintOrder: "stroke fill",
                    textShadow: isActive
                      ? `0 0 22px ${wordColor}, 0 5px 16px rgba(0,0,0,0.95)`
                      : "0 5px 16px rgba(0,0,0,0.9)",
                  }}
                >
                  {w}
                </span>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
