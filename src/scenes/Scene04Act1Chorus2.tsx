import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import { useAudioFrame } from "../data/audio";
import { CinemaStage } from "../cinema/CinemaStage";
import { DocPlate, PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";

// Stanza 4 (87.52s - 105.52s, 1080 frames / 18.00s)
export const Scene04Act1Chorus2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();

  const b0 = sec < 4.0; // 是监听的巧合也好
  const b1 = sec >= 4.0 && sec < 8.0; // 是你存心的渗透也好
  const b2 = sec >= 8.0 && sec < 12.0; // 然而打码条已不再重要
  const b3 = sec >= 12.0; // 我愿意陪你被全球通报

  const peelProg = interpolate(sec, [8.0, 11.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const makeOscPath = (yBase: number, ampMul: number, phaseOffset: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= 1920; x += 30) {
      const bandIdx = Math.floor((x / 1920) * 16) % 16;
      const energy = audio.bands[bandIdx] ?? 0.2;
      const y =
        yBase +
        Math.sin(x * 0.014 + sec * 7 + phaseOffset) * (20 + energy * ampMul) +
        Math.cos(x * 0.032 - sec * 5) * (8 + audio.rms * 24);
      pts.push(`${x === 0 ? "M" : "L"} ${x} ${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };

  // Gentle camera shutter bloom timed cleanly on 12.4s & 14.4s (NO harsh strobe flicker!)
  const shutter1 = Math.max(0, 1 - Math.abs(sec - 12.5) * 4.5);
  const shutter2 = Math.max(0, 1 - Math.abs(sec - 14.5) * 4.5);
  const shutterGlow = Math.max(shutter1, shutter2) * 0.45;

  return (
    <CinemaStage
      mood={b0 ? "amberBar" : b1 || b2 ? "crimsonAlarm" : "noirGold"}
      blinds={b0 ? 0.55 : 0}
      rain={b1 ? 0.25 : 0.12}
      bokeh={0.7}
      anamorphicFlare={0.82}
      camZ={b3 ? (sec - 12.0) * 14 : 0}
    >
      {/* Beat 0: Live Full-Width Audio Oscilloscopes Behind Vintage Rotary Phone & Handset */}
      {b0 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="capitol" tone="amber" opacity={0.42} scale={1.06} blurPx={3} />
          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <path d={makeOscPath(460, 180, 0)} fill="none" stroke={COLORS.amber} strokeWidth="3.5" opacity="0.82" />
            <path d={makeOscPath(540, 140, 2.2)} fill="none" stroke={COLORS.nvLime} strokeWidth="2.5" opacity="0.65" />
          </svg>

          <div
            style={{
              position: "absolute",
              left: "34%",
              bottom: 130,
              transform: `translate(-50%, 0) translateZ(75px) rotate(${Math.sin(sec * 1.1) * 2}deg)`,
            }}
          >
            <PhotoCutout id="phone" tone="amber" rimColor={COLORS.amber} rimPx={28} height={460} />
          </div>
          <div
            style={{
              position: "absolute",
              left: "64%",
              bottom: 0,
              transform: "translate(-50%, 0) translateZ(95px)",
            }}
          >
            <PhotoCutout id="handset_woman" tone="amber" rimColor={COLORS.crimson} rimPx={26} height={740} />
          </div>
        </div>
      )}

      {/* Beat 1: Concentric Crimson Radar Rings Pulsing Across Darkened Capitol & Wafer */}
      {b1 && (
        <div style={{ position: "absolute", inset: 0 }}>
          <PhotoBackdrop id="capitol" tone="crimson" opacity={0.46} scale={1.08} blurPx={2.5} />
          <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
            {[0, 1, 2, 3, 4].map((r) => {
              const p = (sec * 0.75 + r * 0.2) % 1;
              return (
                <circle
                  key={r}
                  cx="880"
                  cy="490"
                  r={40 + p * 860}
                  fill="none"
                  stroke={r % 2 === 0 ? COLORS.crimson : COLORS.amber}
                  strokeWidth={4 * (1 - p)}
                  opacity={(1 - p) * 0.82}
                />
              );
            })}
            <line
              x1="880"
              y1="490"
              x2={880 + Math.cos(sec * 2.4) * 900}
              y2={490 + Math.sin(sec * 2.4) * 900}
              stroke={COLORS.crimson}
              strokeWidth="4"
              opacity="0.72"
            />
          </svg>
        </div>
      )}

      {/* Beat 2: Authentic Declassified FBI/NSA Redacted Documents Beneath Peeling Black Bars */}
      {b2 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <div
            style={{
              position: "absolute",
              left: "30%",
              top: "49%",
              transform: `translate(-50%, -50%) translateZ(-40px) rotate(-6deg) scale(${0.92 + peelProg * 0.1})`,
              opacity: 0.78,
            }}
          >
            <DocPlate id="fbi" width={540} tone="amber" />
          </div>
          <div
            style={{
              position: "absolute",
              left: "70%",
              top: "51%",
              transform: `translate(-50%, -50%) translateZ(-20px) rotate(5deg) scale(${0.92 + peelProg * 0.1})`,
              opacity: 0.78,
            }}
          >
            <DocPlate id="nsa" width={540} tone="crimson" />
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 48%, rgba(255,220,160,0.42) 0%, transparent 65%)",
              opacity: peelProg,
            }}
          />

          {[0, 1, 2, 3, 4, 5].map((bar) => {
            const localPeel = Math.max(0, Math.min(1, peelProg * 1.4 - bar * 0.14));
            const dir = bar % 2 === 0 ? -1 : 1;
            return (
              <div
                key={bar}
                style={{
                  position: "absolute",
                  left: "-10%",
                  right: "-10%",
                  top: 85 + bar * 150,
                  height: 112,
                  background: "#020304",
                  borderTop: "2px solid rgba(255,46,76,0.35)",
                  borderBottom: "2px solid rgba(255,46,76,0.35)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.95)",
                  transform: `translate3d(${dir * localPeel * 1150}px, ${-localPeel * 120}px, ${
                    localPeel * 420
                  }px) rotateZ(${dir * localPeel * 18}deg)`,
                  opacity: 1 - localPeel * 0.85,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Beat 3: "我愿意陪你被全球通报" — Smooth Dolly Push-In Over Paparazzi & Crowd (Zero Shake) */}
      {b3 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop
            id="paparazzi"
            tone="gold"
            opacity={0.78}
            scale={1.04 + (sec - 12.0) * 0.025}
          />
          <PhotoBackdrop
            id="crowd_phones"
            tone="noir"
            opacity={0.45}
            scale={1.12}
            translateZ={40}
          />

          {shutterGlow > 0.01 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 50% 45%, #FFFFFF 0%, transparent 72%)",
                opacity: shutterGlow,
                mixBlendMode: "screen",
              }}
            />
          )}
        </div>
      )}
    </CinemaStage>
  );
};

