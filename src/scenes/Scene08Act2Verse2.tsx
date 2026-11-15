import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import { useAudioFrame } from "../data/audio";
import { CinemaStage } from "../cinema/CinemaStage";
import { PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";
import { hash01 } from "../cinema/math";

// Stanza 7 (169.73s - 186.02s, 977 frames)
export const Scene08Act2Verse2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();

  const b0 = sec < 3.86; // 股东问我窝边草是哪里好
  const b1 = sec >= 3.86 && sec < 8.03; // 圣何塞那晚我忘不了
  const b2 = sec >= 8.03 && sec < 11.79; // 期权再贵也比不上你的笑
  const b3 = sec >= 11.79; // 没丢过官的人不会明了

  const corridorPush = interpolate(sec, [3.86, 8.03], [1.02, 1.32], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const doorCrack = interpolate(sec, [4.6, 7.2], [0.16, 0.56], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shutterFlash = Math.max(0, 1 - Math.abs(sec - 6.45) * 4.8);
  const chairTurnDeg = interpolate(sec, [11.79, 15.8], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const chairSpinScaleX = Math.cos((chairTurnDeg * Math.PI) / 180);
  const spotDim = interpolate(sec, [13.5, 16.0], [1, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <CinemaStage
      mood={b0 ? "emeraldVault" : b1 || b2 ? "amberBar" : "noirGold"}
      camRotateY={b0 ? Math.sin(sec) * 3 : b3 ? 4 : 0}
      rain={b0 ? 0.25 : 0.1}
      bokeh={b2 ? 0.85 : 0.55}
      anamorphicFlare={b1 ? 0.82 : 0.45}
    >
      {/* Beat 0: Vibrant Real Green Leeks/Grass Foliage Under Sweeping Searchlights */}
      {b0 && (
        <div style={{ position: "absolute", inset: 0 }}>
          <PhotoBackdrop id="road_fog" tone="emerald" opacity={0.48} scale={1.08} blurPx={3} />
          <div
            style={{
              position: "absolute",
              left: `${interpolate(sec, [0, 3.86], [-20, 100])}%`,
              top: -120,
              width: 320,
              height: 1300,
              background: `linear-gradient(90deg, transparent, ${COLORS.crimson}44, transparent)`,
              transform: "rotate(-18deg)",
            }}
          />

          {/* Foreground organic swaying real green grass/leek cluster */}
          {Array.from({ length: 13 }).map((_, g) => {
            const x = g * 155 + (hash01(g * 19) - 0.5) * 90;
            const sc = 0.72 + hash01(g * 31) * 0.52;
            const sway = Math.sin(frame * 0.06 + g * 0.75) * (6 + audio.mid * 5);
            return (
              <div
                key={g}
                style={{
                  position: "absolute",
                  left: x,
                  bottom: -85 + (hash01(g * 71) * 44),
                  transformOrigin: "bottom center",
                  transform: `rotate(${sway}deg) scale(${sc})`,
                  opacity: 0.78 + hash01(g * 43) * 0.2,
                }}
              >
                <PhotoCutout
                  id="leeks"
                  tone="emerald"
                  rimColor={COLORS.nvLime}
                  rimPx={16}
                  height={560}
                  flipX={g % 2 === 1}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Beat 1: Authentic Dim Crimson Hotel Corridor Push-In + Soft Doorway Carpet Glow + Catch Flash */}
      {b1 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="corridor" tone="amber" opacity={0.88} scale={corridorPush} blurPx={0.8} translateZ={-40} />

          {/* Blurred outer container ensures clipPath polygon edges are softly diffused, never razor sharp */}
          <div
            style={{
              position: "absolute",
              inset: -60,
              filter: "blur(28px)",
              mixBlendMode: "screen",
              pointerEvents: "none",
            }}
          >
            {/* Glowing ajar far doorway crack */}
            <div
              style={{
                position: "absolute",
                left: "53.2%",
                top: "33%",
                width: 24 + doorCrack * 38,
                height: 150,
                transform: "translateX(-50%)",
                background: "radial-gradient(ellipse, rgba(255,244,210,0.85) 0%, rgba(245,166,35,0.28) 65%, transparent 100%)",
              }}
            />
            {/* Diffused doorway floor light spilling forward onto dark crimson carpet */}
            <div
              style={{
                position: "absolute",
                left: "52%",
                top: "44%",
                width: 340 + doorCrack * 380,
                height: 680,
                transform: "translateX(-50%)",
                background:
                  "radial-gradient(ellipse 68% 78% at 50% 14%, rgba(255,235,180,0.58) 0%, rgba(245,166,35,0.22) 45%, rgba(245,166,35,0) 78%)",
                clipPath: "polygon(46% 0%, 56% 0%, 96% 100%, 4% 100%)",
              }}
            />
          </div>

          {shutterFlash > 0.02 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#FFFFFF",
                opacity: shutterFlash * 0.85,
                mixBlendMode: "screen",
              }}
            />
          )}
        </div>
      )}

      {/* Beat 2: Smiling Female Executive Amid Falling Golden Equity Strips */}
      {b2 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="taipei_neon" tone="amber" opacity={0.48} scale={1.08} blurPx={4} />
          <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%) translateZ(20px)" }}>
            <PhotoCutout id="exec_woman" tone="amber" rimColor={COLORS.amberHot} rimPx={32} height={800} />
          </div>

          {Array.from({ length: 22 }).map((_, i) => {
            const p = ((sec - 8.03) * 0.42 + i * 0.08) % 1.25;
            const x = hash01(i * 71) * 1920 + Math.sin(sec * 2 + i) * 70;
            const y = -100 + p * 1240;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: 96,
                  height: 36,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, #FFF3CE 0%, ${COLORS.gold} 60%, #7C5210 100%)`,
                  boxShadow: `0 0 16px ${COLORS.amber}55`,
                  transform: `translateZ(${(i % 4) * 100 - 150}px) rotateX(${frame * 2 + i * 30}deg) rotateZ(${
                    i * 25 + frame
                  }deg)`,
                  opacity: 0.76,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Beat 3: "没丢过官的人不会明了" — Real Empty Matte-Black Executive Leather Chair Rotating Under Dimming Spotlight */}
      {b3 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", opacity: spotDim }}>
          <PhotoBackdrop id="boardroom" tone="noir" opacity={0.38} scale={1.04} blurPx={5} />
          <div style={{ position: "absolute", inset: -60, filter: "blur(32px)", pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: 680,
                height: 1200,
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, rgba(255,236,190,0.34) 0%, rgba(245,166,35,0.08) 70%, transparent 100%)",
                clipPath: "polygon(35% 0%, 65% 0%, 92% 100%, 8% 100%)",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "52%",
              transform: `translate(-50%, -50%) translateZ(45px) scaleX(${
                Math.abs(chairSpinScaleX) < 0.14 ? 0.14 : chairSpinScaleX
              })`,
            }}
          >
            <PhotoCutout id="chair" tone="gold" rimColor={COLORS.gold} rimPx={28} height={620} />
          </div>
        </div>
      )}
    </CinemaStage>
  );
};
