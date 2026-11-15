import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import { useAudioFrame } from "../data/audio";
import { CinemaStage } from "../cinema/CinemaStage";
import { PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";

// Stanza 9 (201.99s - 220.06s, 1085 frames)
export const Scene10Act2Chorus2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();

  const b0 = sec < 3.79; // 是懂王荐库克也好
  const b1 = sec >= 3.79 && sec < 7.73; // 是马斯克来挖人也好
  const b2 = sec >= 7.73 && sec < 11.55; // 然而这一切已不再重要
  const b3 = sec >= 11.55; // 老婆在加州把律师找好

  const doorsClose = interpolate(sec, [7.73, 10.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Gavel strike hits around 14.05s local -> full-screen vertical 50/50 split!
  const gavelStrike = spring({
    frame: Math.max(0, frame - Math.round(13.65 * fps)),
    fps,
    config: { damping: 14, stiffness: 260, mass: 0.9 },
  });
  const gavelRot = interpolate(gavelStrike, [0, 1], [-28, 8]);
  const impactRing = interpolate(sec, [14.05, 15.1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const splitApart = interpolate(sec, [14.0, 16.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gavelFadeOut = interpolate(sec, [14.35, 15.55], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <CinemaStage
      mood={b0 ? "amberBar" : b1 ? "rainyBlue" : b2 ? "crimsonAlarm" : "rainyBlue"}
      rain={b3 ? 0.85 : 0.14}
      bokeh={0.65}
      anamorphicFlare={b1 || b3 ? 0.88 : 0.55}
    >
      {/* Beat 0: Real Trump & Tim Cook Spotlights Over Capitol & Cupertino Apple Park */}
      {b0 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <div style={{ position: "absolute", inset: 0, clipPath: "inset(0 50% 0 0)" }}>
            <PhotoBackdrop id="capitol" tone="amber" opacity={0.64} scale={1.08} />
          </div>
          <div style={{ position: "absolute", inset: 0, clipPath: "inset(0 0 0 50%)" }}>
            <PhotoBackdrop id="apple_park" tone="cyan" opacity={0.64} scale={1.1} />
          </div>

          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <polygon
              points={`220,1080 560,1080 ${960 + Math.sin(sec * 2) * 150},-60 ${820 + Math.sin(sec * 2) * 150},-60`}
              fill="rgba(245,166,35,0.16)"
            />
            <polygon
              points={`1360,1080 1700,1080 ${1100 - Math.sin(sec * 2) * 150},-60 ${960 - Math.sin(sec * 2) * 150},-60`}
              fill="rgba(125,211,252,0.16)"
            />
          </svg>

          <div style={{ position: "absolute", left: "30%", bottom: 0, transform: "translateX(-50%) translateZ(45px)" }}>
            <PhotoCutout id="trump" tone="amber" rimColor={COLORS.amber} rimPx={30} height={770} />
          </div>
          <div style={{ position: "absolute", left: "70%", bottom: 0, transform: "translateX(-50%) translateZ(45px)" }}>
            <PhotoCutout id="cook" tone="cyan" rimColor={COLORS.iceBlue} rimPx={30} height={770} />
          </div>
        </div>
      )}

      {/* Beat 1: Night SpaceX Rocket Blast + Real Elon Musk Cutout */}
      {b1 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="falcon" tone="cyan" opacity={0.78} scale={1.08 + (sec - 3.79) * 0.015} />
          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <line
              x1="240"
              y1="1080"
              x2={interpolate(sec, [3.79, 7.6], [420, 1780])}
              y2={interpolate(sec, [3.79, 7.6], [960, 110])}
              stroke={COLORS.cyan}
              strokeWidth={18 + audio.bass * 16}
              strokeLinecap="round"
            />
            <line
              x1="240"
              y1="1080"
              x2={interpolate(sec, [3.79, 7.6], [420, 1780])}
              y2={interpolate(sec, [3.79, 7.6], [960, 110])}
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>

          <div style={{ position: "absolute", left: "58%", bottom: 0, transform: "translateX(-50%) translateZ(65px)" }}>
            <PhotoCutout id="musk" tone="cyan" rimColor={COLORS.cyan} rimPx={32} height={790} />
          </div>
        </div>
      )}

      {/* Beat 2: Heavy Architectural Bronze Doors Closing Across Frame */}
      {b2 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="scotus" tone="crimson" opacity={0.48} scale={1.06} blurPx={3} />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "50%",
              background: "linear-gradient(90deg, #070504 0%, #1F1510 92%, #D4A036 100%)",
              transform: `translateX(${(1 - doorsClose) * -960}px)`,
              boxShadow: "24px 0 80px rgba(0,0,0,0.95)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "50%",
              background: "linear-gradient(270deg, #070504 0%, #1F1510 92%, #D4A036 100%)",
              transform: `translateX(${(1 - doorsClose) * 960}px)`,
              boxShadow: "-24px 0 80px rgba(0,0,0,0.95)",
            }}
          />
        </div>
      )}

      {/* Beat 3: "老婆在加州把律师找好" — Real Courthouse Pillars & Gold Rings Cleaved Cleanly 50/50 by Real Courtroom Gavel */}
      {b3 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {/* Left 50% Cleaved Half */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "inset(0 50% 0 0)",
              transform: `translate3d(${-splitApart * 95}px, 0, 0) rotateY(${splitApart * 4}deg)`,
            }}
          >
            <PhotoBackdrop id="scotus" tone="cyan" opacity={0.76} scale={1.08} />
            <div style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%, -50%)" }}>
              <PhotoCutout id="rings" tone="gold" rimColor={COLORS.gold} rimPx={30} height={310} />
            </div>
          </div>

          {/* Right 50% Cleaved Half */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "inset(0 0 0 50%)",
              transform: `translate3d(${splitApart * 95}px, 0, 0) rotateY(${-splitApart * 4}deg)`,
            }}
          >
            <PhotoBackdrop id="scotus" tone="cyan" opacity={0.76} scale={1.08} />
            <div style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%, -50%)" }}>
              <PhotoCutout id="rings" tone="gold" rimColor={COLORS.gold} rimPx={30} height={310} />
            </div>
          </div>

          {/* Real Antique Brass/Walnut Gavel Slamming Center + Impact Shockwaves */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "52%",
              transform: `translate(-50%, -50%) translateZ(140px) rotate(${gavelRot}deg) scale(${
                1.05 - splitApart * 0.25
              })`,
              opacity: gavelFadeOut,
            }}
          >
            <PhotoCutout id="gavel" tone="gold" rimColor={COLORS.gold} rimPx={28} height={470} />
          </div>

          {impactRing > 0.02 && (
            <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              <ellipse
                cx="960"
                cy="620"
                rx={120 + impactRing * 320}
                ry={20 + impactRing * 56}
                fill="none"
                stroke={COLORS.gold}
                strokeWidth={5 * (1 - impactRing)}
                opacity={1 - impactRing}
              />
            </svg>
          )}

          {splitApart > 0.01 && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 6 + splitApart * 14,
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 5%, rgba(255,244,210,0.95) 50%, rgba(255,255,255,0) 95%)",
                boxShadow: `0 0 42px ${COLORS.gold}`,
              }}
            />
          )}
        </div>
      )}
    </CinemaStage>
  );
};
