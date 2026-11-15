import React, { useLayoutEffect, useRef } from "react";
import { COLORS } from "../design/tokens";
import { useAudioFrame, useGlobalFrame } from "../data/audio";
import { hash01 } from "./math";

// 1. Optical Rain-Streaked Windowpane Overlay (cleanly composites over real Taipei photography)
export const RainGlassOverlay: React.FC<{ warmTint?: boolean }> = ({ warmTint = true }) => {
  const frame = useGlobalFrame();
  return (
    <svg
      viewBox="0 0 1920 1080"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      {Array.from({ length: 34 }).map((_, i) => {
        const x = hash01(i * 41 + 3) * 1880 + 20;
        const baseH = 90 + hash01(i * 19 + 7) * 220;
        const y = ((hash01(i * 89) * 1080 + frame * (2.6 + (i % 4) * 0.9)) % 1200) - 120;
        return (
          <g key={i} opacity={0.34}>
            <line
              x1={x}
              y1={y}
              x2={x + Math.sin(frame * 0.04 + i) * 4}
              y2={y + baseH}
              stroke={warmTint ? "rgba(255, 224, 178, 0.55)" : "rgba(186, 230, 253, 0.55)"}
              strokeWidth="1.4"
            />
            <circle cx={x} cy={y + baseH} r="3.2" fill={warmTint ? "#FFE8C2" : "#E0F2FE"} />
          </g>
        );
      })}
      {/* Dark architectural window mullions adding foreground depth */}
      <rect x="610" y="0" width="20" height="1080" fill="rgba(4,4,6,0.72)" />
      <rect x="1280" y="0" width="20" height="1080" fill="rgba(4,4,6,0.72)" />
    </svg>
  );
};

// 2. Plunging Crimson Financial Candlesticks Rain Layer (no chart axes, overlays real NYSE/WallSt photos)
export const CrimsonCandlestickDeluge: React.FC<{
  intensity?: number;
}> = ({ intensity = 1 }) => {
  const frame = useGlobalFrame();
  const audio = useAudioFrame();

  return (
    <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", pointerEvents: "none" }}>
      {Array.from({ length: 18 }).map((_, c) => {
        const s = hash01(c * 43 + 9);
        const speed = 7 + (c % 5) * 3.5;
        const y = ((s * 1400 + frame * speed * intensity) % 1500) - 380;
        const x = 140 + c * 96 + Math.sin(c * 2.1) * 24;
        const bodyH = 130 + (c % 4) * 65 + audio.rms * 28;
        const widthPx = c % 3 === 0 ? 32 : 18;
        const z = -220 + (c % 6) * 85;
        return (
          <div
            key={c}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: widthPx,
              height: bodyH,
              transform: `translateZ(${z}px)`,
              background: `linear-gradient(180deg, #FF6478 0%, ${COLORS.crimson} 65%, #7E081B 100%)`,
              boxShadow: `0 0 28px ${COLORS.crimson}`,
              borderRadius: 3,
              opacity: 0.78,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -110,
                width: 3,
                height: 110,
                background: COLORS.crimson,
                transform: "translateX(-50%)",
                opacity: 0.6,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

// 3. Foggy Night Highway Volumetric High-Beam Headlights (Canvas2D overlay on bg_road_fog)
export const FoggyHighwayBeams: React.FC<{
  beamIntensity?: number;
}> = ({ beamIntensity = 1 }) => {
  const frame = useGlobalFrame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 1920;
    const h = 1080;
    ctx.clearRect(0, 0, w, h);
    const horizonY = h * 0.48;

    // Subtle moving center road dashes across lower foreground
    const scroll = ((frame * 0.055) % 1 + 1) % 1;
    for (let i = 0; i < 9; i++) {
      const t0 = Math.pow((i + scroll) / 9, 2.2);
      const t1 = Math.pow((i + scroll + 0.4) / 9, 2.2);
      const y0 = horizonY + 120 + t0 * (h - horizonY - 120);
      const y1 = horizonY + 120 + t1 * (h - horizonY - 120);
      const w0 = 3 + t0 * 14;
      const w1 = 3 + t1 * 14;
      ctx.fillStyle = `rgba(245, 166, 35, ${0.14 + t0 * 0.55})`;
      ctx.beginPath();
      ctx.moveTo(w * 0.5 - w0, y0);
      ctx.lineTo(w * 0.5 + w0, y0);
      ctx.lineTo(w * 0.5 + w1, y1);
      ctx.lineTo(w * 0.5 - w1, y1);
      ctx.closePath();
      ctx.fill();
    }

    // Dual blinding volumetric high-beam headlight cones cutting night fog (zero hard polygon or top edges)
    ctx.save();
    ctx.filter = "blur(32px)";
    const drawBeam = (srcX: number, spreadL: number, spreadR: number) => {
      const grad = ctx.createLinearGradient(0, h, 0, horizonY - 110);
      grad.addColorStop(0, `rgba(255, 248, 224, ${0.58 * beamIntensity})`);
      grad.addColorStop(0.38, `rgba(186, 230, 253, ${0.26 * beamIntensity})`);
      grad.addColorStop(0.76, `rgba(186, 230, 253, ${0.08 * beamIntensity})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(srcX - 42, h + 30);
      ctx.lineTo(srcX + 42, h + 30);
      ctx.lineTo(spreadR, horizonY - 110);
      ctx.lineTo(spreadL, horizonY - 110);
      ctx.closePath();
      ctx.fill();
    };
    drawBeam(w * 0.36, w * 0.14, w * 0.68);
    drawBeam(w * 0.64, w * 0.32, w * 0.86);
    ctx.restore();
  }, [frame, beamIntensity]);

  return (
    <canvas
      ref={canvasRef}
      width={1920}
      height={1080}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
};

// 4. Dark Rippling Water Plane for $100M Sinking Impact
export const LakeRippleCanvas: React.FC<{
  dropProgress: number; // 0..1
}> = ({ dropProgress }) => {
  const frame = useGlobalFrame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 1920, 1080);

    const cx = 960;
    const waterY = 670;

    // Dark abyss reflection mirror surface below horizon
    const waterBg = ctx.createLinearGradient(0, waterY - 80, 0, 1080);
    waterBg.addColorStop(0, "rgba(4,8,14,0)");
    waterBg.addColorStop(0.25, "rgba(4,9,16,0.78)");
    waterBg.addColorStop(1, "rgba(2,4,8,0.96)");
    ctx.fillStyle = waterBg;
    ctx.fillRect(0, waterY - 80, 1920, 1080 - (waterY - 80));

    // Submerged glowing amber aura under surface
    const g = ctx.createRadialGradient(cx, waterY, 10, cx, waterY, 540);
    g.addColorStop(0, "rgba(245, 166, 35, 0.34)");
    g.addColorStop(0.4, "rgba(34, 211, 238, 0.16)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 320, 1920, 760);

    // Expanding concentric elliptical water ripples
    for (let r = 0; r < 6; r++) {
      const phase = (dropProgress * 2.2 + r * 0.16 + frame * 0.004) % 1;
      const rx = 45 + phase * 680;
      const ry = 12 + phase * 160;
      const alpha = (1 - phase) * 0.78;
      ctx.strokeStyle =
        r % 2 === 0
          ? `rgba(245, 166, 35, ${alpha})`
          : `rgba(125, 211, 252, ${alpha * 0.85})`;
      ctx.lineWidth = 3.2 * (1 - phase * 0.65);
      ctx.beginPath();
      ctx.ellipse(cx, waterY, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, [frame, dropProgress]);

  return (
    <canvas
      ref={canvasRef}
      width={1920}
      height={1080}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
};
