import React from "react";
import { COLORS } from "../design/tokens";
import { useAudioFrame, useGlobalFrame } from "../data/audio";

export const GpuRig3D: React.FC<{
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  scale?: number;
  accent?: string;
  cracked?: boolean;
}> = ({
  rotateX = 18,
  rotateY = -22,
  rotateZ = -5,
  scale = 1,
  accent = COLORS.nvLime,
  cracked = false,
}) => {
  const frame = useGlobalFrame();
  const audio = useAudioFrame();
  const fanSpin = frame * 18;
  const glowCol = cracked ? COLORS.crimson : accent;

  return (
    <div
      style={{
        width: 580,
        height: 224,
        transformStyle: "preserve-3d",
        transform: `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        position: "relative",
        pointerEvents: "none",
      }}
    >
      {/* Back anodized plate */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          background: "#0A0C0F",
          border: "1.5px solid #252C35",
          transform: "translateZ(-26px)",
          boxShadow: `0 36px 90px rgba(0,0,0,0.9), 0 0 42px ${glowCol}22`,
        }}
      />

      {/* Copper + black aluminum cooling fin array */}
      <div
        style={{
          position: "absolute",
          inset: "4px 6px",
          borderRadius: 16,
          background:
            "repeating-linear-gradient(90deg, #171B21 0px, #171B21 3px, #353D47 3px, #353D47 5px, #85522F 5px, #85522F 6px)",
          transform: "translateZ(-13px)",
        }}
      />

      {/* Machined Titanium Vapor-Chamber Front Shroud (ZERO text labels) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          background:
            "linear-gradient(140deg, #2C333D 0%, #151920 42%, #0B0D11 100%)",
          border: `1.5px solid ${glowCol}77`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.28), 0 0 32px ${glowCol}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 26px",
          overflow: "hidden",
        }}
      >
        {/* Anisotropic diagonal light reflection */}
        <div
          style={{
            position: "absolute",
            top: -110,
            left: `${((frame * 2.1) % 210) - 65}%`,
            width: 110,
            height: 440,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)",
            transform: "rotate(26deg)",
          }}
        />

        {/* Hourglass structural spine + smooth energy vein */}
        <svg
          viewBox="0 0 580 224"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <path
            d="M 190 12 L 260 112 L 190 212 M 390 12 L 320 112 L 390 212"
            fill="none"
            stroke="#3C4654"
            strokeWidth="4"
          />
          <line
            x1="215"
            y1="112"
            x2="365"
            y2="112"
            stroke={glowCol}
            strokeWidth="3.5"
            opacity={0.7 + audio.rms * 0.28}
          />
        </svg>

        {/* Left & Right 11-Blade Axial Fans */}
        {[1, -0.94].map((dir, idx) => (
          <div
            key={idx}
            style={{
              width: 162,
              height: 162,
              borderRadius: "50%",
              background: "radial-gradient(circle, #06080A 52%, #1E252E 100%)",
              border: `1.5px solid ${glowCol}55`,
              boxShadow: "inset 0 0 28px #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <svg
              width="148"
              height="148"
              viewBox="0 0 148 148"
              style={{
                transform: `rotate(${cracked ? idx * 14 - 8 : fanSpin * dir}deg)`,
              }}
            >
              {Array.from({ length: 11 }).map((_, b) => (
                <path
                  key={b}
                  d="M74 74 C85 40, 112 24, 134 38 C118 60, 98 72, 74 74 Z"
                  fill="#181D24"
                  stroke="#36414F"
                  strokeWidth="1"
                  transform={`rotate(${b * (360 / 11)} 74 74)`}
                />
              ))}
              <circle
                cx="74"
                cy="74"
                r="22"
                fill="#0D1014"
                stroke={glowCol}
                strokeWidth="2"
              />
              <circle cx="74" cy="74" r="6" fill={glowCol} />
            </svg>
          </div>
        ))}

        {/* Crack fracture overlay */}
        {cracked && (
          <svg
            viewBox="0 0 580 224"
            style={{ position: "absolute", inset: 0, zIndex: 5 }}
          >
            <path
              d="M 225 0 L 254 58 L 236 105 L 284 162 L 266 224"
              stroke={COLORS.crimson}
              strokeWidth="4"
              fill="none"
            />
          </svg>
        )}
      </div>

      {/* PCIe Gold Finger Strip */}
      <div
        style={{
          position: "absolute",
          bottom: -12,
          left: 118,
          width: 224,
          height: 12,
          background:
            "repeating-linear-gradient(90deg, #E2B04A 0px, #E2B04A 4px, #121519 4px, #121519 7px)",
          borderRadius: "0 0 4px 4px",
        }}
      />
    </div>
  );
};

export const SiliconWaferDisc: React.FC<{
  size?: number;
  spinDeg?: number;
  tiltX?: number;
  glowColor?: string;
}> = ({ size = 620, spinDeg = 0, tiltX = 0, glowColor = COLORS.nvLime }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        transformStyle: "preserve-3d",
        transform: `rotateX(${tiltX}deg) rotateZ(${spinDeg}deg)`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: `conic-gradient(from 0deg, #1E242B 0deg, ${glowColor}55 38deg, #0D1117 85deg, ${COLORS.cyan}44 135deg, #1E242B 190deg, ${COLORS.amber}44 250deg, #0D1117 315deg, #1E242B 360deg)`,
          boxShadow: `0 0 70px ${glowColor}33, inset 0 0 40px rgba(255,255,255,0.18)`,
          border: `2px solid rgba(255,255,255,0.28)`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%", opacity: 0.45 }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <React.Fragment key={i}>
              <line x1={i * 25} y1="0" x2={i * 25} y2="400" stroke="#CBD5E1" strokeWidth="0.6" />
              <line x1="0" y1={i * 25} x2="400" y2={i * 25} stroke="#CBD5E1" strokeWidth="0.6" />
            </React.Fragment>
          ))}
          <circle cx="200" cy="200" r="196" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};
