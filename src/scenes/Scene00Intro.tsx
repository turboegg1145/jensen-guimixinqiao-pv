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

  // Synced cleanly to Intro monologue cues & instrumental swell:
  // 0..16.10s   : Empire vault (4T market cap, rings appear at 7.9s)
  // 16.10..21.85s: "最后栽在台北的一杯威士忌，和圣何塞的一间酒店里"
  // 21.85..34.10s: "音乐起，把我的黑皮衣拿来——" + orchestral rock swell
  // 34.10..39.52s: Chime drop + Monumental 《鬼迷心窍》 Title
  const phase =
    sec < 16.1
      ? "empire"
      : sec < 21.85
      ? "taipei_sanjose"
      : sec < 34.1
      ? "jacket_call"
      : "title";

  const jacketReveal = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 24, stiffness: 80 },
  });

  const phaseAOut = interpolate(sec, [15.5, 16.1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sanJoseBlend = interpolate(sec, [18.95, 19.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const routeProgress = interpolate(sec, [16.1, 21.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const jacketHeroReveal = spring({
    frame: Math.max(0, frame - Math.round(21.75 * fps)),
    fps,
    config: { damping: 20, stiffness: 105 },
  });
  const callOut = interpolate(sec, [33.6, 34.1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleSlam = spring({
    frame: Math.max(0, frame - Math.round(34.05 * fps)),
    fps,
    config: { damping: 18, stiffness: 165, mass: 1.0 },
  });
  const titleExit = interpolate(sec, [38.9, 39.52], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <CinemaStage
      mood={
        phase === "empire"
          ? sec > 7.9
            ? "amberBar"
            : "emeraldVault"
          : phase === "taipei_sanjose"
          ? "amberBar"
          : phase === "jacket_call"
          ? "emeraldVault"
          : "noirGold"
      }
      camRotateX={phase === "taipei_sanjose" ? 3 : 1.2}
      camRotateY={Math.sin(sec * 0.28) * 2.0}
      camZ={
        phase === "empire"
          ? sec * 8
          : phase === "jacket_call"
          ? (sec - 21.85) * 10
          : phase === "title"
          ? (sec - 34.1) * 12
          : 0
      }
      blinds={phase === "taipei_sanjose" ? 0.42 : 0}
      rain={phase === "taipei_sanjose" ? 0.28 : 0.08}
      bokeh={phase === "title" ? 0.35 : 0.72}
      anamorphicFlare={phase === "title" ? 0.85 : 0.55}
    >
      {/* BEAT A (0 - 16.10s): Supercomputer Vault + Solitary Schott Leather Jacket + Gold Rings at 7.9s */}
      {sec < 16.25 && (
        <div style={{ position: "absolute", inset: 0, opacity: phaseAOut, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop
            id="servers"
            tone={sec > 9.5 ? "amber" : "emerald"}
            opacity={0.78}
            scale={1.04 + sec * 0.007}
            blurPx={1.5}
            translateZ={-180}
          />

          <div style={{ position: "absolute", inset: -60, filter: "blur(28px)", transform: "translateZ(-40px)", pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                left: "54%",
                top: 0,
                width: 820,
                height: 1160,
                transform: "translateX(-50%)",
                background:
                  sec > 8.5
                    ? "linear-gradient(180deg, rgba(255,220,160,0.32) 0%, rgba(245,166,35,0.10) 55%, rgba(0,0,0,0) 100%)"
                    : "linear-gradient(180deg, rgba(245,230,190,0.30) 0%, rgba(166,240,22,0.10) 55%, rgba(0,0,0,0) 100%)",
                clipPath: "polygon(36% 0%, 64% 0%, 92% 100%, 8% 100%)",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: "54%",
              top: "49%",
              transform: `translate(-50%, -50%) translateZ(55px) scale(${0.92 + jacketReveal * 0.12})`,
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

          {/* Orbiting Gold Wedding Rings appear smoothly as "The more you love..." starts */}
          <div
            style={{
              position: "absolute",
              left: "54%",
              top: "14%",
              transform: `translate(-50%, 0) translateZ(95px) rotate(${Math.sin(sec * 0.6) * 5}deg) scale(${
                0.78 + jacketReveal * 0.12
              })`,
              opacity: interpolate(sec, [7.6, 8.6], [0.22, 0.85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            <PhotoCutout id="rings" tone="gold" rimColor={COLORS.gold} rimPx={18} height={150} />
          </div>

          {/* GPUs framed upper-left & mid-right so bottom-left corner stays clean for dialogue captions */}
          {sec > 4.2 && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: 140 + Math.sin(sec * 0.5) * 26,
                  top: 200,
                  transform: "translateZ(120px) scale(0.56) rotateY(22deg)",
                  opacity: interpolate(sec, [4.2, 5.4], [0, 0.9], { extrapolateRight: "clamp" }),
                }}
              >
                <GpuRig3D rotateX={14} rotateY={24} rotateZ={-8} accent={sec > 8 ? COLORS.amber : COLORS.nvLime} />
              </div>
              <div
                style={{
                  position: "absolute",
                  right: 120 + Math.cos(sec * 0.45) * 24,
                  bottom: 165,
                  transform: `translateZ(-70px) rotate(${Math.sin(sec * 0.6) * 6}deg)`,
                  opacity: interpolate(sec, [9.2, 11.2], [0, 0.86], { extrapolateRight: "clamp" }),
                }}
              >
                <PhotoCutout id="gpu" tone={sec > 12 ? "gold" : "emerald"} rimColor={COLORS.cyan} rimPx={22} height={260} />
              </div>
            </>
          )}
        </div>
      )}

      {/* BEAT B (16.10 - 21.85s): Taipei Whiskey (16.1-19.05s) -> San Jose Hotel Corridor & Phone (19.05-21.85s) */}
      {sec >= 15.95 && sec < 22.05 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
          }}
        >
          <PhotoBackdrop
            id="taipei_neon"
            tone="amber"
            opacity={(1 - sanJoseBlend * 0.65) * 0.66}
            scale={1.06 + (sec - 16.1) * 0.008}
            blurPx={2.5}
            translateZ={-180}
          />
          {sanJoseBlend > 0.01 && (
            <PhotoBackdrop
              id="corridor"
              tone="crimson"
              opacity={sanJoseBlend * 0.82}
              scale={1.04 + sanJoseBlend * 0.14}
              blurPx={1.0}
              translateZ={-120}
            />
          )}

          {/* Curved Pacific Signal Arcs Sweeping Upper Frame (keeps bottom-left spacious) */}
          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <path
              d="M 1520 340 Q 980 110 560 440"
              fill="none"
              stroke={COLORS.amber}
              strokeWidth="4.5"
              strokeDasharray="16 12"
              strokeDashoffset={-frame * 2.2}
              opacity={routeProgress}
            />
            <path
              d="M 560 440 Q 760 560 1120 460"
              fill="none"
              stroke={COLORS.crimson}
              strokeWidth="4.5"
              strokeDasharray="12 10"
              strokeDashoffset={-frame * 2.6}
              opacity={Math.max(0, (routeProgress - 0.35) * 1.5)}
            />
          </svg>

          {/* Foreground Whiskey Right + Rotary Phone Center-Right (bottom-left unobstructed!) */}
          <div
            style={{
              position: "absolute",
              right: 210,
              bottom: 110,
              transform: `translateZ(110px) scale(${1 - sanJoseBlend * 0.12})`,
              opacity: 1 - sanJoseBlend * 0.45,
            }}
          >
            <PhotoCutout id="whiskey" tone="amber" rimColor={COLORS.amberHot} rimPx={30} height={410} />
          </div>
          <div
            style={{
              position: "absolute",
              right: 540,
              bottom: 120,
              transform: `translateZ(130px) scale(${0.86 + sanJoseBlend * 0.18})`,
              opacity: 0.5 + sanJoseBlend * 0.5,
            }}
          >
            <PhotoCutout id="phone" tone="crimson" rimColor={COLORS.crimson} rimPx={28} height={350} />
          </div>
        </div>
      )}

      {/* BEAT C (21.85 - 34.10s): "音乐起，把我的黑皮衣拿来——" + Iconic Jacket Rise & Instrumental Swell */}
      {sec >= 21.7 && sec < 34.25 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: callOut,
            transformStyle: "preserve-3d",
          }}
        >
          <PhotoBackdrop
            id="servers"
            tone="emerald"
            opacity={0.58}
            scale={1.06 + (sec - 21.85) * 0.008}
            blurPx={2.5}
            translateZ={-180}
          />
          <div style={{ position: "absolute", inset: -60, filter: "blur(30px)", pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                left: "54%",
                top: 0,
                width: 780,
                height: 1180,
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, rgba(255,232,179,0.34) 0%, rgba(166,240,22,0.12) 58%, rgba(0,0,0,0) 100%)",
                clipPath: "polygon(36% 0%, 64% 0%, 92% 100%, 8% 100%)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "54%",
              top: "49%",
              transform: `translate(-50%, -50%) translateZ(70px) scale(${0.92 + jacketHeroReveal * 0.14})`,
              opacity: jacketHeroReveal,
            }}
          >
            <PhotoCutout id="jacket" tone="emerald" rimColor={COLORS.nvLime} rimPx={32} height={660} />
          </div>
        </div>
      )}

      {/* BEAT D (34.10 - 39.52s): Stark Lone Monumental Title — ZERO Subtitle */}
      {sec >= 34.05 && (
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
                sec > 37.8 ? COLORS.crimson : COLORS.gold
              }, transparent)`,
              opacity: 0.55 + audio.rms * 0.35,
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
              transform: `scale(${0.88 + titleSlam * 0.12}) translateZ(${titleSlam * 90}px)`,
              opacity: titleSlam,
              textShadow: `0 0 70px ${sec > 37.8 ? COLORS.crimson : COLORS.amber}88, 0 24px 64px rgba(0,0,0,0.98)`,
            }}
          >
            鬼迷心窍
          </div>
        </div>
      )}
    </CinemaStage>
  );
};

