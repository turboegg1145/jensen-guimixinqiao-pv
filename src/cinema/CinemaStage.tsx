import React, { useLayoutEffect, useRef } from "react";
import { useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../design/tokens";
import { useAudioFrame, useGlobalFrame } from "../data/audio";
import { hash01 } from "./math";

export type CinemaMood =
  | "emeraldVault"
  | "amberBar"
  | "crimsonAlarm"
  | "rainyBlue"
  | "amdScarlet"
  | "noirGold";

interface MoodConfig {
  bgInner: string;
  bgOuter: string;
  primary: string;
  secondary: string;
  flare: string;
}

const MOOD_PRESETS: Record<CinemaMood, MoodConfig> = {
  emeraldVault: {
    bgInner: "#071E16",
    bgOuter: "#030607",
    primary: COLORS.nvLime,
    secondary: COLORS.cyan,
    flare: COLORS.nvGreen,
  },
  amberBar: {
    bgInner: "#281306",
    bgOuter: "#070403",
    primary: COLORS.amber,
    secondary: COLORS.amberHot,
    flare: COLORS.gold,
  },
  crimsonAlarm: {
    bgInner: "#2E070F",
    bgOuter: "#070204",
    primary: COLORS.crimson,
    secondary: COLORS.amber,
    flare: COLORS.crimsonDeep,
  },
  rainyBlue: {
    bgInner: "#0C1826",
    bgOuter: "#04060A",
    primary: COLORS.iceBlue,
    secondary: COLORS.nvLime,
    flare: COLORS.cyan,
  },
  amdScarlet: {
    bgInner: "#330709",
    bgOuter: "#080304",
    primary: COLORS.amdRed,
    secondary: COLORS.gold,
    flare: COLORS.amdRed,
  },
  noirGold: {
    bgInner: "#12151C",
    bgOuter: "#040507",
    primary: COLORS.gold,
    secondary: "#CBD5E1",
    flare: COLORS.amber,
  },
};

export interface CinemaStageProps {
  mood: CinemaMood;
  camRotateX?: number;
  camRotateY?: number;
  camRotateZ?: number;
  camX?: number;
  camY?: number;
  camZ?: number;
  beatShake?: number;
  rain?: number; // 0..1 diagonal storm rain
  bokeh?: number; // 0..1 shallow DOF out-of-focus neon orbs
  blinds?: number; // 0..1 Venetian blind hard shadow stripes
  anamorphicFlare?: number; // 0..1 Wong Kar-wai horizontal streak intensity
  smoke?: number; // 0..1 volumetric haze clouds
  vignette?: number; // 0..1 optical edge falloff
  children: React.ReactNode;
}

export const CinemaStage: React.FC<CinemaStageProps> = ({
  mood,
  camRotateX = 0,
  camRotateY = 0,
  camRotateZ = 0,
  camX = 0,
  camY = 0,
  camZ = 0,
  beatShake = 0.7,
  rain = 0.15,
  bokeh = 0.65,
  blinds = 0,
  anamorphicFlare = 0.5,
  smoke = 0.55,
  vignette = 0.78,
  children,
}) => {
  const frame = useGlobalFrame();
  const { width, height } = useVideoConfig();
  const audio = useAudioFrame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cfg = MOOD_PRESETS[mood];

  // Synchronous Canvas2D atmosphere pass (volumetric haze, deep bokeh, anamorphic streak)
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // 1. Deep asymmetric cinematic background wash (never flat black)
    const washX = width * (0.5 + Math.sin(frame * 0.009) * 0.14);
    const washY = height * (0.42 + Math.cos(frame * 0.007) * 0.08);
    const baseGrad = ctx.createRadialGradient(
      washX,
      washY,
      30,
      width * 0.5,
      height * 0.5,
      width * 0.78
    );
    baseGrad.addColorStop(0, cfg.bgInner);
    baseGrad.addColorStop(0.55, cfg.bgOuter);
    baseGrad.addColorStop(1, "#020304");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Volumetric slow smoke pockets reacting subtly to bass RMS
    if (smoke > 0.02) {
      for (let s = 0; s < 5; s++) {
        const sx =
          ((hash01(s * 17 + 1) * 1.4 - 0.2 + Math.sin(frame * 0.004 + s) * 0.12) %
            1.4) *
          width;
        const sy =
          height * (0.28 + hash01(s * 31 + 3) * 0.52) +
          Math.cos(frame * 0.006 + s * 2.1) * 40;
        const sr = width * (0.26 + hash01(s * 47) * 0.22);
        const sg = ctx.createRadialGradient(sx, sy, 10, sx, sy, sr);
        const col = s % 2 === 0 ? cfg.primary : cfg.secondary;
        const alphaHex = Math.round(
          Math.min(42, (14 + audio.rms * 16) * smoke)
        )
          .toString(16)
          .padStart(2, "0");
        sg.addColorStop(0, `${col}${alphaHex}`);
        sg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = sg;
        ctx.fillRect(0, 0, width, height);
      }
    }

    // 3. Mid/background out-of-focus bokeh orbs (50mm f/1.2 neon depth)
    if (bokeh > 0.02) {
      const count = 26;
      for (let b = 0; b < count; b++) {
        const rx = hash01(b * 71 + 9);
        const ry = hash01(b * 113 + 5);
        const depth = hash01(b * 151 + 11); // 0 far .. 1 close
        const driftX =
          ((rx * width + frame * (0.18 + depth * 0.45) * (b % 2 === 0 ? 1 : -0.6)) %
            (width + 260)) -
          130;
        const driftY =
          ((ry * height + Math.sin(frame * 0.012 + b) * (18 + depth * 28) + height) %
            (height + 200)) -
          100;
        const r = 18 + depth * 62;
        const orbCol = b % 3 === 0 ? cfg.secondary : cfg.primary;
        const aMid = Math.min(0.22, (0.045 + (1 - depth * 0.4) * 0.085) * bokeh);
        const bg = ctx.createRadialGradient(driftX, driftY, r * 0.15, driftX, driftY, r);
        bg.addColorStop(0, `${orbCol}${Math.round(aMid * 255).toString(16).padStart(2, "0")}`);
        bg.addColorStop(0.75, `${orbCol}${Math.round(aMid * 150).toString(16).padStart(2, "0")}`);
        bg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(driftX, driftY, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 4. Anamorphic horizontal lens flare across frame (smooth breathing without twitch)
    if (anamorphicFlare > 0.02) {
      const flareAlpha = Math.min(0.42, (0.1 + audio.rms * 0.24) * anamorphicFlare);
      const flareY = height * (0.34 + Math.sin(frame * 0.006) * 0.1);
      const fg = ctx.createLinearGradient(0, flareY, width, flareY);
      fg.addColorStop(0, "rgba(0,0,0,0)");
      fg.addColorStop(0.2, `${cfg.flare}18`);
      fg.addColorStop(0.5, `${cfg.primary}${Math.round(flareAlpha * 255).toString(16).padStart(2, "0")}`);
      fg.addColorStop(0.8, `${cfg.secondary}22`);
      fg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = fg;
      ctx.fillRect(0, flareY - 3, width, 6);

      const halo = ctx.createLinearGradient(0, flareY - 24, 0, flareY + 24);
      halo.addColorStop(0, "rgba(0,0,0,0)");
      halo.addColorStop(0.5, `${cfg.primary}1A`);
      halo.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(width * 0.1, flareY - 24, width * 0.8, 48);
    }

    // 5. Diagonal falling cinema rain (foreground & midground needles)
    if (rain > 0.02) {
      const drops = Math.round(55 + rain * 130);
      ctx.lineCap = "round";
      for (let r = 0; r < drops; r++) {
        const s1 = hash01(r * 23 + 4);
        const s2 = hash01(r * 59 + 8);
        const speed = 22 + s2 * 26;
        const px =
          ((s1 * width * 1.35 - frame * 3.8 * (0.7 + s2 * 0.5)) % (width + 200) +
            (width + 200)) %
            (width + 200) -
          100;
        const py =
          ((s2 * height + frame * speed) % (height + 160)) - 80;
        const len = 34 + s2 * 58;
        ctx.strokeStyle =
          r % 5 === 0
            ? `rgba(255, 255, 255, ${0.14 * rain})`
            : `${cfg.primary}${Math.round((0.12 + s2 * 0.16) * rain * 255)
                .toString(16)
                .padStart(2, "0")}`;
        ctx.lineWidth = s2 > 0.78 ? 1.8 : 0.9;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px - len * 0.24, py + len);
        ctx.stroke();
      }
    }
  }, [frame, width, height, audio, cfg, rain, bokeh, anamorphicFlare, smoke]);

  // Pure silky 35mm gimbal float — ZERO high-frequency shake or bass camera thumping
  const sec = frame / 60;
  const breathX = Math.sin(sec * 0.42) * 4.0 + Math.cos(sec * 0.65) * 1.8;
  const breathY = Math.cos(sec * 0.36) * 2.8 + Math.sin(sec * 0.52) * 1.2;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#020304",
        overflow: "hidden",
        fontFamily: FONTS.sans,
        color: COLORS.textPrimary,
      }}
    >
      {/* Background atmospheric lighting + smoke + rain + deep bokeh */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* 2.5D Perspective Camera Stage */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: "1600px",
          perspectiveOrigin: "50% 48%",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform: `translate3d(${camX + breathX}px, ${camY + breathY}px, ${camZ}px) rotateX(${
              camRotateX + Math.cos(sec * 0.32) * 0.3
            }deg) rotateY(${
              camRotateY + Math.sin(sec * 0.36) * 0.4
            }deg) rotateZ(${camRotateZ}deg)`,
          }}
        >
          {children}
        </div>
      </div>

      {/* Venetian blind neo-noir hard shadow strips */}
      {blinds > 0.02 && (
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            pointerEvents: "none",
            opacity: blinds,
            transform: "rotate(-14deg)",
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.82) 0px, rgba(0,0,0,0.82) 34px, rgba(0,0,0,0) 34px, rgba(0,0,0,0) 76px)",
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* Subtle steady analog film texture (no frame-by-frame flicker) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.022,
          backgroundImage:
            "repeating-radial-gradient(circle at 22% 33%, rgba(255,255,255,0.65) 0, rgba(0,0,0,0.65) 1px, transparent 2px)",
          backgroundSize: "6px 6px",
        }}
      />

      {/* Optical Anamorphic Edge Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse 84% 78% at 50% 48%, rgba(0,0,0,0) 48%, rgba(2,3,5,${vignette}) 100%)`,
        }}
      />
    </div>
  );
};
