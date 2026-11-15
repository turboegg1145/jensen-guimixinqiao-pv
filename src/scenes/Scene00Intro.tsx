import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../design/tokens";
import { useAudioFrame } from "../data/audio";
import { CinemaStage } from "../cinema/CinemaStage";
import { PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";
import { GpuRig3D } from "../cinema/HardwareProps";

export const Scene00Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();

  const phase = sec < 15.5 ? "empire" : sec < 33.8 ? "intercept" : "title";

  const jacketReveal = spring({
    frame: Math.max(0, frame - 24),
    fps,
    config: { damping: 24, stiffness: 75 },
  });

  const phaseAOut = interpolate(sec, [14.6, 15.5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phaseBIn = interpolate(sec, [15.2, 16.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phaseBOut = interpolate(sec, [33.0, 33.8], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const routeProgress = interpolate(sec, [16.2, 29.0], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleSlam = spring({
    frame: Math.max(0, frame - Math.round(34.6 * fps)),
    fps,
    config: { damping: 16, stiffness: 140, mass: 1.1 },
  });
  const titleExit = interpolate(sec, [39.1, 39.89], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <CinemaStage
      mood={
        phase === "empire"
          ? "emeraldVault"
          : phase === "intercept"
          ? "amberBar"
          : "noirGold"
      }
      camRotateX={phase === "intercept" ? 4 : 1.5}
      camRotateY={Math.sin(sec * 0.35) * 3.2}
      camZ={phase === "empire" ? sec * 9 : phase === "title" ? (sec - 34) * 14 : 0}
      blinds={phase === "intercept" ? 0.45 : 0}
      rain={phase === "intercept" ? 0.28 : 0.08}
      bokeh={phase === "title" ? 0.35 : 0.72}
      anamorphicFlare={phase === "title" ? 0.85 : 0.55}
    >
      {/* ACT 0 BEAT A (0 - 15.5s): Supercomputer Vault + Solitary Schott Leather Jacket + Wedding Ring Halo */}
      {sec < 15.8 && (
        <div style={{ position: "absolute", inset: 0, opacity: phaseAOut, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop
            id="servers"
            tone="emerald"
            opacity={0.78}
            scale={1.04 + sec * 0.008}
            blurPx={1.5}
            translateZ={-180}
          />

          {/* Single Overhead Theater Spotlight Shaft (blurred via outer wrapper so polygon never sharp-clips) */}
          <div style={{ position: "absolute", inset: -60, filter: "blur(28px)", transform: "translateZ(-40px)", pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: 800,
                height: 1160,
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, rgba(245,230,190,0.30) 0%, rgba(166,240,22,0.10) 55%, rgba(0,0,0,0) 100%)",
                clipPath: "polygon(36% 0%, 64% 0%, 92% 100%, 8% 100%)",
              }}
            />
          </div>

          {/* Iconic Black Leather Jacket RGBA Cutout */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "49%",
              transform: `translate(-50%, -50%) translateZ(55px) scale(${
                0.92 + jacketReveal * 0.14 + audio.bass * 0.025
              })`,
              opacity: jacketReveal,
            }}
          >
            <PhotoCutout
              id="jacket"
              tone={sec > 8 ? "amber" : "emerald"}
              rimColor={sec > 8 ? COLORS.amber : COLORS.nvLime}
              rimPx={28}
              height={620}
            />
          </div>

          {/* Orbiting Gold Wedding Rings & Halo */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "14%",
              transform: `translate(-50%, 0) translateZ(95px) rotate(${Math.sin(sec * 0.8) * 6}deg) scale(${
                0.78 + jacketReveal * 0.12
              })`,
              opacity: jacketReveal * 0.72,
            }}
          >
            <PhotoCutout id="rings" tone="gold" rimColor={COLORS.gold} rimPx={18} height={150} />
          </div>

          {/* Drifting Hardware GPUs (mixed real Quadro card & 3D cooling shroud) emerging after 8.5s */}
          {sec > 8.5 && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: 110 + Math.sin(sec * 0.6) * 35,
                  top: 230,
                  transform: `translateZ(130px) scale(0.58) rotateY(24deg)`,
                  opacity: interpolate(sec, [8.5, 11], [0, 0.92], { extrapolateRight: "clamp" }),
                }}
              >
                <GpuRig3D rotateX={14} rotateY={26} rotateZ={-8} accent={COLORS.nvLime} />
              </div>
              <div
                style={{
                  position: "absolute",
                  right: 120 + Math.cos(sec * 0.5) * 30,
                  bottom: 185,
                  transform: `translateZ(-70px) rotate(${Math.sin(sec) * 8}deg)`,
                  opacity: interpolate(sec, [9.8, 12.2], [0, 0.85], { extrapolateRight: "clamp" }),
                }}
              >
                <PhotoCutout id="gpu" tone="emerald" rimColor={COLORS.cyan} rimPx={22} height={260} />
              </div>
            </>
          )}
        </div>
      )}

      {/* ACT 0 BEAT B (15.5 - 33.8s): Taipei Rain Neon + Intercepted Pacific Signal Arcs + Whiskey & Rotary Phone */}
      {sec >= 15.0 && sec < 34.2 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: phaseBIn * phaseBOut,
            transformStyle: "preserve-3d",
          }}
        >
          <PhotoBackdrop
            id="taipei_neon"
            tone="amber"
            opacity={0.62}
            scale={1.06 + (sec - 15) * 0.005}
            blurPx={3}
            translateZ={-180}
          />

          {/* Curved Signal Arcs Spanning Frame Without Labels */}
          <svg
            viewBox="0 0 1920 1080"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            {[0, 1, 2, 3].map((i) => (
              <ellipse
                key={i}
                cx="960"
                cy="980"
                rx={520 + i * 240}
                ry={220 + i * 115}
                fill="none"
                stroke="rgba(245, 166, 35, 0.16)"
                strokeWidth="1.5"
              />
            ))}
            <path
              d="M 1480 420 Q 980 120 510 510"
              fill="none"
              stroke={COLORS.amber}
              strokeWidth="4.5"
              strokeDasharray="16 12"
              strokeDashoffset={-frame * 3.5}
              opacity={routeProgress}
            />
            <path
              d="M 510 510 Q 430 660 360 760"
              fill="none"
              stroke={COLORS.nvLime}
              strokeWidth="4.5"
              strokeDasharray="14 10"
              strokeDashoffset={-frame * 3.8}
              opacity={Math.max(0, (routeProgress - 0.3) * 1.5)}
            />
            <path
              d="M 360 760 Q 260 660 220 560"
              fill="none"
              stroke={COLORS.crimson}
              strokeWidth="5"
              strokeDasharray="10 8"
              strokeDashoffset={-frame * 4.2}
              opacity={Math.max(0, (routeProgress - 0.6) * 2.5)}
            />
            {[
              { x: 1480, y: 420, col: COLORS.nvLime },
              { x: 510, y: 510, col: COLORS.amber },
              { x: 360, y: 760, col: COLORS.cyan },
              { x: 220, y: 560, col: COLORS.crimson },
            ].map((node, idx) => {
              const r = 14 + ((frame * 0.9 + idx * 22) % 58);
              const op = 1 - ((frame * 0.9 + idx * 22) % 58) / 58;
              return (
                <g key={idx}>
                  <circle cx={node.x} cy={node.y} r={r} fill="none" stroke={node.col} strokeWidth="2.5" opacity={op * 0.85} />
                  <circle cx={node.x} cy={node.y} r="9" fill={node.col} />
                </g>
              );
            })}
          </svg>

          {/* Foreground True-Alpha Crystal Whiskey & Vintage Rotary Phone */}
          <div
            style={{
              position: "absolute",
              right: 170,
              bottom: 60,
              transform: "translateZ(110px)",
            }}
          >
            <PhotoCutout id="whiskey" tone="amber" rimColor={COLORS.amber} rimPx={28} height={390} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 140,
              bottom: 110,
              transform: `translateZ(130px) rotate(${Math.sin(sec * 0.9) * 3}deg)`,
            }}
          >
            <PhotoCutout id="phone" tone="crimson" rimColor={COLORS.crimson} rimPx={26} height={340} />
          </div>
        </div>
      )}

      {/* ACT 0 BEAT C (33.8 - 39.89s): Stark Lone Monumental Title — ZERO Subtitle */}
      {sec >= 33.8 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: titleExit,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 1400,
              height: 4,
              background: `linear-gradient(90deg, transparent, ${
                sec > 38 ? COLORS.crimson : COLORS.gold
              }, transparent)`,
              opacity: 0.45 + audio.pulse * 0.5,
              transform: "translateZ(-40px)",
            }}
          />
          <div
            style={{
              fontFamily: FONTS.serif,
              fontSize: 204,
              fontWeight: 900,
              letterSpacing: "0.18em",
              color: COLORS.ivory,
              transform: `scale(${0.86 + titleSlam * 0.14}) translateZ(${titleSlam * 90}px)`,
              opacity: titleSlam,
              textShadow: `0 0 70px ${
                sec > 38 ? COLORS.crimson : COLORS.amber
              }88, 0 24px 64px rgba(0,0,0,0.98)`,
            }}
          >
            鬼迷心窍
          </div>
        </div>
      )}
    </CinemaStage>
  );
};
