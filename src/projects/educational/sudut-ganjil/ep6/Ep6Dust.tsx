import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface Ep6DustProps {
  count?: number;
  seed?: number;
  tint?: string;
}

const rand = (n: number) => {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const Ep6Dust: React.FC<Ep6DustProps> = ({
  count = 26,
  seed = 1,
  tint = "255, 226, 170",
}) => {
  const frame = useCurrentFrame();
  const motes = Array.from({ length: count }, (_, i) => {
    const r1 = rand(i + seed * 17);
    const r2 = rand(i * 3 + seed * 31);
    const r3 = rand(i * 7 + seed * 53);
    const speed = 0.25 + r3 * 0.6;
    const x = (((r1 * 1920 + Math.sin(frame / (50 + r2 * 40) + i) * 36) % 1920) + 1920) % 1920;
    const y = (((r2 * 1080 - frame * speed) % 1080) + 1080) % 1080;
    const size = 3 + r3 * 7;
    const twinkle = interpolate(Math.sin(frame / (14 + r1 * 18) + i * 2), [-1, 1], [0.1, 0.72]);
    return { x, y, size, twinkle, key: i };
  });

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {motes.map((m) => (
        <div
          key={m.key}
          style={{
            position: "absolute",
            left: m.x,
            top: m.y,
            width: m.size,
            height: m.size,
            borderRadius: "50%",
            background: `rgba(${tint}, ${m.twinkle})`,
            boxShadow: `0 0 ${m.size * 3}px rgba(${tint}, ${m.twinkle * 0.8})`,
          }}
        />
      ))}
    </div>
  );
};
