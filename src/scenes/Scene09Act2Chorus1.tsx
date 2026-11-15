import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import { useAudioFrame } from "../data/audio";
import { CinemaStage } from "../cinema/CinemaStage";
import { PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";
import { FoggyHighwayBeams, LakeRippleCanvas } from "../cinema/ArchitecturalSets";
import { hash01 } from "../cinema/math";

// Stanza 8 (185.52s - 201.52s, 960 frames / 16.00s)
export const Scene09Act2Chorus1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();

  const b0 = sec < 4.0; // 是华尔街逼宫也好
  const b1 = sec >= 4.0 && sec < 8.0; // 是受惊鹿反咬也好
  const b2 = sec >= 8.0 && sec < 12.0; // 然而一亿刀已全部打漂
  const b3 = sec >= 12.0; // 表外甥女正捧着奖杯笑

  const wallLean = interpolate(sec, [0, 3.6], [0, 7.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const queenTransform = interpolate(sec, [5.7, 6.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chipSink = interpolate(sec, [8.0, 11.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const trophyRise = spring({
    frame: Math.max(0, frame - Math.round(11.9 * fps)),
    fps,
    config: { damping: 20, stiffness: 120 },
  });

  return (
    <CinemaStage
      mood={b0 ? "crimsonAlarm" : b1 ? (queenTransform > 0.5 ? "emeraldVault" : "rainyBlue") : b2 ? "rainyBlue" : "amdScarlet"}
      camRotateX={b0 ? 6 : 2}
      camRotateY={b3 ? 2.2 : 0}
      camZ={b3 ? (sec - 12.0) * 12 : 0}
      rain={b1 ? 0.35 : 0.14}
      bokeh={0.78}
      anamorphicFlare={0.9}
    >
      {/* Beat 0: Leaning Wall Street Towers Boxing In Jensen & Panicked NYSE Trader */}
      {b0 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="trading_floor" tone="crimson" opacity={0.62} scale={1.08} blurPx={2.5} />

          {/* Tilting skyscraper canyon edges */}
          <div
            style={{
              position: "absolute",
              left: -80,
              top: -80,
              width: 480,
              height: 1240,
              background: "linear-gradient(90deg, #040203 0%, #1C0509 92%, rgba(255,46,76,0.4) 100%)",
              borderRight: `3px solid ${COLORS.crimson}`,
              transformOrigin: "bottom left",
              transform: `rotateZ(${wallLean}deg) translateZ(60px)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -80,
              top: -80,
              width: 480,
              height: 1240,
              background: "linear-gradient(270deg, #040203 0%, #1C0509 92%, rgba(255,46,76,0.4) 100%)",
              borderLeft: `3px solid ${COLORS.crimson}`,
              transformOrigin: "bottom right",
              transform: `rotateZ(${-wallLean}deg) translateZ(60px)`,
            }}
          />

          <div style={{ position: "absolute", left: "34%", bottom: 0, transform: "translateX(-50%) translateZ(20px)" }}>
            <PhotoCutout id="trader" tone="crimson" rimColor={COLORS.crimson} rimPx={28} height={700} />
          </div>
          <div style={{ position: "absolute", left: "60%", bottom: 0, transform: "translateX(-50%) translateZ(50px)" }}>
            <PhotoCutout id="jensen_front" tone="crimson" rimColor={COLORS.crimson} rimPx={30} height={780} />
          </div>
        </div>
      )}

      {/* Beat 1: Foggy Headlights Catch Real Startled Buck -> Snapping Into Emerald Crowned AMD CEO Lisa Su */}
      {b1 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="road_fog" tone={queenTransform > 0.5 ? "emerald" : "cyan"} opacity={0.74} scale={1.08} />
          <FoggyHighwayBeams beamIntensity={1 - queenTransform * 0.4} />

          {/* Startled Real Antler Buck in High Beams */}
          {queenTransform < 0.88 && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: 90,
                transform: `translate(-50%, 0) translateZ(40px) scale(${1 + queenTransform * 0.2})`,
                opacity: 1 - queenTransform,
              }}
            >
              <PhotoCutout id="stag" tone="cyan" rimColor="#FFFFFF" rimPx={34} height={600} />
            </div>
          )}

          {/* Snap Transition -> Towering Real AMD CEO Lisa Su Illuminated by Radiant Emerald Stage Halo */}
          {queenTransform > 0.1 && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: 0,
                transform: `translate(-50%, ${100 - queenTransform * 100}px) translateZ(60px) scale(${
                  0.92 + queenTransform * 0.12
                })`,
                opacity: queenTransform,
              }}
            >
              {/* Diffused volumetric crown halo behind her head */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: -55,
                  width: 340,
                  height: 340,
                  borderRadius: "50%",
                  transform: "translateX(-50%)",
                  background: `radial-gradient(circle, rgba(166,240,22,0.55) 0%, rgba(118,185,0,0.18) 45%, transparent 72%)`,
                  filter: "blur(18px)",
                }}
              />
              <svg
                viewBox="0 0 260 260"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: -25,
                  width: 240,
                  height: 240,
                  transform: `translateX(-50%) rotate(${frame * 0.5}deg)`,
                  opacity: 0.72,
                }}
              >
                <circle
                  cx="130"
                  cy="130"
                  r="110"
                  fill="none"
                  stroke={COLORS.nvLime}
                  strokeWidth="2"
                  strokeDasharray="18 10"
                />
                <circle cx="130" cy="130" r="88" fill="none" stroke={COLORS.gold} strokeWidth="1.5" opacity="0.6" />
              </svg>
              <PhotoCutout id="lisa_su" tone="emerald" rimColor={COLORS.nvLime} rimPx={34} height={780} />
            </div>
          )}
        </div>
      )}

      {/* Beat 2: $100M Nvidia GPU & Gold Wafer Plunging Into Dark Water Ripples */}
      {b2 && (
        <div style={{ position: "absolute", inset: 0 }}>
          <PhotoBackdrop id="wafer" tone="cyan" opacity={0.34} scale={1.1} blurPx={5} />
          <LakeRippleCanvas dropProgress={chipSink} />

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: interpolate(chipSink, [0, 0.58, 1], [230, 660, 810]),
              transform: `translate(-50%, -50%) rotate(${chipSink * 24}deg) scale(${interpolate(
                chipSink,
                [0, 0.6, 1],
                [1, 0.82, 0.45]
              )})`,
              opacity: interpolate(chipSink, [0, 0.65, 1], [1, 0.7, 0.12]),
            }}
          >
            <PhotoCutout id="gpu" tone="gold" rimColor={COLORS.gold} rimPx={30} height={310} />
          </div>
        </div>
      )}

      {/* Beat 3: "表外甥女正捧着奖杯笑" — AMD Scarlet Stage Lasers + Smiling Real Lisa Su & Gleaming Gold Trophy */}
      {b3 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="nyse" tone="amdRed" opacity={0.44} scale={1.08} blurPx={3} />
          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {[-2, -1, 0, 1, 2].map((b) => (
              <line
                key={b}
                x1={960 + b * 320}
                y1="1080"
                x2={960 + Math.sin(sec * 1.1 + b) * 380}
                y2="-60"
                stroke={COLORS.amdRed}
                strokeWidth={28 + audio.rms * 14}
                opacity="0.24"
              />
            ))}
            <path
              d="M 160 800 L 620 670 L 890 715 L 1460 280 L 1700 165"
              fill="none"
              stroke={COLORS.nvLime}
              strokeWidth="12"
              strokeLinecap="round"
              opacity={trophyRise * 0.85}
            />
            <polygon points="1700,165 1625,175 1670,235" fill={COLORS.nvLime} opacity={trophyRise} />
          </svg>

          <div
            style={{
              position: "absolute",
              left: "39%",
              bottom: 0,
              transform: `translate(-50%, ${100 - trophyRise * 100}px) translateZ(50px)`,
              opacity: trophyRise,
            }}
          >
            <PhotoCutout id="lisa_su" tone="amdRed" rimColor={COLORS.gold} rimPx={32} height={780} />
          </div>

          <div
            style={{
              position: "absolute",
              left: "61%",
              top: "51%",
              transform: `translate(-50%, ${interpolate(trophyRise, [0, 1], [120, -50])}%) translateZ(95px) scale(${
                0.86 + trophyRise * 0.2
              })`,
              opacity: trophyRise,
            }}
          >
            <PhotoCutout id="trophy" tone="gold" rimColor={COLORS.amber} rimPx={34} height={600} />
          </div>

          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {Array.from({ length: 28 }).map((_, s) => {
              const x = hash01(s * 31) * 1920;
              const y = ((hash01(s * 97) * 1080 - frame * (2.5 + (s % 4))) % 1160 + 1160) % 1160 - 40;
              return (
                <circle
                  key={s}
                  cx={x}
                  cy={y}
                  r={2.5 + (s % 3) * 2}
                  fill={s % 4 === 0 ? COLORS.amdRed : COLORS.gold}
                  opacity={0.78}
                />
              );
            })}
          </svg>
        </div>
      )}
    </CinemaStage>
  );
};
