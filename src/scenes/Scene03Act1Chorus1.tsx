import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../design/tokens";
import { useAudioFrame } from "../data/audio";
import { CinemaStage } from "../cinema/CinemaStage";
import { PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";
import { GpuRig3D, SiliconWaferDisc } from "../cinema/HardwareProps";

// Stanza 3 (71.94s - 88.10s, 970 frames)
export const Scene03Act1Chorus1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();

  const b0 = sec < 3.75; // 是鬼迷了心窍也好
  const b1 = sec >= 3.75 && sec < 7.92; // 是老康送秘书也好
  const b2 = sec >= 7.92 && sec < 11.91; // 然而这一切已不再重要
  const b3 = sec >= 11.91; // 只要你再订百亿显卡包

  const slideSec = interpolate(sec, [3.75, 7.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gpuFlood = spring({
    frame: Math.max(0, frame - Math.round(11.91 * fps)),
    fps,
    config: { damping: 16, stiffness: 130 },
  });

  return (
    <CinemaStage
      mood={b0 || b2 ? "crimsonAlarm" : b1 ? "amberBar" : "emeraldVault"}
      camRotateX={b3 ? -10 : 2}
      camRotateY={Math.sin(sec * 1.1) * 3.5}
      camZ={b3 ? gpuFlood * 110 : 0}
      rain={b0 ? 0.2 : b3 ? 0.35 : 0.1}
      bokeh={0.78}
      anamorphicFlare={0.85}
    >
      {/* Beat 0: Monumental Crimson "鬼" Shadow Towering Clearly Behind Wafer + Real Jensen Cutout */}
      {b0 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="wafer" tone="crimson" opacity={0.45} scale={1.08} blurPx={3} />

          {/* Colossal "鬼" Glyph Raised Higher & Brighter Behind Portrait So Upper Crown Strokes Read Clearly */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "39%",
              transform: `translate(-50%, -50%) translateZ(-160px) scale(${1 + audio.bass * 0.08})`,
              fontFamily: FONTS.serif,
              fontSize: 660,
              fontWeight: 900,
              color: "rgba(255, 46, 76, 0.34)",
              WebkitTextStroke: "2px rgba(255, 110, 128, 0.45)",
              textShadow: `0 0 110px ${COLORS.crimson}`,
              lineHeight: 1,
            }}
          >
            鬼
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "49%",
              transform: "translate(-50%, -50%) translateZ(-45px)",
              opacity: 0.42,
            }}
          >
            <SiliconWaferDisc size={620} spinDeg={frame * 0.75} tiltX={34} glowColor={COLORS.crimson} />
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 0,
              transform: "translateX(-50%) translateZ(50px)",
            }}
          >
            <PhotoCutout id="jensen_front" tone="crimson" rimColor={COLORS.crimson} rimPx={32} height={700} />
          </div>
        </div>
      )}

      {/* Beat 1: Wong Kar-wai Corridor Backlighting — Executive Secretary Crossing Toward Jensen */}
      {b1 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="corridor" tone="amber" opacity={0.62} scale={1.08} blurPx={2.5} />

          {/* Gliding Female Executive Across Center Amber Light Shaft */}
          <div
            style={{
              position: "absolute",
              left: 340 + slideSec * 360,
              bottom: 0,
              transform: "translateZ(35px)",
            }}
          >
            <PhotoCutout
              id="exec_woman"
              tone="amber"
              rimColor={COLORS.amberHot}
              rimPx={28}
              height={700}
              brightness={0.86}
            />
          </div>

          {/* Waiting Leather-Jacketed Jensen Right */}
          <div
            style={{
              position: "absolute",
              right: 220,
              bottom: 0,
              transform: "translateZ(65px)",
            }}
          >
            <PhotoCutout
              id="jensen_gesture"
              tone="amber"
              rimColor={COLORS.amber}
              rimPx={30}
              height={760}
              flipX
            />
          </div>
        </div>
      )}

      {/* Beat 2: Crimson Alarm Strobes Over Paparazzi Chaos & Closeup Jensen */}
      {b2 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="paparazzi" tone="crimson" opacity={0.58} scale={1.12} blurPx={2} />
          {[0, 1, 2, 3, 4].map((ray) => (
            <div
              key={ray}
              style={{
                position: "absolute",
                left: `${((ray * 22 + frame * 1.4) % 120) - 10}%`,
                top: -200,
                width: 140,
                height: 1500,
                transform: `rotate(${(ray % 2 === 0 ? 1 : -1) * 24}deg)`,
                background: `linear-gradient(90deg, transparent, ${COLORS.crimson}44, transparent)`,
                opacity: 0.45 + audio.pulse * 0.5,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 0,
              transform: `translateX(-50%) translateZ(60px) scale(${1 + audio.bass * 0.06})`,
            }}
          >
            <PhotoCutout id="jensen_closeup" tone="crimson" rimColor={COLORS.crimson} rimPx={34} height={830} />
          </div>
        </div>
      )}

      {/* Beat 3: "只要你再订百亿显卡包" — Waterfall of GPU Bricks & Real Nvidia Hardware */}
      {b3 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="servers" tone="emerald" opacity={0.55} scale={1.1} />
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 180 + (i % 5) * 390 + Math.sin(i * 2.1) * 40;
            const ySpeed = ((frame * 12 + i * 240) % 1560) - 360;
            const z = -420 + (i % 4) * 200;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: 1120 - ySpeed,
                  transform: `translate(-50%, -50%) translateZ(${z}px) scale(0.58)`,
                  opacity: Math.max(0.25, gpuFlood),
                }}
              >
                {i % 3 === 0 ? (
                  <PhotoCutout id="gpu" tone="emerald" rimColor={COLORS.nvLime} rimPx={28} height={310} />
                ) : (
                  <GpuRig3D
                    rotateX={14}
                    rotateY={(i % 2 === 0 ? 1 : -1) * 18}
                    rotateZ={Math.sin(sec * 2 + i) * 6}
                    accent={COLORS.nvLime}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </CinemaStage>
  );
};
