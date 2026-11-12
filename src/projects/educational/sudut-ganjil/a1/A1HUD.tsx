import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { A1_SEGMENTS } from "./a1_scenes";

const TEXT_SHADOW = "0 3px 12px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,1)";

export const A1HUD: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const seg =
    A1_SEGMENTS.find((s) => frame >= s.start_frame && frame < s.start_frame + s.duration_frames + 6) ??
    A1_SEGMENTS[frame < 1 ? 0 : A1_SEGMENTS.length - 1];

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const progress = Math.min(100, Math.max(0, (frame / durationInFrames) * 100));

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: "rgba(255,255,255,0.12)",
          zIndex: 60,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #FF5E57, #FFD166)",
            boxShadow: "0 0 10px rgba(255,94,87,0.8)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 300,
          background:
            "linear-gradient(to top, rgba(8,8,12,0.88) 0%, rgba(8,8,12,0.48) 55%, rgba(8,8,12,0) 100%)",
          pointerEvents: "none",
          zIndex: 40,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 38,
          left: 70,
          opacity: fadeIn,
          zIndex: 45,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "'Inter', system-ui, sans-serif",
          textShadow: TEXT_SHADOW,
        }}
      >
        <span style={{ fontSize: 19, fontWeight: 900, letterSpacing: 3, color: "#FFD166" }}>
          BABAK {String(seg.babak).padStart(2, "0")}
        </span>
        <div style={{ width: 2, height: 20, backgroundColor: "rgba(255,255,255,0.55)" }} />
        <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: 1, color: "#FFFFFF" }}>
          {seg.scene_title}
        </span>
      </div>
    </>
  );
};
