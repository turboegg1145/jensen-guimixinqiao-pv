import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import { useAudioFrame } from "../data/audio";
import { CinemaStage } from "../cinema/CinemaStage";
import { DocPlate, PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";
import { GpuRig3D } from "../cinema/HardwareProps";
import { CrimsonCandlestickDeluge } from "../cinema/ArchitecturalSets";

// Instrumental Interlude (121.90s - 153.66s, 1906 frames / 31.76s)
export const Scene06Interlude: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();

  const part = sec < 10.2 ? "kaleidoscope" : sec < 22.0 ? "canyon" : "press";
  const pressSpeed = interpolate(sec, [22.0, 31.5], [1, 4.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const endFlash = interpolate(sec, [31.25, 31.76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <CinemaStage
      mood={part === "kaleidoscope" ? "emeraldVault" : "crimsonAlarm"}
      camRotateX={part === "canyon" ? -8 : 2}
      camRotateY={Math.sin(sec * 0.85) * 4.5}
      camRotateZ={part === "kaleidoscope" ? Math.sin(sec * 0.5) * 2.5 : 0}
      camZ={part === "press" ? (sec - 22) * 16 : 0}
      rain={part === "canyon" ? 0.35 : 0.14}
      bokeh={0.8}
      anamorphicFlare={0.9}
    >
      {/* PART 0 (0 - 10.2s): Mirrored Bar & Hardware Kaleidoscope */}
      {part === "kaleidoscope" && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="whiskey_bar" tone="emerald" opacity={0.44} scale={1.1} blurPx={4} />
          {[0, 1, 2, 3, 4, 5].map((shard) => {
            const angle = shard * 60 + sec * 14;
            const r = 340 + audio.pulse * 65;
            const px = 960 + Math.cos((angle * Math.PI) / 180) * r;
            const py = 520 + Math.sin((angle * Math.PI) / 180) * (r * 0.65);
            return (
              <div
                key={shard}
                style={{
                  position: "absolute",
                  left: px,
                  top: py,
                  transform: `translate(-50%, -50%) translateZ(${(shard % 3) * 80 - 80}px) rotate(${
                    angle + 45
                  }deg) scale(${0.58 + audio.bass * 0.12})`,
                  opacity: 0.85,
                }}
              >
                {shard % 3 === 0 ? (
                  <PhotoCutout id="whiskey" tone="amber" rimColor={COLORS.amber} rimPx={24} height={380} />
                ) : shard % 3 === 1 ? (
                  <PhotoCutout id="gpu" tone="emerald" rimColor={COLORS.nvLime} rimPx={24} height={320} />
                ) : (
                  <GpuRig3D
                    rotateX={20}
                    rotateY={shard % 2 === 0 ? 28 : -28}
                    rotateZ={shard * 12}
                    accent={COLORS.nvLime}
                  />
                )}
              </div>
            );
          })}

          <svg
            viewBox="0 0 1920 1080"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.36 }}
          >
            <g transform={`rotate(${sec * 18} 960 540)`}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line
                  key={i}
                  x1="960"
                  y1="540"
                  x2={960 + Math.cos((i * Math.PI) / 3) * 1100}
                  y2={540 + Math.sin((i * Math.PI) / 3) * 1100}
                  stroke={i % 2 === 0 ? COLORS.nvLime : COLORS.amber}
                  strokeWidth="2.5"
                />
              ))}
            </g>
          </svg>
        </div>
      )}

      {/* PART 1 (10.2 - 22.0s): Wall Street Night Canyon + Plunging Crimson Candlesticks + Jacket & Trader */}
      {part === "canyon" && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="wallst_night" tone="crimson" opacity={0.68} scale={1.08 + (sec - 10.2) * 0.01} blurPx={2} />
          <CrimsonCandlestickDeluge intensity={1.3} />

          <div
            style={{
              position: "absolute",
              left: "34%",
              bottom: 40,
              transform: `translate(-50%, 0) translateZ(-40px) rotate(${Math.sin(sec * 1.2) * 6}deg)`,
              opacity: 0.72,
            }}
          >
            <PhotoCutout id="jacket" tone="crimson" rimColor={COLORS.crimson} rimPx={30} height={540} />
          </div>

          <div
            style={{
              position: "absolute",
              left: "68%",
              bottom: 0,
              transform: `translate(-50%, 0) translateZ(75px) scale(${0.96 + audio.bass * 0.04})`,
              opacity: 0.92,
            }}
          >
            <PhotoCutout id="trader" tone="crimson" rimColor={COLORS.crimson} rimPx={30} height={720} />
          </div>
        </div>
      )}

      {/* PART 2 (22.0 - 31.76s): Vintage Newspaper Rotary Press + Streaming FOIA Docs Into Crimson Flash */}
      {part === "press" && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop
            id="press"
            tone="crimson"
            opacity={0.72}
            scale={1.08 + pressSpeed * 0.03}
            panY={Math.sin(frame * 0.6) * pressSpeed * 3}
          />

          {[0, 1, 2, 3, 4].map((p) => {
            const offsetY = ((frame * 12 * pressSpeed + p * 310) % 1550) - 240;
            const sideX = 960 + Math.sin(p * 1.9) * 380;
            return (
              <div
                key={p}
                style={{
                  position: "absolute",
                  left: sideX,
                  top: offsetY,
                  transform: `translate(-50%, -50%) translateZ(${p * 30}px) rotate(${Math.sin(p + sec) * 14}deg)`,
                  opacity: 0.78,
                }}
              >
                <DocPlate id={p % 2 === 0 ? "fbi" : "nsa"} width={360} tone="crimson" />
              </div>
            );
          })}

          {endFlash > 0.01 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle, #FFFFFF 0%, ${COLORS.crimson} 85%)`,
                opacity: endFlash,
              }}
            />
          )}
        </div>
      )}
    </CinemaStage>
  );
};
