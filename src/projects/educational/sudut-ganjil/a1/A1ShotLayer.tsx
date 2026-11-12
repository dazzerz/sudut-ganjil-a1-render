import React from "react";
import { Easing, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Ep6Dust } from "../ep6/Ep6Dust";
import { A1Shot } from "./a1_scenes";

export const A1_XFADE = 8;

const smooth = Easing.bezier(0.42, 0, 0.2, 1);

const CAM_MOVES = [
  { s0: 1.0, s1: 1.12, x0: 0, x1: -28, y0: 0, y1: -10 },
  { s0: 1.12, s1: 1.02, x0: 24, x1: -10, y0: -10, y1: 6 },
  { s0: 1.02, s1: 1.13, x0: -22, x1: 22, y0: 8, y1: -8 },
  { s0: 1.0, s1: 1.1, x0: 26, x1: -18, y0: -6, y1: 8 },
  { s0: 1.1, s1: 1.0, x0: -24, x1: 14, y0: 10, y1: -6 },
];

const PlaceTag: React.FC<{ text: string }> = ({ text }) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [4, 20, 120, 146], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const reveal = interpolate(f, [4, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        top: 104,
        opacity,
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: 20,
        fontWeight: 800,
        letterSpacing: 3,
        color: "#FFFFFF",
        textShadow: "0 3px 12px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            backgroundColor: "#FF5E57",
            boxShadow: "0 0 10px #FF5E57",
            opacity: f % 28 < 16 ? 1 : 0.35,
          }}
        />
        <span>{text}</span>
      </div>
      <div
        style={{
          marginTop: 8,
          height: 2,
          width: 340 * reveal,
          background: "linear-gradient(90deg, #FFD166, rgba(255,209,102,0))",
        }}
      />
    </div>
  );
};

const ShotFrame: React.FC<{ shot: A1Shot; length: number }> = ({ shot, length }) => {
  const f = useCurrentFrame();
  const cam = CAM_MOVES[shot.index % CAM_MOVES.length];
  const t = interpolate(f, [0, length], [0, 1], { extrapolateRight: "clamp", easing: smooth });

  // Subtle dynamic punch-in halfway through longer shots (>6s) to keep visual pulse alive
  const midPunch =
    length > 180
      ? interpolate(f, [Math.floor(length * 0.48), Math.floor(length * 0.48) + 18], [0, 0.045], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })
      : 0;

  const scale = cam.s0 + (cam.s1 - cam.s0) * t + midPunch;
  const x = cam.x0 + (cam.x1 - cam.x0) * t;
  const y = cam.y0 + (cam.y1 - cam.y0) * t;
  const glow = interpolate(Math.sin(f / 34), [-1, 1], [0.97, 1.04]);
  const opacity =
    shot.index === 0 ? 1 : interpolate(f, [0, A1_XFADE], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity }}>
      <img
        src={staticFile(shot.image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: String(scale),
          translate: `${x}px ${y}px`,
          filter: `brightness(${glow}) contrast(1.05) saturate(1.06)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 50%, rgba(6,6,10,0.6) 100%)",
        }}
      />
      <Ep6Dust count={20} seed={shot.index + 7} tint={shot.tone === "warm" ? "255,226,170" : "180,220,255"} />
      {shot.placeLabel ? <PlaceTag text={shot.placeLabel} /> : null}
    </div>
  );
};

export const A1ShotLayer: React.FC<{ shot: A1Shot }> = ({ shot }) => {
  const from = Math.max(0, shot.index === 0 ? 0 : shot.start - A1_XFADE);
  const length = shot.end - from;
  return (
    <Sequence from={from} durationInFrames={length}>
      <ShotFrame shot={shot} length={length} />
    </Sequence>
  );
};
