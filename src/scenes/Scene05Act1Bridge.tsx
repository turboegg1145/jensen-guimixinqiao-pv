import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import { useAudioFrame } from "../data/audio";
import { CinemaStage } from "../cinema/CinemaStage";
import { DocPlate, PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";

// Stanza 5 (105.52s - 121.52s, 960 frames / 16.00s)
export const Scene05Act1Bridge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();

  const b0 = sec < 4.0; // 虽然老康总是笑笑的不计较
  const b1 = sec >= 4.0 && sec < 8.0; // 虽然密电总是让人烦恼
  const b2 = sec >= 8.0 && sec < 12.0; // 虽然芯片流向不能知道
  const b3 = sec >= 12.0; // 现在发道歉会不会太早

  const barsClose = interpolate(sec, [1.2, 3.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sheetDrop = interpolate(sec, [12.0, 15.8], [-120, 460], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sirenBlend = (Math.sin(sec * 2.2) + 1) * 0.5;

  return (
    <CinemaStage
      mood={b0 ? "amberBar" : b1 ? "crimsonAlarm" : b2 ? "emeraldVault" : "noirGold"}
      rain={b1 ? 0.45 : 0.15}
      bokeh={b3 ? 0.28 : 0.68}
      anamorphicFlare={b3 ? 0.25 : 0.72}
    >
      {/* Beat 0: Warm Bar Toast Behind Heavy Vertical Cell Steel Bars Slamming + Smooth Sirens */}
      {b0 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="whiskey_bar" tone="amber" opacity={0.58} scale={1.08} blurPx={3} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 25% 35%, rgba(255,46,76,${
                0.32 * sirenBlend
              }), transparent 60%), radial-gradient(circle at 75% 35%, rgba(56,189,248,${
                0.32 * (1 - sirenBlend)
              }), transparent 60%)`,
              opacity: barsClose,
            }}
          />

          <div style={{ position: "absolute", left: "38%", bottom: 0, transform: "translateX(-50%)" }}>
            <PhotoCutout id="jensen_gesture" tone="amber" rimColor={COLORS.amber} rimPx={26} height={740} />
          </div>
          <div style={{ position: "absolute", left: "63%", top: "48%", transform: "translate(-50%, -50%)" }}>
            <PhotoCutout id="whiskey" tone="amber" rimColor={COLORS.amberHot} rimPx={28} height={420} />
          </div>

          {Array.from({ length: 11 }).map((_, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: 160 + idx * 158,
                top: 0,
                bottom: 0,
                width: 24,
                background: "linear-gradient(90deg, #050709 0%, #3E4A59 42%, #070A0D 100%)",
                boxShadow: "10px 0 36px rgba(0,0,0,0.92)",
                transform: `translateY(${(1 - barsClose) * -1080}px) translateZ(110px)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Beat 1: Vintage Rotary Phone & Handset With Darting Crimson Morse Pulses */}
      {b1 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="taipei_neon" tone="crimson" opacity={0.42} scale={1.08} blurPx={4} />
          <div style={{ position: "absolute", left: "36%", bottom: 0, transform: "translateX(-50%)" }}>
            <PhotoCutout id="handset_woman" tone="crimson" rimColor={COLORS.crimson} rimPx={32} height={780} />
          </div>
          <div style={{ position: "absolute", left: "66%", top: "48%", transform: "translate(-50%, -50%)" }}>
            <PhotoCutout id="phone" tone="crimson" rimColor={COLORS.crimson} rimPx={28} height={450} />
          </div>

          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const x = ((frame * (16 + i * 2) + i * 240) % 2100) - 180;
              const y = 180 + (i % 6) * 125;
              const len = i % 3 === 0 ? 180 : 65;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={len}
                  height="6"
                  rx="3"
                  fill={COLORS.crimson}
                  opacity={0.45 + audio.rms * 0.42}
                />
              );
            })}
          </svg>
        </div>
      )}

      {/* Beat 2: Hardware GPUs Slipping Across Cold Horizon Line Into Dark Fog */}
      {b2 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="wafer" tone="emerald" opacity={0.48} scale={1.08} blurPx={3} />
          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <line
              x1="0"
              y1="540"
              x2="1920"
              y2="540"
              stroke={COLORS.nvGreen}
              strokeWidth="2"
              strokeDasharray="8 18"
              opacity="0.45"
            />
          </svg>
          {Array.from({ length: 8 }).map((_, i) => {
            const p = ((sec - 7.96) * 0.45 + i * 0.14) % 1.25;
            const x = 140 + p * 1650;
            const y = 300 + (i % 4) * 125 + Math.sin(sec * 2 + i) * 35;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  transform: `translate(-50%, -50%) translateZ(${(i % 3) * 80 - 80}px)`,
                  opacity: Math.max(0, 1 - Math.abs(p - 0.52) * 1.85),
                }}
              >
                <PhotoCutout
                  id="gpu"
                  tone={i % 3 === 0 ? "amber" : "emerald"}
                  rimColor={i % 3 === 0 ? COLORS.amber : COLORS.nvLime}
                  rimPx={18}
                  height={165}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Beat 3: "现在发道歉会不会太早" — Overhead Spot + Real Document Fluttering Gently Down */}
      {b3 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <div style={{ position: "absolute", inset: -60, filter: "blur(28px)", pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -20,
                width: 620,
                height: 1220,
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 75%, transparent 100%)",
                clipPath: "polygon(36% 0%, 64% 0%, 88% 100%, 12% 100%)",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: `calc(50% + ${Math.sin(sec * 2.1) * 75}px)`,
              top: sheetDrop,
              transform: `translate(-50%, -50%) rotateX(${46 + Math.sin(sec * 2) * 16}deg) rotateY(${
                Math.cos(sec * 1.7) * 22
              }deg) rotateZ(${Math.sin(sec * 1.3) * 14}deg)`,
            }}
          >
            <DocPlate id="nsa" width={290} tone="amber" opacity={0.9} />
          </div>
        </div>
      )}
    </CinemaStage>
  );
};
