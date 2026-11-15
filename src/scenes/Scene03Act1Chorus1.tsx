import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../design/tokens";
import { CinemaStage } from "../cinema/CinemaStage";
import { PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";
import { GpuRig3D, SiliconWaferDisc } from "../cinema/HardwareProps";

// Stanza 3 (71.52s - 87.52s, 960 frames / 16.00s)
export const Scene03Act1Chorus1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  const b0 = sec < 4.0; // 是鬼迷了心窍也好
  const b1 = sec >= 4.0 && sec < 8.0; // 是老康送秘书也好
  const b2 = sec >= 8.0 && sec < 12.0; // 然而这一切已不再重要
  const b3 = sec >= 12.0; // 只要你再订百亿显卡包

  const slideSec = interpolate(sec, [4.0, 7.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gpuFlood = spring({
    frame: Math.max(0, frame - Math.round(11.9 * fps)),
    fps,
    config: { damping: 20, stiffness: 150 },
  });

  return (
    <CinemaStage
      mood={b0 || b2 ? "crimsonAlarm" : b1 ? "amberBar" : "emeraldVault"}
      camRotateX={b3 ? -8 : 2}
      camRotateY={Math.sin(sec * 0.4) * 2.0}
      camZ={b3 ? gpuFlood * 105 : 0}
      rain={b0 ? 0.2 : b3 ? 0.32 : 0.1}
      bokeh={0.78}
      anamorphicFlare={0.85}
    >
      {/* Beat 0: Monumental Crimson "鬼" Shadow Towering Clearly Behind Wafer + Real Jensen Cutout */}
      {b0 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="wafer" tone="crimson" opacity={0.45} scale={1.08} blurPx={3} />

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "39%",
              transform: `translate(-50%, -50%) translateZ(-160px) scale(${1 + sec * 0.015})`,
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
            <SiliconWaferDisc size={620} spinDeg={sec * 36} tiltX={34} glowColor={COLORS.crimson} />
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

      {/* Beat 2: Crimson Alarm Smooth Sweep Over Paparazzi Chaos & Closeup Jensen (zero face scale thumping) */}
      {b2 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="paparazzi" tone="crimson" opacity={0.58} scale={1.1 + (sec - 8.0) * 0.015} blurPx={2} />
          {[0, 1, 2, 3, 4].map((ray) => (
            <div
              key={ray}
              style={{
                position: "absolute",
                left: `${((ray * 22 + (sec - 8.0) * 14) % 120) - 10}%`,
                top: -200,
                width: 140,
                height: 1500,
                transform: `rotate(${(ray % 2 === 0 ? 1 : -1) * 24}deg)`,
                background: `linear-gradient(90deg, transparent, ${COLORS.crimson}44, transparent)`,
                opacity: 0.55,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 0,
              transform: `translateX(-50%) translateZ(60px) scale(${1 + (sec - 8.0) * 0.018})`,
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
            const ySpeed = ((frame * 10 + i * 240) % 1560) - 360;
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
                    rotateZ={Math.sin(sec * 1.1 + i) * 5}
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

