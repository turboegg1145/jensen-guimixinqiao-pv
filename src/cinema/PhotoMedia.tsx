import React from "react";
import { Img, staticFile } from "remotion";
import { COLORS } from "../design/tokens";

export type CutoutId =
  | "jensen_closeup"
  | "jensen_front"
  | "jensen_gesture"
  | "lisa_su"
  | "exec_woman"
  | "trump"
  | "cook"
  | "musk"
  | "trader"
  | "handset_woman"
  | "jacket"
  | "whiskey"
  | "phone"
  | "gavel"
  | "trophy"
  | "scale"
  | "stag"
  | "gpu"
  | "rings"
  | "chair"
  | "leeks";

export type BackdropId =
  | "servers"
  | "taipei_neon"
  | "whiskey_bar"
  | "capitol"
  | "paparazzi"
  | "crowd_phones"
  | "nyse"
  | "trading_floor"
  | "wallst_night"
  | "press"
  | "hospital"
  | "boardroom"
  | "corridor"
  | "road_fog"
  | "wafer"
  | "wafer_discs"
  | "falcon"
  | "scotus"
  | "crowd"
  | "apple_park"
  | "rings_crimson";

export type DocPlateId = "fbi" | "nsa";

export type NoirGradeTone =
  | "emerald"
  | "amber"
  | "crimson"
  | "cyan"
  | "gold"
  | "amdRed"
  | "noir";

const CUTOUT_FILE: Record<CutoutId, string> = {
  jensen_closeup: "media/cut_jensen_closeup.png",
  jensen_front: "media/cut_jensen_front.png",
  jensen_gesture: "media/cut_jensen_gesture.png",
  lisa_su: "media/cut_lisa_su.png",
  exec_woman: "media/cut_exec_woman.png",
  trump: "media/cut_trump.png",
  cook: "media/cut_cook.png",
  musk: "media/cut_musk.png",
  trader: "media/cut_trader.png",
  handset_woman: "media/cut_handset_woman.png",
  jacket: "media/cut_jacket.png",
  whiskey: "media/cut_whiskey.png",
  phone: "media/cut_phone.png",
  gavel: "media/cut_gavel.png",
  trophy: "media/cut_trophy.png",
  scale: "media/cut_scale.png",
  stag: "media/cut_stag.png",
  gpu: "media/cut_gpu.png",
  rings: "media/cut_rings.png",
  chair: "media/cut_chair.png",
  leeks: "media/cut_leeks.png",
};

const BACKDROP_FILE: Record<BackdropId, string> = {
  servers: "media/bg_servers.jpg",
  taipei_neon: "media/bg_taipei_neon.jpg",
  whiskey_bar: "media/bg_whiskey_bar.jpg",
  capitol: "media/bg_capitol.jpg",
  paparazzi: "media/bg_paparazzi.jpg",
  crowd_phones: "media/bg_crowd_phones.jpg",
  nyse: "media/bg_nyse.jpg",
  trading_floor: "media/bg_trading_floor.jpg",
  wallst_night: "media/bg_wallst_night.jpg",
  press: "media/bg_press.jpg",
  hospital: "media/bg_hospital.jpg",
  boardroom: "media/bg_boardroom.jpg",
  corridor: "media/bg_corridor.jpg",
  road_fog: "media/bg_road_fog.jpg",
  wafer: "media/bg_wafer.jpg",
  wafer_discs: "media/bg_wafer_discs.jpg",
  falcon: "media/bg_falcon.jpg",
  scotus: "media/bg_scotus.jpg",
  crowd: "media/bg_crowd.jpg",
  apple_park: "media/bg_apple_park.jpg",
  rings_crimson: "media/bg_rings_crimson.jpg",
};

const DOC_FILE: Record<DocPlateId, string> = {
  fbi: "media/doc_fbi.jpg",
  nsa: "media/doc_nsa.jpg",
};

const GRADE_GLAZE: Record<NoirGradeTone, { wash: string; filter: string; glow: string }> = {
  emerald: {
    wash: "radial-gradient(ellipse at 50% 45%, rgba(16,84,48,0.34) 0%, rgba(4,14,10,0.72) 100%)",
    filter: "contrast(1.18) brightness(0.76) saturate(0.86) hue-rotate(-6deg)",
    glow: COLORS.nvLime,
  },
  amber: {
    wash: "radial-gradient(ellipse at 50% 45%, rgba(165,92,16,0.34) 0%, rgba(18,7,3,0.72) 100%)",
    filter: "contrast(1.16) brightness(0.80) saturate(1.06) sepia(0.24)",
    glow: COLORS.amber,
  },
  crimson: {
    wash: "radial-gradient(ellipse at 50% 45%, rgba(155,14,34,0.38) 0%, rgba(14,3,5,0.75) 100%)",
    filter: "contrast(1.22) brightness(0.74) saturate(0.92)",
    glow: COLORS.crimson,
  },
  cyan: {
    wash: "radial-gradient(ellipse at 50% 45%, rgba(18,78,125,0.36) 0%, rgba(4,9,18,0.74) 100%)",
    filter: "contrast(1.18) brightness(0.75) saturate(0.82)",
    glow: COLORS.iceBlue,
  },
  gold: {
    wash: "radial-gradient(ellipse at 50% 45%, rgba(140,104,28,0.30) 0%, rgba(9,7,5,0.72) 100%)",
    filter: "contrast(1.16) brightness(0.80) saturate(0.95) sepia(0.18)",
    glow: COLORS.gold,
  },
  amdRed: {
    wash: "radial-gradient(ellipse at 50% 45%, rgba(190,16,24,0.40) 0%, rgba(14,3,4,0.74) 100%)",
    filter: "contrast(1.22) brightness(0.78) saturate(0.95)",
    glow: COLORS.amdRed,
  },
  noir: {
    wash: "radial-gradient(ellipse at 50% 45%, rgba(28,34,44,0.30) 0%, rgba(4,5,7,0.76) 100%)",
    filter: "contrast(1.22) brightness(0.76) saturate(0.62)",
    glow: COLORS.gold,
  },
};

export interface PhotoBackdropProps {
  id: BackdropId;
  tone?: NoirGradeTone;
  opacity?: number;
  scale?: number;
  panX?: number;
  panY?: number;
  blurPx?: number;
  translateZ?: number;
  clipPath?: string;
}

export const PhotoBackdrop: React.FC<PhotoBackdropProps> = ({
  id,
  tone = "noir",
  opacity = 0.72,
  scale = 1.06,
  panX = 0,
  panY = 0,
  blurPx = 1.5,
  translateZ = -180,
  clipPath,
}) => {
  const g = GRADE_GLAZE[tone];
  return (
    <div
      style={{
        position: "absolute",
        inset: -40,
        opacity,
        clipPath,
        transform: `translate3d(${panX}px, ${panY}px, ${translateZ}px) scale(${scale})`,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile(BACKDROP_FILE[id])}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `${g.filter}${blurPx > 0 ? ` blur(${blurPx}px)` : ""}`,
        }}
      />
      {/* Color-unified film glaze blending highlights & shadows into CinemaStage */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: g.wash,
          mixBlendMode: "multiply",
        }}
      />
      {/* Deep optical radial edge falloff so subjects never fight the frame edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 78% 72% at 50% 46%, rgba(0,0,0,0.08) 38%, rgba(2,3,5,0.88) 100%)",
        }}
      />
    </div>
  );
};

export interface PhotoCutoutProps {
  id: CutoutId;
  tone?: NoirGradeTone;
  rimColor?: string;
  rimPx?: number;
  height?: number | string;
  width?: number | string;
  opacity?: number;
  brightness?: number;
  contrast?: number;
  saturate?: number;
  sepia?: number;
  grayscale?: number;
  flipX?: boolean;
  style?: React.CSSProperties;
}

export const PhotoCutout: React.FC<PhotoCutoutProps> = ({
  id,
  tone = "noir",
  rimColor,
  rimPx = 22,
  height = 680,
  width = "auto",
  opacity = 1,
  brightness = 0.96,
  contrast = 1.15,
  saturate = 0.88,
  sepia,
  grayscale,
  flipX = false,
  style,
}) => {
  const g = GRADE_GLAZE[tone];
  const rim = rimColor ?? g.glow;
  const sepiaAmt = sepia ?? (tone === "amber" ? 0.16 : tone === "gold" ? 0.12 : 0.04);
  const filterChain = [
    `contrast(${contrast})`,
    `brightness(${brightness})`,
    `saturate(${saturate})`,
    sepiaAmt > 0 ? `sepia(${sepiaAmt})` : "",
    grayscale && grayscale > 0 ? `grayscale(${grayscale})` : "",
    rimPx > 0 ? `drop-shadow(0 0 ${rimPx}px ${rim}88)` : "",
    "drop-shadow(0 24px 48px rgba(0,0,0,0.92))",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Img
      src={staticFile(CUTOUT_FILE[id])}
      style={{
        height,
        width,
        objectFit: "contain",
        opacity,
        filter: filterChain,
        transform: flipX ? "scaleX(-1)" : undefined,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
};

export const DocPlate: React.FC<{
  id: DocPlateId;
  width?: number;
  tone?: NoirGradeTone;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({ id, width = 560, tone = "amber", opacity = 0.92, style }) => {
  const filterStr =
    tone === "crimson"
      ? "contrast(1.3) brightness(0.84) sepia(0.25) hue-rotate(-35deg)"
      : "contrast(1.26) brightness(0.88) sepia(0.28)";
  return (
    <div
      style={{
        width,
        position: "relative",
        opacity,
        boxShadow: "0 24px 70px rgba(0,0,0,0.94)",
        pointerEvents: "none",
        ...style,
      }}
    >
      <Img
        src={staticFile(DOC_FILE[id])}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          filter: filterStr,
        }}
      />
    </div>
  );
};
