import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import { useAudioFrame } from "../data/audio";
import { CinemaStage } from "../cinema/CinemaStage";
import { DocPlate, PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";

// Stanza 4 (88.10s - 105.86s, 1066 frames)
export const Scene04Act1Chorus2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();

  const b0 = sec < 3.76; // 是监听的巧合也好
  const b1 = sec >= 3.76 && sec < 7.71; // 是你存心的渗透也好
  const b2 = sec >= 7.71 && sec < 11.62; // 然而打码条已不再重要
  const b3 = sec >= 11.62; // 我愿意陪你被全球通报

  const peelProg = interpolate(sec, [7.71, 11.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const makeOscPath = (yBase: number, ampMul: number, phaseOffset: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= 1920; x += 30) {
      const bandIdx = Math.floor((x / 1920) * 16) % 16;
      const energy = audio.bands[bandIdx] ?? 0.2;
      const y =
        yBase +
        Math.sin(x * 0.014 + frame * 0.25 + phaseOffset) * (24 + energy * ampMul) +
        Math.cos(x * 0.032 - frame * 0.18) * (10 + audio.pulse * 32);
      pts.push(`${x === 0 ? "M" : "L"} ${x} ${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };

  return (
    <CinemaStage
      mood={b0 ? "amberBar" : b1 || b2 ? "crimsonAlarm" : "noirGold"}
      blinds={b0 ? 0.55 : 0}
      rain={b1 ? 0.25 : 0.12}
      bokeh={0.7}
      anamorphicFlare={0.82}
      camRotateZ={b3 ? Math.sin(frame * 0.18) * 1.4 : 0}
    >
      {/* Beat 0: Live Full-Width Audio Oscilloscopes Behind Vintage Rotary Phone & Handset */}
      {b0 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="capitol" tone="amber" opacity={0.42} scale={1.06} blurPx={3} />
          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <path d={makeOscPath(460, 190, 0)} fill="none" stroke={COLORS.amber} strokeWidth="3.5" opacity="0.82" />
            <path d={makeOscPath(540, 150, 2.2)} fill="none" stroke={COLORS.nvLime} strokeWidth="2.5" opacity="0.65" />
          </svg>

          <div
            style={{
              position: "absolute",
              left: "34%",
              bottom: 130,
              transform: `translate(-50%, 0) translateZ(75px) rotate(${Math.sin(sec * 2.2) * 3}deg)`,
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
              const p = (sec * 0.85 + r * 0.2) % 1;
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
              x2={880 + Math.cos(sec * 3.2) * 900}
              y2={490 + Math.sin(sec * 3.2) * 900}
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

      {/* Beat 3: "我愿意陪你被全球通报" — Real Phone Crowd Around Jensen + Strobing Press Flash */}
      {b3 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop
            id="paparazzi"
            tone="gold"
            opacity={0.78}
            scale={1.06 + audio.bass * 0.05}
            panX={Math.sin(sec * 1.5) * 18}
          />
          <PhotoBackdrop
            id="crowd_phones"
            tone="noir"
            opacity={0.35 + audio.pulse * 0.35}
            scale={1.12}
            translateZ={40}
          />

          {audio.pulse > 0.76 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#FFFFFF",
                opacity: (audio.pulse - 0.76) * 1.6,
                mixBlendMode: "screen",
              }}
            />
          )}
        </div>
      )}
    </CinemaStage>
  );
};
