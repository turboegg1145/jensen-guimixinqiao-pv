import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import { useAudioFrame } from "../data/audio";
import { CinemaStage } from "../cinema/CinemaStage";
import { PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";
import { hash01 } from "../cinema/math";

// Stanza 10 + Silent Outro (220.06s - 256.67s, 2196 frames / 36.61s)
export const Scene11FinalAndOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();

  const b0 = sec < 3.45; // 虽然韭菜总是哭着把请愿搞
  const b1 = sec >= 3.45 && sec < 7.69; // 虽然大股东还想把我保
  const b2 = sec >= 7.69 && sec < 11.55; // 虽然身家会不会砍半刀
  const b3 = sec >= 11.55 && sec < 17.67; // 现在脱皮衣会不会太早
  const b4 = sec >= 17.67; // 19s Quiet Theatrical Outro — ZERO credits, ZERO small text!

  const scaleSplit = interpolate(sec, [9.55, 11.35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const jacketFadeIn = spring({
    frame: Math.max(0, frame - Math.round(11.55 * fps)),
    fps,
    config: { damping: 24, stiffness: 80 },
  });

  const outroPullZ = b4 ? -(sec - 17.67) * 28 : 0;
  const outroFadeOut = interpolate(sec, [26.0, 34.8], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <CinemaStage
      mood={b0 || b1 ? "emeraldVault" : "noirGold"}
      camRotateX={b0 ? 3 : 0}
      camZ={outroPullZ}
      beatShake={b3 || b4 ? 0.25 : 0.75}
      rain={b0 ? 0.85 : b1 ? 0.25 : 0.04}
      bokeh={b4 ? 0.88 * Math.max(0.15, outroFadeOut) : 0.65}
      anamorphicFlare={b3 || b4 ? 0.35 * outroFadeOut : 0.75}
      smoke={b4 ? 0.4 * outroFadeOut : 0.6}
    >
      {/* Beat 0: Heavy Rain Storm Over Real Midnight Crowd & Swaying Illuminated Green Leeks */}
      {b0 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="crowd" tone="emerald" opacity={0.74} scale={1.08} blurPx={1.5} />

          {/* Foreground chanting emerald leek sea swaying synchronously to music */}
          {Array.from({ length: 14 }).map((_, i) => {
            const x = i * 145 - 30 + (hash01(i * 19 + 5) - 0.5) * 95;
            const sc = 0.68 + hash01(i * 31 + 11) * 0.52;
            const sway = Math.sin(frame * 0.08 + i * 0.85) * (8 + audio.pulse * 7);
            const h = 480 + hash01(i * 61 + 3) * 140;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  bottom: -85 + hash01(i * 71 + 9) * 44,
                  transformOrigin: "bottom center",
                  transform: `rotate(${sway}deg) scale(${sc}) translateZ(${Math.round(hash01(i * 23) * 80)}px)`,
                  opacity: 0.78 + hash01(i * 43) * 0.2,
                }}
              >
                <PhotoCutout
                  id="leeks"
                  tone="emerald"
                  rimColor={i % 2 === 0 ? COLORS.nvLime : COLORS.nvGreen}
                  rimPx={24}
                  height={h}
                  flipX={hash01(i * 53 + 7) > 0.5}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Beat 1: Concentric Emerald & Gold Defense Halo Shielding Real Jensen Portrait */}
      {b1 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="nyse" tone="emerald" opacity={0.44} scale={1.06} blurPx={4} />

          <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%) translateZ(20px)" }}>
            <PhotoCutout id="jensen_closeup" tone="emerald" rimColor={COLORS.nvLime} rimPx={32} height={800} />
          </div>

          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <circle
              cx="960"
              cy="500"
              r={360 + audio.bass * 18}
              fill="none"
              stroke={COLORS.nvLime}
              strokeWidth="12"
              strokeDasharray="2180 90"
              strokeDashoffset={-frame * 2}
            />
            <circle cx="960" cy="500" r="405" fill="none" stroke={COLORS.gold} strokeWidth="3" opacity="0.65" />
            <path d="M 0 380 Q 480 480 510 500 Q 480 560 0 660 Z" fill={COLORS.crimson} opacity="0.24" />
            <path d="M 1920 380 Q 1440 480 1410 500 Q 1440 560 1920 660 Z" fill={COLORS.crimson} opacity="0.24" />
          </svg>
        </div>
      )}

      {/* Beat 2: Towering Courthouse & Real Antique Brass Balance Scale Cleaved Cleanly Down Center */}
      {b2 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="scotus" tone="noir" opacity={0.56} scale={1.06} blurPx={2.5} />

          {/* Left Cleaved Half */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "49%",
              clipPath: "inset(0 50% 0 0)",
              transform: `translate(-50%, -50%) translate3d(${-scaleSplit * 115}px, ${scaleSplit * 28}px, 50px) rotate(${
                -scaleSplit * 6 + Math.sin(sec * 2.5) * 2.5
              }deg)`,
            }}
          >
            <PhotoCutout id="scale" tone="gold" rimColor={COLORS.gold} rimPx={28} height={680} />
          </div>

          {/* Right Cleaved Half Plunging Downward */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "49%",
              clipPath: "inset(0 0 0 50%)",
              transform: `translate(-50%, -50%) translate3d(${scaleSplit * 125}px, ${scaleSplit * 118}px, 50px) rotate(${
                scaleSplit * 16 + Math.sin(sec * 2.5) * 2.5
              }deg)`,
            }}
          >
            <PhotoCutout id="scale" tone="gold" rimColor={COLORS.gold} rimPx={28} height={680} />
          </div>

          {scaleSplit > 0.01 && (
            <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              <line
                x1="960"
                y1="60"
                x2="960"
                y2="980"
                stroke="#FFFFFF"
                strokeWidth={Math.max(1.5, (1 - scaleSplit * 0.6) * 8)}
                opacity={Math.max(0.2, 1 - scaleSplit * 0.6)}
              />
            </svg>
          )}
        </div>
      )}

      {/* Beat 3 & 4 (11.55s - End): Solitary Overhead Spot on Iconic Empty Leather Jacket Rising Into Golden Embers */}
      {(b3 || b4) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: outroFadeOut,
            transformStyle: "preserve-3d",
          }}
        >
          <div style={{ position: "absolute", inset: -60, filter: "blur(32px)", pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -20,
                width: 680,
                height: 1220,
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, rgba(255,232,179,0.34) 0%, rgba(245,166,35,0.08) 68%, rgba(0,0,0,0) 100%)",
                clipPath: "polygon(38% 0%, 62% 0%, 88% 100%, 12% 100%)",
                opacity: b4 ? Math.max(0, 1 - (sec - 17.67) / 14) : 1,
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "49%",
              transform: `translate(-50%, -50%) translateZ(${b4 ? -(sec - 17.67) * 32 : 40}px) scale(${
                0.96 + jacketFadeIn * 0.06
              })`,
              opacity: jacketFadeIn * (b4 ? Math.max(0.08, 1 - (sec - 17.67) / 12) : 1),
            }}
          >
            <PhotoCutout
              id="jacket"
              tone="amber"
              rimColor={COLORS.amber}
              rimPx={30}
              height={620}
            />
          </div>

          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {Array.from({ length: 34 }).map((_, e) => {
              const x = 680 + hash01(e * 47) * 560 + Math.sin(sec * 0.9 + e) * 65;
              const y = ((820 - ((sec - 11.55) * (32 + (e % 4) * 14) + hash01(e * 83) * 800)) % 950 + 950) % 950;
              return (
                <circle
                  key={e}
                  cx={x}
                  cy={y}
                  r={1.8 + (e % 3) * 1.4}
                  fill={e % 5 === 0 ? COLORS.nvLime : COLORS.gold}
                  opacity={Math.max(0, (1 - Math.abs(y - 450) / 500) * 0.72)}
                />
              );
            })}
          </svg>
        </div>
      )}
    </CinemaStage>
  );
};
