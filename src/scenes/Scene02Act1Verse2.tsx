import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import { CinemaStage } from "../cinema/CinemaStage";
import { PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";
import { GpuRig3D } from "../cinema/HardwareProps";
import { RainGlassOverlay } from "../cinema/ArchitecturalSets";

// Stanza 2 (55.52s - 71.52s, 960 frames / 16.00s)
export const Scene02Act1Verse2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  const b0 = sec < 4.0; // 国会问我你究竟是哪里好
  const b1 = sec >= 4.0 && sec < 8.0; // 台北酒吧我还忘不了
  const b2 = sec >= 8.0 && sec < 12.0; // 股价再高也比不上你的笑
  const b3 = sec >= 12.0; // 没买过卡的人不会明了

  const b1In = spring({
    frame: Math.max(0, frame - Math.round(3.92 * fps)),
    fps,
    config: { damping: 24, stiffness: 125 },
  });
  const splitMove = interpolate(sec, [8.0, 11.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <CinemaStage
      mood={b0 ? "noirGold" : b1 || b2 ? "amberBar" : "emeraldVault"}
      camRotateY={b0 ? -2.0 : b1 ? 2.0 : Math.sin(sec * 0.4) * 2.0}
      camZ={b1 ? (sec - 4.0) * 16 : 0}
      blinds={b0 ? 0.56 : 0}
      rain={b1 ? 0.4 : 0.12}
      bokeh={0.78}
      anamorphicFlare={0.72}
    >
      {/* Beat 0: Capitol Night Interrogation Spotlight Over Jensen Gesturing */}
      {b0 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="capitol" tone="noir" opacity={0.68} scale={1.06 + sec * 0.01} blurPx={2.5} />

          <div style={{ position: "absolute", inset: -60, filter: "blur(28px)", pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -20,
                width: 880,
                height: 1220,
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.26) 0%, rgba(203,213,225,0.06) 55%, rgba(0,0,0,0) 100%)",
                clipPath: "polygon(34% 0%, 66% 0%, 96% 100%, 4% 100%)",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 0,
              transform: "translateX(-50%) translateZ(45px)",
            }}
          >
            <PhotoCutout id="jensen_gesture" tone="noir" rimColor={COLORS.gold} rimPx={28} height={830} />
          </div>
        </div>
      )}

      {/* Beat 1: Taipei Rain Bar — Unified Neon Bokeh + Amber Jensen + Steady Rocks Whiskey Glass */}
      {b1 && (
        <div style={{ position: "absolute", inset: 0, opacity: b1In, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="taipei_neon" tone="amber" opacity={0.64} scale={1.08} panX={-(sec - 4.0) * 14} blurPx={4} />
          <RainGlassOverlay warmTint />

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 235,
              background:
                "linear-gradient(180deg, rgba(22,12,6,0.72) 0%, rgba(8,4,3,0.94) 55%, #020202 100%)",
              borderTop: "1.5px solid rgba(245, 166, 35, 0.32)",
              boxShadow: "inset 0 18px 60px rgba(245,166,35,0.14)",
              transform: "translateZ(-10px)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: 220,
              bottom: 120,
              transform: "translateZ(20px)",
              opacity: 0.94,
            }}
          >
            <PhotoCutout
              id="jensen_closeup"
              tone="amber"
              rimColor={COLORS.amber}
              rimPx={32}
              height={760}
              flipX
            />
          </div>

          <div
            style={{
              position: "absolute",
              right: 260,
              bottom: 125,
              transform: `translateZ(105px) scale(${0.92 + b1In * 0.08})`,
            }}
          >
            <PhotoCutout
              id="whiskey"
              tone="amber"
              rimColor={COLORS.amberHot}
              rimPx={34}
              height={460}
            />
          </div>
        </div>
      )}

      {/* Beat 2: Diagonal 50/50 Cinema Split — Soaring Emerald Stock Surge vs Warm Crimson Bar Smile */}
      {b2 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {/* Upper-Left Triangle: NYSE + Emerald Astronomical Surge Line */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
            }}
          >
            <PhotoBackdrop id="nyse" tone="emerald" opacity={0.75} scale={1.1} />
            <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              <path
                d={`M -40 820 L 240 720 L 420 755 L 680 480 L 890 520 L ${1180 + splitMove * 280} ${
                  280 - splitMove * 180
                }`}
                fill="none"
                stroke={COLORS.nvLime}
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d={`M -40 820 L 240 720 L 420 755 L 680 480 L 890 520 L ${1180 + splitMove * 280} ${
                  280 - splitMove * 180
                } L 1500 1080 L -40 1080 Z`}
                fill="rgba(166,240,22,0.14)"
              />
            </svg>
          </div>

          {/* Lower-Right Triangle: Wong Kar-wai Crimson Bokeh Bar & Smiling Executive Portrait */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            }}
          >
            <PhotoBackdrop id="whiskey_bar" tone="crimson" opacity={0.78} scale={1.12} blurPx={3} />
            <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              {Array.from({ length: 18 }).map((_, i) => {
                const bx = 760 + i * 64;
                const sway = Math.sin(frame * 0.04 + i * 0.45) * 14;
                return (
                  <line
                    key={i}
                    x1={bx}
                    y1="0"
                    x2={bx + sway}
                    y2="1080"
                    stroke="rgba(255, 160, 140, 0.25)"
                    strokeWidth="3"
                    strokeDasharray="6 14"
                  />
                );
              })}
            </svg>
            <div
              style={{
                position: "absolute",
                right: 220,
                bottom: 0,
                transform: `translateY(${(1 - splitMove) * 40}px)`,
              }}
            >
              <PhotoCutout id="exec_woman" tone="amber" rimColor={COLORS.amberHot} rimPx={28} height={640} flipX />
            </div>
          </div>

          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <line x1="1920" y1="0" x2="0" y2="1080" stroke="#FFF2CC" strokeWidth="4" />
          </svg>
        </div>
      )}

      {/* Beat 3: Three Orbiting GPUs (GpuRig3D + Real Nvidia Hardware) Emerging in Emerald Haze */}
      {b3 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="servers" tone="emerald" opacity={0.55} scale={1.06} blurPx={3} />
          {[-1, 0, 1].map((slot) => {
            const angle = (sec - 11.77) * 0.9 + slot * 2.1;
            const x = 960 + Math.sin(angle) * 520;
            const z = Math.cos(angle) * 280;
            const y = 470 + slot * 65 + Math.cos(angle * 2) * 35;
            return (
              <div
                key={slot}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  transform: `translate(-50%, -50%) translateZ(${z}px) scale(0.86)`,
                }}
              >
                {slot === 0 ? (
                  <PhotoCutout id="gpu" tone="emerald" rimColor={COLORS.nvLime} rimPx={34} height={370} />
                ) : (
                  <GpuRig3D
                    rotateX={18}
                    rotateY={Math.sin(angle) * -28}
                    rotateZ={slot * 7}
                    accent={slot === -1 ? COLORS.nvLime : COLORS.amber}
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
