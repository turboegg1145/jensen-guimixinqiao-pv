import React, { useLayoutEffect, useRef } from "react";
import { Img, staticFile } from "remotion";
import { COLORS, FONTS } from "./design/tokens";
import { PhotoCutout } from "./cinema/PhotoMedia";
import { hash01 } from "./cinema/math";

const COVER_W = 1600;
const COVER_H = 1200;

interface CrashCandle {
  x: number;
  y: number;
  w: number;
  h: number;
  wickTop: number;
  wickBottom: number;
  emerald?: boolean;
  opacity: number;
  blur?: number;
}

// Shifted +44px cleanly clear of 《鬼迷心窍》 right glyph stroke
const MARKET_CANDLES: CrashCandle[] = [
  { x: 632, y: 122, w: 18, h: 122, wickTop: 58, wickBottom: 44, emerald: true, opacity: 0.78 },
  { x: 676, y: 84, w: 24, h: 152, wickTop: 52, wickBottom: 56, emerald: true, opacity: 0.92 },
  { x: 726, y: 182, w: 24, h: 208, wickTop: 82, wickBottom: 68, opacity: 0.80 },
  { x: 774, y: 282, w: 30, h: 262, wickTop: 108, wickBottom: 82, opacity: 0.92 },
  { x: 824, y: 416, w: 24, h: 224, wickTop: 94, wickBottom: 78, opacity: 0.82 },
  { x: 870, y: 532, w: 34, h: 318, wickTop: 126, wickBottom: 102, opacity: 0.94 },
  { x: 922, y: 686, w: 26, h: 245, wickTop: 102, wickBottom: 88, opacity: 0.70, blur: 0.8 },
  { x: 590, y: 266, w: 14, h: 108, wickTop: 46, wickBottom: 36, opacity: 0.40, blur: 1.8 },
];

export const Cover4x3: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, COVER_W, COVER_H);

    // 1. Deep Noir Obsidian Gradient Base
    const bgGrad = ctx.createRadialGradient(
      COVER_W * 0.58,
      COVER_H * 0.42,
      70,
      COVER_W * 0.48,
      COVER_H * 0.5,
      COVER_W * 0.88
    );
    bgGrad.addColorStop(0, "#2E0711");
    bgGrad.addColorStop(0.42, "#0B1014");
    bgGrad.addColorStop(1, "#030406");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, COVER_W, COVER_H);

    const addGlow = (
      cx: number,
      cy: number,
      r: number,
      inner: string,
      mid: string
    ) => {
      const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
      g.addColorStop(0, inner);
      g.addColorStop(0.45, mid);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, COVER_W, COVER_H);
    };

    // Rich Dual-Split Lighting: NVIDIA Emerald Aura vs Taipei Amber vs Crimson Alarm
    addGlow(1170, 260, 690, "rgba(166, 240, 22, 0.36)", "rgba(12, 86, 48, 0.16)");
    addGlow(1490, 560, 560, "rgba(255, 46, 76, 0.48)", "rgba(141, 10, 29, 0.24)");
    addGlow(350, 940, 580, "rgba(245, 166, 35, 0.46)", "rgba(255, 120, 40, 0.16)");
    addGlow(330, 280, 540, "rgba(210, 24, 52, 0.30)", "rgba(24, 10, 14, 0.08)");

    // 2. Luminous 50mm f/1.2 Bokeh Orbs Across Background
    for (let b = 0; b < 38; b++) {
      const rx = hash01(b * 73 + 13) * COVER_W;
      const ry = hash01(b * 109 + 7) * COVER_H;
      const depth = hash01(b * 149 + 3);
      const r = 16 + depth * 66;
      const palette =
        b % 4 === 0
          ? COLORS.nvLime
          : b % 4 === 1
          ? COLORS.amber
          : b % 4 === 2
          ? COLORS.crimson
          : COLORS.amberHot;
      const a0 = Math.round((0.08 + (1 - depth) * 0.14) * 255)
        .toString(16)
        .padStart(2, "0");
      const a1 = Math.round((0.04 + (1 - depth) * 0.07) * 255)
        .toString(16)
        .padStart(2, "0");
      const og = ctx.createRadialGradient(rx, ry, r * 0.1, rx, ry, r);
      og.addColorStop(0, `${palette}${a0}`);
      og.addColorStop(0.72, `${palette}${a1}`);
      og.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = og;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Anamorphic Horizontal Lens Flare Crossing Jensen Eyeline
    const flareY = 468;
    const fg = ctx.createLinearGradient(60, flareY, COVER_W, flareY);
    fg.addColorStop(0, "rgba(0,0,0,0)");
    fg.addColorStop(0.22, "rgba(245, 166, 35, 0.24)");
    fg.addColorStop(0.54, "rgba(255, 46, 76, 0.44)");
    fg.addColorStop(0.82, "rgba(166, 240, 22, 0.34)");
    fg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fg;
    ctx.fillRect(0, flareY - 2, COVER_W, 4);

    const halo = ctx.createLinearGradient(0, flareY - 28, 0, flareY + 28);
    halo.addColorStop(0, "rgba(0,0,0,0)");
    halo.addColorStop(0.5, "rgba(255, 190, 140, 0.14)");
    halo.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = halo;
    ctx.fillRect(80, flareY - 28, COVER_W - 160, 56);

    // 4. Crisp Diagonal Midnight Rain Needles
    ctx.lineCap = "round";
    for (let r = 0; r < 125; r++) {
      const px = hash01(r * 37 + 5) * (COVER_W + 180) - 90;
      const py = hash01(r * 67 + 11) * (COVER_H + 140) - 70;
      const len = 34 + hash01(r * 97 + 2) * 68;
      const bright = hash01(r * 131);
      ctx.strokeStyle =
        r % 5 === 0
          ? `rgba(166, 240, 22, ${0.12 + bright * 0.16})`
          : r % 3 === 0
          ? `rgba(255, 128, 48, ${0.10 + bright * 0.15})`
          : `rgba(255, 255, 255, ${0.07 + bright * 0.13})`;
      ctx.lineWidth = bright > 0.78 ? 1.8 : 0.95;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - len * 0.24, py + len);
      ctx.stroke();
    }
  }, []);

  const jensenUrl = staticFile("media/cut_jensen_closeup.png");

  return (
    <div
      style={{
        position: "relative",
        width: COVER_W,
        height: COVER_H,
        overflow: "hidden",
        backgroundColor: "#030406",
        fontFamily: FONTS.serif,
      }}
    >
      {/* Layer 1: Atmospheric Canvas2D Base & Bokeh */}
      <canvas
        ref={canvasRef}
        width={COVER_W}
        height={COVER_H}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Layer 2A: Real Taipei Neon Night Avenue (left/midground glow) */}
      <div
        style={{
          position: "absolute",
          inset: -20,
          opacity: 0.64,
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 76% at 32% 54%, rgba(0,0,0,1) 24%, rgba(0,0,0,0) 88%)",
          maskImage:
            "radial-gradient(ellipse 72% 76% at 32% 54%, rgba(0,0,0,1) 24%, rgba(0,0,0,0) 88%)",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("media/bg_taipei_neon.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "28% 50%",
            filter: "contrast(1.26) brightness(0.80) saturate(1.30) blur(2.8px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(24,6,10,0.62) 0%, rgba(185,78,12,0.22) 55%, rgba(4,6,8,0.82) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* Layer 2B: Iridescent Silicon Wafer Disc Cyber-Halo Behind Jensen Crown */}
      <div
        style={{
          position: "absolute",
          inset: -20,
          opacity: 0.84,
          WebkitMaskImage:
            "radial-gradient(ellipse 66% 70% at 77% 38%, rgba(0,0,0,1) 28%, rgba(0,0,0,0) 85%)",
          maskImage:
            "radial-gradient(ellipse 66% 70% at 77% 38%, rgba(0,0,0,1) 28%, rgba(0,0,0,0) 85%)",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("media/bg_wafer_discs.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "78% 42%",
            filter:
              "contrast(1.30) brightness(0.92) saturate(1.28) hue-rotate(-10deg) blur(1.2px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 74% 34%, rgba(166,240,22,0.34), rgba(141,10,29,0.26) 56%, rgba(4,6,8,0.86) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* Layer 3: Venetian Blind Noir Shadow Stripes Across Frame */}
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          pointerEvents: "none",
          opacity: 0.22,
          transform: "rotate(-13deg)",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 30px, rgba(0,0,0,0) 30px, rgba(0,0,0,0) 82px)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Layer 4: NVIDIA Green Peak -> Violent Crimson Stock Plunge Candlesticks + Crash Arrow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {MARKET_CANDLES.map((c, idx) => {
          const isGreen = Boolean(c.emerald);
          const bodyGrad = isGreen
            ? "linear-gradient(180deg, #D2FF5E 0%, #76B900 62%, #1D3D04 100%)"
            : "linear-gradient(180deg, #FF7C8F 0%, #FF2E4C 54%, #7A0517 100%)";
          const glow = isGreen
            ? "0 0 28px rgba(166, 240, 22, 0.78), 0 0 10px rgba(210, 255, 110, 0.5)"
            : "0 0 34px rgba(255, 46, 76, 0.80), 0 0 12px rgba(255, 150, 165, 0.45)";
          const wickColor = isGreen ? COLORS.nvLime : "#FF3D5A";
          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: c.x,
                top: c.y,
                width: c.w,
                height: c.h,
                borderRadius: 3,
                background: bodyGrad,
                boxShadow: glow,
                opacity: c.opacity,
                filter: c.blur ? `blur(${c.blur}px)` : undefined,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: -c.wickTop,
                  width: Math.max(2, Math.round(c.w * 0.14)),
                  height: c.wickTop + c.h + c.wickBottom,
                  transform: "translateX(-50%)",
                  background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, ${wickColor} 24%, ${wickColor} 76%, rgba(0,0,0,0) 100%)`,
                  opacity: 0.85,
                }}
              />
            </div>
          );
        })}

        {/* Sharp Luminous Green-to-Crimson Market Collapse Arrow (cleanly clear of 《鬼迷心窍》) */}
        <svg
          viewBox={`0 0 ${COVER_W} ${COVER_H}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient
              id="crashStroke"
              x1="600"
              y1="100"
              x2="940"
              y2="820"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={COLORS.nvLime} stopOpacity="0.95" />
              <stop offset="20%" stopColor="#FFE17D" stopOpacity="0.96" />
              <stop offset="36%" stopColor={COLORS.crimson} stopOpacity="1" />
              <stop offset="100%" stopColor="#FF1A3C" stopOpacity="0.96" />
            </linearGradient>
            <filter id="crashGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="7.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M 604 146 L 682 82 L 748 268 L 812 222 L 940 742"
            fill="none"
            stroke="url(#crashStroke)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#crashGlow)"
            opacity="0.95"
          />
          <polygon
            points="950,776 912,730 960,716"
            fill="#FF2E4C"
            filter="url(#crashGlow)"
          />
        </svg>
      </div>

      {/* Layer 5: Towering Hero Portrait — Alpha-Masked Environmental Dual Lighting (ZERO seams!) */}
      <div
        style={{
          position: "absolute",
          right: -46,
          bottom: -44,
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,1) 60%, rgba(0,0,0,0.46) 75%, rgba(0,0,0,0) 88%)",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,1) 60%, rgba(0,0,0,0.46) 75%, rgba(0,0,0,0) 88%)",
          pointerEvents: "none",
        }}
      >
        {/* Smooth circular emerald-lime halo behind his left shoulder & temple */}
        <div
          style={{
            position: "absolute",
            left: -80,
            top: 70,
            width: 520,
            height: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(166,240,22,0.34) 0%, rgba(245,166,35,0.12) 48%, rgba(0,0,0,0) 72%)",
            filter: "blur(34px)",
          }}
        />
        {/* Smooth circular crimson halo behind his right silver hair & shoulder */}
        <div
          style={{
            position: "absolute",
            right: -60,
            top: 220,
            width: 560,
            height: 680,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,46,76,0.38) 0%, rgba(141,10,29,0.16) 52%, rgba(0,0,0,0) 76%)",
            filter: "blur(38px)",
          }}
        />

        {/* Portrait + Alpha-locked environmental rim-light color glaze (only touches portrait pixels!) */}
        <div style={{ position: "relative", height: 1185, width: Math.round((1185 * 603) / 880) }}>
          <PhotoCutout
            id="jensen_closeup"
            tone="noir"
            rimColor={COLORS.crimson}
            rimPx={26}
            height={1185}
            width="100%"
            brightness={0.92}
            contrast={1.25}
            saturate={0.90}
            sepia={0.07}
            style={{
              filter:
                "contrast(1.25) brightness(0.92) saturate(0.90) sepia(0.07) drop-shadow(-18px -6px 32px rgba(166,240,22,0.34)) drop-shadow(22px 4px 40px rgba(255,46,76,0.58)) drop-shadow(0 30px 58px rgba(0,0,0,0.96))",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(108deg, rgba(166,240,22,0.22) 8%, rgba(245,166,35,0.12) 34%, rgba(0,0,0,0) 56%, rgba(255,46,76,0.30) 94%)",
              mixBlendMode: "soft-light",
              WebkitMaskImage: `url(${jensenUrl})`,
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: `url(${jensenUrl})`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />
        </div>
      </div>

      {/* Layer 6: Dark Reflective Taipei Bar Surface & Grounded Scandal Props (Whiskey + Flat-Perspective Rings) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 960,
          height: 580,
          pointerEvents: "none",
        }}
      >
        {/* Dark bar surface plane */}
        <div
          style={{
            position: "absolute",
            left: -40,
            right: 40,
            bottom: -10,
            height: 235,
            background:
              "linear-gradient(180deg, rgba(8,6,8,0) 0%, rgba(10,6,8,0.88) 34%, rgba(4,3,5,0.98) 100%)",
          }}
        />
        {/* Warm bar-table pool reflecting whiskey & gold */}
        <div
          style={{
            position: "absolute",
            left: 35,
            bottom: 34,
            width: 720,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at 38% 52%, rgba(245,166,35,0.56) 0%, rgba(255,90,40,0.22) 48%, rgba(0,0,0,0) 76%)",
            filter: "blur(22px)",
          }}
        />

        {/* Subtle glossy inverted reflection under whiskey glass */}
        <div
          style={{
            position: "absolute",
            left: 112,
            bottom: -140,
            opacity: 0.25,
            filter: "blur(5px)",
            transform: "scaleY(-0.55) rotate(2.5deg)",
            WebkitMaskImage:
              "linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.9) 100%)",
            maskImage:
              "linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.9) 100%)",
          }}
        >
          <PhotoCutout id="whiskey" tone="amber" rimPx={0} height={420} />
        </div>

        {/* Whiskey contact shadow on bar */}
        <div
          style={{
            position: "absolute",
            left: 158,
            bottom: 54,
            width: 245,
            height: 44,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(0,0,0,0.96) 25%, transparent 74%)",
          }}
        />

        {/* Real Taipei Whiskey Glass */}
        <div
          style={{
            position: "absolute",
            left: 98,
            bottom: 62,
            transform: "rotate(-2.5deg)",
          }}
        >
          <PhotoCutout
            id="whiskey"
            tone="amber"
            rimColor={COLORS.amberHot}
            rimPx={32}
            height={445}
            brightness={1.04}
            contrast={1.20}
            saturate={1.22}
          />
        </div>

        {/* Ground contact shadow under perspective-tilted Gold Rings */}
        <div
          style={{
            position: "absolute",
            left: 410,
            bottom: 66,
            width: 265,
            height: 42,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(0,0,0,0.96) 35%, transparent 76%)",
          }}
        />

        {/* Real Twin Gold Wedding Rings tilted cleanly onto the bar plane */}
        <div
          style={{
            position: "absolute",
            left: 396,
            bottom: 68,
            transform: "perspective(640px) rotateX(48deg) rotateZ(-10deg)",
            transformOrigin: "center bottom",
          }}
        >
          <PhotoCutout
            id="rings"
            tone="gold"
            rimColor={COLORS.gold}
            rimPx={22}
            height={148}
            brightness={1.06}
            contrast={1.22}
            saturate={1.12}
            sepia={0.18}
          />
        </div>
      </div>

      {/* Layer 7: Colossal Monumental Cinema Typography — Pure 《鬼迷心窍》 (ZERO Subtitles) */}
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 56,
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        {/* Optical gold-crimson gleam bisecting subtly behind typography */}
        <div
          style={{
            position: "absolute",
            left: -48,
            top: 244,
            width: 680,
            height: 4,
            background:
              "linear-gradient(90deg, rgba(232,186,90,0) 0%, rgba(255,46,76,0.92) 34%, rgba(245,166,35,0.82) 66%, rgba(232,186,90,0) 100%)",
            boxShadow: "0 0 26px rgba(255,46,76,0.8)",
          }}
        />

        {/* Deep Extruded Crimson-Black Shadow Pass */}
        <div
          style={{
            position: "relative",
            fontFamily: FONTS.serif,
            fontWeight: 900,
            fontSize: 256,
            lineHeight: 0.94,
            letterSpacing: "0.02em",
            color: "transparent",
            textShadow:
              "0 16px 38px rgba(0,0,0,0.99), 0 0 74px rgba(255, 46, 76, 0.84), 0 0 24px rgba(245, 166, 35, 0.58)",
            userSelect: "none",
          }}
        >
          <div>鬼迷</div>
          <div>心窍</div>
        </div>

        {/* Sculpted Ivory-Gold Illuminated Glyph Surface */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            fontFamily: FONTS.serif,
            fontWeight: 900,
            fontSize: 256,
            lineHeight: 0.94,
            letterSpacing: "0.02em",
            background:
              "linear-gradient(172deg, #FFFFFF 0%, #FAF3E3 36%, #F6D27D 74%, #DC8B28 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.95))",
            userSelect: "none",
          }}
        >
          <div>鬼迷</div>
          <div>心窍</div>
        </div>
      </div>

      {/* Layer 8: Soft Bottom-Edge Noir Atmosphere + 35mm Film Grain & Perimeter Vignette */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 110,
          background:
            "linear-gradient(180deg, rgba(3,4,6,0) 0%, rgba(3,4,6,0.86) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.026,
          backgroundImage:
            "repeating-radial-gradient(circle at 22% 33%, rgba(255,255,255,0.65) 0, rgba(0,0,0,0.65) 1px, transparent 2px)",
          backgroundSize: "6px 6px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 88% 84% at 52% 48%, rgba(0,0,0,0) 52%, rgba(2,3,5,0.82) 100%)",
        }}
      />
    </div>
  );
};
