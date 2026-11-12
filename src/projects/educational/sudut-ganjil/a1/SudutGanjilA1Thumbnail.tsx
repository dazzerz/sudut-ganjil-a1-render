import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export const SudutGanjilA1Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#07090F",
        width: 1920,
        height: 1080,
        overflow: "hidden",
        fontFamily: '"Arial Black", "Impact", "Inter", -apple-system, sans-serif',
      }}
    >
      <AbsoluteFill>
        <Img
          src={staticFile("images/sudut-ganjil/a1/thumb_bg.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(6,8,14,0.82) 0%, rgba(6,8,14,0.6) 36%, rgba(6,8,14,0.16) 54%, rgba(6,8,14,0) 78%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 235,
          left: 72,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          transform: "rotate(-4deg)",
          transformOrigin: "left center",
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.04,
            textTransform: "uppercase",
            WebkitTextStroke: "12px #0B0E14",
            paintOrder: "stroke fill",
            textShadow: "6px 6px 0px #000000, 10px 10px 20px rgba(0,0,0,0.85)",
            marginBottom: -4,
          }}
        >
          GAJI 5 JUTA
        </div>

        <div
          style={{
            fontSize: 136,
            fontWeight: 900,
            color: "#FFE600",
            letterSpacing: "-0.035em",
            lineHeight: 0.95,
            textTransform: "uppercase",
            WebkitTextStroke: "15px #0B0E14",
            paintOrder: "stroke fill",
            textShadow: "8px 8px 0px #000000, 12px 12px 25px rgba(0,0,0,0.9)",
            marginBottom: 22,
          }}
        >
          JADI ATM?!
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#E61919",
            padding: "10px 28px 12px 28px",
            borderRadius: 8,
            border: "3.5px solid #FFFFFF",
            boxShadow: "5px 5px 0px #000000, 0 8px 18px rgba(0,0,0,0.75)",
            transform: "rotate(-1.5deg)",
          }}
        >
          <span
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              WebkitTextStroke: "4px #000000",
              paintOrder: "stroke fill",
              textShadow: "2px 2px 0px #000000",
            }}
          >
            NOLAK = DURHAKA?
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 90,
          left: 690,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 35,
          pointerEvents: "none",
          transform: "rotate(-3deg)",
        }}
      >
        <span
          style={{
            fontFamily: '"Segoe Print", "Ink Free", "Caveat", cursive, sans-serif',
            fontSize: 34,
            fontWeight: 800,
            fontStyle: "italic",
            color: "#FFFFFF",
            textShadow:
              "0 0 8px #000000, 2px 2px 0 #000000, -2px -2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000",
            marginBottom: 2,
          }}
        >
          Sisa Rp23 ribu...
        </span>
        <svg width="68" height="54" viewBox="0 0 68 54" fill="none">
          <path d="M 18 6 Q 36 18 52 42" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path
            d="M 34 40 L 54 44 L 52 22"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
