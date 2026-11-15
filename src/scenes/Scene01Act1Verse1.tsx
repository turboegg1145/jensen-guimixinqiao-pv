import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import { CinemaStage } from "../cinema/CinemaStage";
import { PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";
import { GpuRig3D } from "../cinema/HardwareProps";

// Stanza 1 (39.52s - 55.52s, 960 frames / 16.00s)
export const Scene01Act1Verse1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  const b0 = sec < 4.0; // 曾经真以为皮衣穿到老了
  const b1 = sec >= 4.0 && sec < 8.0; // 卖卡的心拒绝再有浪潮
  const b2 = sec >= 8.0 && sec < 12.0; // 禁了千次的芯片却断不了
  const b3 = sec >= 12.0; // 四十八亿它将我围绕

  const b0Spring = spring({ frame, fps, config: { damping: 24, stiffness: 120 } });
  const b1Fly = interpolate(sec, [4.0, 8.0], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const b2Break = interpolate(sec, [8.6, 11.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const b3Rise = spring({ frame: Math.max(0, frame - Math.round(11.9 * fps)), fps, config: { damping: 22, stiffness: 135 } });

  return (
    <CinemaStage
      mood={b2 ? "crimsonAlarm" : "emeraldVault"}
      camRotateX={b1 ? 7 : 1.5}
      camRotateY={b0 ? -3 : b1 ? 4 : Math.sin(sec * 0.4) * 2.2}
      camZ={b1 ? b1Fly * 150 : 0}
      rain={b2 ? 0.42 : 0.14}
      bokeh={0.74}
      anamorphicFlare={0.62}
    >
      {/* Beat 0: Sweeping Mirror Beam Over Real Jensen Front Portrait & Empty Leather Jacket */}
      {b0 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="servers" tone="emerald" opacity={0.62} scale={1.08} panX={-sec * 12} />

          <div
            style={{
              position: "absolute",
              left: "34%",
              bottom: 0,
              transform: `translate(-50%, 0) translateZ(-20px) scale(${0.92 + b0Spring * 0.08})`,
              opacity: b0Spring * 0.85,
            }}
          >
            <PhotoCutout id="jacket" tone="emerald" rimColor={COLORS.nvLime} rimPx={24} height={600} />
          </div>

          <div
            style={{
              position: "absolute",
              left: "60%",
              bottom: 0,
              transform: `translate(-50%, 0) translateZ(60px) scale(${0.95 + b0Spring * 0.07})`,
              opacity: b0Spring,
            }}
          >
            <PhotoCutout id="jensen_front" tone="emerald" rimColor={COLORS.nvLime} rimPx={28} height={820} />
          </div>

          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.48 }}>
            <polygon points="0,0 540,0 240,1080 0,1080" fill="rgba(166,240,22,0.08)" />
            <line
              x1={interpolate(sec, [0, 4.0], [320, 1480])}
              y1="0"
              x2={interpolate(sec, [0, 4.0], [80, 1220])}
              y2="1080"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="3"
            />
          </svg>
        </div>
      )}

      {/* Beat 1: Fly-Through Corridor of Mixed Metallic GpuRig3D + Real Nvidia GPU Hardware */}
      {b1 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="wafer" tone="emerald" opacity={0.54} scale={1.06 + b1Fly * 0.14} blurPx={3} />
          {[0, 1, 2, 3, 4].map((idx) => {
            const prog = (b1Fly * 1.6 + idx * 0.22) % 1.25;
            const z = -900 + prog * 1350;
            const xOff = (idx % 2 === 0 ? -1 : 1) * (360 - prog * 140);
            const yOff = ((idx % 3) - 1) * 165;
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "48%",
                  transform: `translate(-50%, -50%) translate3d(${xOff}px, ${yOff}px, ${z}px) scale(${0.7 + prog * 0.35})`,
                  opacity: prog > 1.05 ? Math.max(0, 1 - (prog - 1.05) * 5) : Math.min(1, prog * 2.5),
                }}
              >
                {idx % 2 === 0 ? (
                  <GpuRig3D
                    rotateX={14 + idx * 4}
                    rotateY={idx % 2 === 0 ? 22 : -22}
                    rotateZ={(idx - 2) * 5}
                    accent={COLORS.nvLime}
                  />
                ) : (
                  <PhotoCutout id="gpu" tone="emerald" rimColor={COLORS.nvLime} rimPx={28} height={340} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Beat 2: Crimson Export Laser Blockade Bypassed by Emerald GPU Signal Arcs */}
      {b2 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="wafer_discs" tone="crimson" opacity={0.45} scale={1.08} blurPx={4} />
          {Array.from({ length: 13 }).map((_, idx) => {
            const x = 140 + idx * 136;
            const shatterOff = b2Break > 0.2 ? (idx % 2 === 0 ? -1 : 1) * b2Break * 260 : 0;
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: x,
                  top: 0,
                  bottom: 0,
                  width: 5,
                  transform: `translateY(${shatterOff}px) translateZ(${(idx % 3) * 60 - 60}px)`,
                  background: `linear-gradient(180deg, transparent 5%, ${COLORS.crimson} 30%, #FF8A9A 50%, ${COLORS.crimson} 75%, transparent 96%)`,
                  boxShadow: `0 0 26px ${COLORS.crimson}`,
                  opacity: 1 - b2Break * 0.55,
                }}
              />
            );
          })}
          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "translateZ(80px)" }}>
            {[0, 1, 2, 3].map((arc) => {
              const yShift = (arc - 1.5) * 145;
              return (
                <path
                  key={arc}
                  d={`M -80 ${580 + yShift} C 460 ${140 + yShift}, 1460 ${920 - yShift}, 2000 ${460 + yShift}`}
                  fill="none"
                  stroke={COLORS.nvLime}
                  strokeWidth={6.5}
                  strokeDasharray="1600"
                  strokeDashoffset={1600 * (1 - b2Break)}
                />
              );
            })}
          </svg>
        </div>
      )}

      {/* Beat 3: Real Jensen Portrait Surrounded by 48 Smooth Orbiting Glowing Chips */}
      {b3 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="servers" tone="emerald" opacity={0.48} scale={1.1} blurPx={4} />
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 0,
              transform: `translate(-50%, 0) translateZ(-40px) scale(${0.9 + b3Rise * 0.12})`,
              opacity: b3Rise,
            }}
          >
            <PhotoCutout id="jensen_closeup" tone="emerald" rimColor={COLORS.nvLime} rimPx={30} height={820} />
          </div>

          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i / 48) * Math.PI * 2 + (sec - 12.0) * 1.05;
            const radiusX = 680 + Math.sin(i * 0.8) * 50;
            const radiusZ = 420;
            const x = 960 + Math.cos(angle) * radiusX;
            const z = Math.sin(angle) * radiusZ;
            const y = 490 + Math.sin(angle * 2) * 155;
            const sc = Math.max(0.28, (z + 650) / 1000);
            const isGold = i % 6 === 0;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: 68,
                  height: 36,
                  borderRadius: 6,
                  background: isGold
                    ? `linear-gradient(135deg, ${COLORS.gold}, #855A10)`
                    : `linear-gradient(135deg, ${COLORS.nvLime}, #133A1A)`,
                  boxShadow: `0 0 22px ${isGold ? COLORS.gold : COLORS.nvLime}`,
                  transform: `translate(-50%, -50%) translateZ(${z}px) scale(${sc}) rotateY(${
                    (angle * 180) / Math.PI
                  }deg)`,
                  opacity: Math.min(0.95, 0.25 + sc * 0.72),
                }}
              />
            );
          })}
        </div>
      )}
    </CinemaStage>
  );
};

