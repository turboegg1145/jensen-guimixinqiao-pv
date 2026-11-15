import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import { useAudioFrame } from "../data/audio";
import { CinemaStage } from "../cinema/CinemaStage";
import { DocPlate, PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";

// Stanza 6 / Act 2 Verse 1 (153.66s - 169.73s, 964 frames)
export const Scene07Act2Verse1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();

  const b0 = sec < 3.89; // 曾经真的以为写封信就过了
  const b1 = sec >= 3.89 && sec < 8.08; // 纽约时报反手又是一刀
  const b2 = sec >= 8.08 && sec < 12.03; // 医疗部的女高管也瞒不了
  const b3 = sec >= 12.03; // 董事会在深夜里咆哮

  const planeX = interpolate(sec, [0, 3.8], [260, 1520], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const slashProg = spring({
    frame: Math.max(0, frame - Math.round(4.2 * fps)),
    fps,
    config: { damping: 14, stiffness: 210 },
  });
  const doorPart = interpolate(sec, [8.2, 11.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <CinemaStage
      mood={b0 ? "noirGold" : b1 || b3 ? "crimsonAlarm" : "rainyBlue"}
      camRotateX={b3 ? 12 : 2}
      camRotateY={b0 ? -2 : b1 ? 4 : 0}
      camZ={b3 ? (sec - 12.03) * 26 : 0}
      rain={b2 ? 0.25 : 0.14}
      bokeh={0.62}
      anamorphicFlare={b1 ? 0.95 : 0.55}
    >
      {/* Beat 0: Calm Golden Gliding Letter Page Over Subdued Backdrop */}
      {b0 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="crowd_phones" tone="gold" opacity={0.34} scale={1.05} blurPx={4} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 380,
              height: 220,
              background: "linear-gradient(90deg, transparent 5%, rgba(245,166,35,0.18) 50%, transparent 95%)",
              filter: "blur(20px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: planeX,
              top: 465 + Math.sin(sec * 2.1) * 28,
              transform: `translate(-50%, -50%) rotateX(52deg) rotateY(-18deg) rotateZ(${
                -10 + Math.cos(sec * 2.1) * 8
              }deg)`,
            }}
          >
            <DocPlate id="nsa" width={290} tone="amber" opacity={0.92} />
          </div>
        </div>
      )}

      {/* Beat 1: Blazing Diagonal Crimson Blade Cleaving Real Printing Press & Jensen Across Screen */}
      {b1 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(0 0, 100% 0, 100% 34%, 0 72%)",
              transform: `translate3d(${-slashProg * 72}px, ${-slashProg * 44}px, 20px)`,
            }}
          >
            <PhotoBackdrop id="press" tone="noir" opacity={0.78} scale={1.1} />
            <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)" }}>
              <PhotoCutout id="jensen_front" tone="crimson" rimColor={COLORS.crimson} rimPx={28} height={820} />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: "polygon(0 72%, 100% 34%, 100% 100%, 0 100%)",
              transform: `translate3d(${slashProg * 72}px, ${slashProg * 48}px, -30px)`,
            }}
          >
            <PhotoBackdrop id="press" tone="crimson" opacity={0.82} scale={1.1} />
            <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)" }}>
              <PhotoCutout id="jensen_front" tone="crimson" rimColor={COLORS.crimson} rimPx={28} height={820} />
            </div>
          </div>

          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <line
              x1="0"
              y1="778"
              x2={1920 * slashProg}
              y2={778 - 411 * slashProg}
              stroke="#FFFFFF"
              strokeWidth="10"
            />
            <line
              x1="0"
              y1="778"
              x2={1920 * slashProg}
              y2={778 - 411 * slashProg}
              stroke={COLORS.crimson}
              strokeWidth="26"
              opacity="0.6"
            />
          </svg>
        </div>
      )}

      {/* Beat 2: Hospital Wing Glass Doors Sliding Open Onto Real Jensen & Executive Woman Under Spotlight Iris */}
      {b2 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="hospital" tone="cyan" opacity={0.64} scale={1.08} blurPx={2.5} />

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "48%",
              width: 640,
              height: 640,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(224,242,254,0.34) 0%, rgba(56,189,248,0.12) 60%, transparent 74%)",
            }}
          />

          <div style={{ position: "absolute", left: "41%", bottom: 0, transform: "translateX(-50%) translateZ(20px)" }}>
            <PhotoCutout id="jensen_front" tone="cyan" rimColor={COLORS.iceBlue} rimPx={26} height={780} />
          </div>
          <div style={{ position: "absolute", left: "59%", bottom: 0, transform: "translateX(-50%) translateZ(40px)" }}>
            <PhotoCutout id="exec_woman" tone="cyan" rimColor={COLORS.iceBlue} rimPx={28} height={680} flipX />
          </div>

          {/* Left & Right Frosted Hospital Doors Sliding Open */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "50%",
              background: "linear-gradient(90deg, #060B12 60%, rgba(125,211,252,0.25) 100%)",
              borderRight: "3px solid rgba(186,230,253,0.45)",
              transform: `translateX(${-doorPart * 520}px)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "50%",
              background: "linear-gradient(270deg, #060B12 60%, rgba(125,211,252,0.25) 100%)",
              borderLeft: "3px solid rgba(186,230,253,0.45)",
              transform: `translateX(${doorPart * 520}px)`,
            }}
          />
        </div>
      )}

      {/* Beat 3: "董事会在深夜里咆哮" — Midnight Corporate Boardroom Pulsing With Crimson Shockwaves */}
      {b3 && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop
            id="boardroom"
            tone="crimson"
            opacity={0.78}
            scale={1.08 + audio.bass * 0.05}
            blurPx={1}
          />
          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {[0, 1, 2, 3].map((w) => {
              const prog = ((sec - 12.03) * 1.15 + w * 0.25) % 1;
              return (
                <circle
                  key={w}
                  cx="960"
                  cy="510"
                  r={180 + prog * 700}
                  fill="none"
                  stroke={COLORS.crimson}
                  strokeWidth={(1 - prog) * (8 + audio.pulse * 12)}
                  opacity={(1 - prog) * 0.85}
                />
              );
            })}
          </svg>
        </div>
      )}
    </CinemaStage>
  );
};
