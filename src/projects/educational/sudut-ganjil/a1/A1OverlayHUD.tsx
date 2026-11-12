import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { A1_FPS, A1_SEGMENTS, A1Overlay } from "./a1_scenes";

const SHADOW = "0 4px 18px rgba(0,0,0,0.95), 0 0 3px rgba(0,0,0,1)";

const SaldoOverlay: React.FC<{ label: string; value: string; color: string; f: number; dur: number }> = ({
  label,
  value,
  color,
  f,
  dur,
}) => {
  const enter = spring({ frame: f - 10, fps: A1_FPS, config: { damping: 16, stiffness: 180 } });
  const exit = interpolate(f, [dur - 12, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(enter, [0, 1], [-24, 0]);
  return (
    <div
      style={{
        position: "absolute",
        top: 42,
        right: 70,
        opacity: enter * exit,
        translate: `0 ${y}px`,
        textAlign: "right",
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        textShadow: SHADOW,
        zIndex: 55,
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 3, color: "#E2E8F0" }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 48,
          fontWeight: 900,
          color,
          WebkitTextStroke: "4px #000",
          paintOrder: "stroke fill",
          lineHeight: 1.1,
          marginTop: 4,
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 8,
          marginLeft: "auto",
          height: 3,
          width: 260 * enter,
          background: `linear-gradient(270deg, ${color}, rgba(255,255,255,0))`,
        }}
      />
    </div>
  );
};

const ChatOverlay: React.FC<{ sender: string; msg: string; f: number; dur: number }> = ({
  sender,
  msg,
  f,
  dur,
}) => {
  const enter = spring({ frame: f - 14, fps: A1_FPS, config: { damping: 17, stiffness: 170 } });
  const exit = interpolate(f, [dur - 14, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = interpolate(enter, [0, 1], [60, 0]);
  return (
    <div
      style={{
        position: "absolute",
        top: 108,
        right: 70,
        maxWidth: 640,
        opacity: enter * exit,
        translate: `${x}px 0`,
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        textShadow: SHADOW,
        borderRight: "4px solid #25D366",
        paddingRight: 20,
        textAlign: "right",
        background: "linear-gradient(270deg, rgba(10,14,18,0.82) 0%, rgba(10,14,18,0.2) 100%)",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 28,
        zIndex: 55,
      }}
    >
      <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: 2, color: "#25D366" }}>
        PESAN MASUK  /  {sender.toUpperCase()}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF", lineHeight: 1.28, marginTop: 6 }}>
        &ldquo;{msg}&rdquo;
      </div>
    </div>
  );
};

const TagihanOverlay: React.FC<{ items: string[]; f: number; dur: number }> = ({ items, f, dur }) => {
  const exit = interpolate(f, [dur - 12, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        top: 106,
        right: 70,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 10,
        opacity: exit,
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        textShadow: SHADOW,
        zIndex: 55,
      }}
    >
      {items.map((item, idx) => {
        const s = spring({ frame: f - (12 + idx * 18), fps: A1_FPS, config: { damping: 16, stiffness: 190 } });
        return (
          <div
            key={idx}
            style={{
              opacity: s,
              translate: `${interpolate(s, [0, 1], [35, 0])}px 0`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 28,
              fontWeight: 900,
              color: "#FF6B6B",
              WebkitTextStroke: "3px #000",
              paintOrder: "stroke fill",
            }}
          >
            <span>{item}</span>
            <div style={{ width: 32 * s, height: 2, backgroundColor: "#FF6B6B" }} />
          </div>
        );
      })}
    </div>
  );
};

const BREAKDOWN_STEPS = [
  { label: "GAJI BERSIH", amount: "Rp5.000.000", color: "#FFFFFF", sisa: "Rp5.000.000" },
  { label: "KOS + LISTRIK + KUOTA", amount: "-Rp1.550.000", color: "#FF6B6B", sisa: "Rp3.450.000" },
  { label: "MAKAN HARIAN WARTEG", amount: "-Rp1.400.000", color: "#FF6B6B", sisa: "Rp2.050.000" },
  { label: "TRANSPORT + IURAN KERJA", amount: "-Rp500.000", color: "#FF6B6B", sisa: "Rp1.550.000" },
];

const BreakdownOverlay: React.FC<{ step: number; f: number; dur: number }> = ({ step, f, dur }) => {
  const enter = spring({ frame: f - 8, fps: A1_FPS, config: { damping: 16, stiffness: 170 } });
  const exit = interpolate(f, [dur - 10, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const visible = BREAKDOWN_STEPS.slice(0, Math.min(BREAKDOWN_STEPS.length, step + 1));
  const current = visible[visible.length - 1];
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        right: 70,
        opacity: enter * exit,
        textAlign: "right",
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        textShadow: SHADOW,
        zIndex: 55,
      }}
    >
      <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: 3, color: "#FFD166" }}>
        HITUNGAN NYATA PER BULAN
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
        {visible.map((row, i) => (
          <div
            key={i}
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: row.color,
              WebkitTextStroke: "2px #000",
              paintOrder: "stroke fill",
            }}
          >
            {row.label}: {row.amount}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          paddingTop: 8,
          borderTop: "2px solid rgba(255,209,102,0.8)",
          fontSize: 38,
          fontWeight: 900,
          color: step >= 3 ? "#FFE600" : "#FFFFFF",
          WebkitTextStroke: "4px #000",
          paintOrder: "stroke fill",
        }}
      >
        SISA: {current.sisa}
      </div>
    </div>
  );
};

export const A1OverlayHUD: React.FC = () => {
  const frame = useCurrentFrame();
  const seg = A1_SEGMENTS.find(
    (s) => frame >= s.start_frame && frame < s.start_frame + s.duration_frames + 6
  );
  if (!seg || !seg.overlay) return null;

  const f = frame - seg.start_frame;
  const dur = seg.duration_frames;
  const ov: A1Overlay = seg.overlay;

  if (ov.type === "saldo" || ov.type === "pos") {
    return <SaldoOverlay label={ov.label} value={ov.value} color={ov.color} f={f} dur={dur} />;
  }
  if (ov.type === "chat") {
    return <ChatOverlay sender={ov.sender} msg={ov.msg} f={f} dur={dur} />;
  }
  if (ov.type === "tagihan") {
    return <TagihanOverlay items={ov.items} f={f} dur={dur} />;
  }
  if (ov.type === "breakdown") {
    return <BreakdownOverlay step={ov.step} f={f} dur={dur} />;
  }
  return null;
};
