import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../design/tokens";
import { CinemaStage } from "../cinema/CinemaStage";
import { DocPlate, PhotoBackdrop, PhotoCutout } from "../cinema/PhotoMedia";
import { CrimsonCandlestickDeluge, FoggyHighwayBeams } from "../cinema/ArchitecturalSets";
import { hash01 } from "../cinema/math";

// Instrumental Interlude + Phone Call Monologue (121.52s - 153.52s, 1920 frames / 32.00s)
export const Scene06Interlude: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  // Sub-beats anchored verbatim to the phone-call lines (globalSec = 121.52 + sec):
  // 0.00..2.65s  : "喂？克雷斯吗？" -> vintage handset & rotary phone
  // 2.65..8.15s  : "我八月份骂你是‘车灯前受惊的鹿’、只会做财务报表，" -> headlights stag + ledger sheet
  // 8.15..12.28s : "是我大声了点，你别真坐我老板椅啊！" -> executive leather chair turning
  // 12.28..18.35s: "什么？Lisa Su 刚拿了 2026 年度 CEO？她还在推特上放鞭炮？！" -> Lisa Su + trophy + fireworks
  // 18.35..24.10s: "喂？Elon？你真让我去特斯拉看大门吗？！" -> Elon Musk + towering iron gate & searchlights
  // 24.10..32.00s: Climax instrumental -> Wall St candlesticks & smooth printing press push-in
  const pCall = sec < 2.65;
  const pStag = sec >= 2.65 && sec < 8.15;
  const pChair = sec >= 8.15 && sec < 12.28;
  const pLisa = sec >= 12.28 && sec < 18.35;
  const pElon = sec >= 18.35 && sec < 24.1;
  const pClimax = sec >= 24.1;

  const stagEnter = spring({
    frame: Math.max(0, frame - Math.round(2.6 * fps)),
    fps,
    config: { damping: 20, stiffness: 120 },
  });
  const chairTurnDeg = interpolate(sec, [8.15, 12.2], [0, 110], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lisaEnter = spring({
    frame: Math.max(0, frame - Math.round(12.25 * fps)),
    fps,
    config: { damping: 18, stiffness: 120 },
  });
  const fireworkProg = interpolate(sec, [15.4, 18.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const elonEnter = spring({
    frame: Math.max(0, frame - Math.round(18.3 * fps)),
    fps,
    config: { damping: 20, stiffness: 115 },
  });
  const pressPush = interpolate(sec, [27.5, 32.0], [1.04, 1.24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const endFlash = interpolate(sec, [31.5, 32.0], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const mood = pCall
    ? "amberBar"
    : pStag
    ? "rainyBlue"
    : pChair
    ? "noirGold"
    : pLisa
    ? "amdScarlet"
    : pElon
    ? "rainyBlue"
    : "crimsonAlarm";

  return (
    <CinemaStage
      mood={mood}
      camRotateX={pClimax ? -5 : 1.5}
      camRotateY={Math.sin(sec * 0.25) * 1.8}
      camZ={pClimax ? (sec - 24.1) * 14 : 0}
      blinds={pCall ? 0.5 : 0}
      rain={pStag || pElon ? 0.34 : pClimax ? 0.28 : 0.1}
      bokeh={0.76}
      anamorphicFlare={pLisa || pClimax ? 0.88 : 0.62}
    >
      {/* 0.00 - 2.65s: "喂？克雷斯吗？" */}
      {pCall && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="corridor" tone="amber" opacity={0.62} scale={1.08} blurPx={3} />
          <div style={{ position: "absolute", left: "48%", bottom: 0, transform: "translateX(-50%) translateZ(40px)" }}>
            <PhotoCutout id="handset_woman" tone="amber" rimColor={COLORS.amberHot} rimPx={28} height={760} />
          </div>
          <div style={{ position: "absolute", left: "73%", bottom: 130, transform: "translateX(-50%) translateZ(90px)" }}>
            <PhotoCutout id="phone" tone="crimson" rimColor={COLORS.crimson} rimPx={28} height={380} />
          </div>
        </div>
      )}

      {/* 2.65 - 8.15s: "车灯前受惊的鹿" + "财务报表" */}
      {pStag && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="road_fog" tone="cyan" opacity={0.74} scale={1.06 + (sec - 2.65) * 0.015} blurPx={1.2} />
          <FoggyHighwayBeams beamIntensity={0.95} />

          {/* Ghosted financial ledger drifting right of upper frame */}
          <div
            style={{
              position: "absolute",
              left: "30%",
              top: "27%",
              transform: `translate(-50%, -50%) translateZ(-40px) rotate(${-8 + (sec - 2.65) * 2}deg)`,
              opacity: 0.42,
            }}
          >
            <DocPlate id="nsa" width={360} tone="amber" opacity={0.75} />
          </div>

          <div
            style={{
              position: "absolute",
              left: "58%",
              bottom: 75,
              transform: `translate(-50%, 0) translateZ(50px) scale(${0.92 + stagEnter * 0.12})`,
              opacity: stagEnter,
            }}
          >
            <PhotoCutout id="stag" tone="cyan" rimColor="#FFFFFF" rimPx={32} height={630} />
          </div>
        </div>
      )}

      {/* 8.15 - 12.28s: "别真坐我老板椅啊！" */}
      {pChair && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="boardroom" tone="noir" opacity={0.56} scale={1.06} blurPx={2.5} />
          <div style={{ position: "absolute", inset: -60, filter: "blur(30px)", pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                left: "57%",
                top: 0,
                width: 680,
                height: 1180,
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, rgba(255,232,179,0.34) 0%, rgba(245,166,35,0.08) 68%, transparent 100%)",
                clipPath: "polygon(35% 0%, 65% 0%, 92% 100%, 8% 100%)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: "57%",
              top: "50%",
              transform: `translate(-50%, -50%) translateZ(60px) scaleX(${Math.max(
                0.24,
                Math.abs(Math.cos((chairTurnDeg * Math.PI) / 180))
              )})`,
            }}
          >
            <PhotoCutout id="chair" tone="gold" rimColor={COLORS.gold} rimPx={30} height={620} />
          </div>
        </div>
      )}

      {/* 12.28 - 18.35s: "Lisa Su 刚拿了 2026 年度 CEO？她还在推特上放鞭炮？！" */}
      {pLisa && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="nyse" tone="amdRed" opacity={0.48} scale={1.06 + (sec - 12.28) * 0.01} blurPx={2.5} />

          {/* Celebratory Pyrotechnic Bursts & Bokeh Sparks blooming behind Lisa Su ("放鞭炮") */}
          {fireworkProg > 0.01 && (
            <svg
              viewBox="0 0 1920 1080"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                mixBlendMode: "screen",
              }}
            >
              <defs>
                <radialGradient id="fwGold" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF7D6" stopOpacity="0.85" />
                  <stop offset="35%" stopColor={COLORS.gold} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={COLORS.gold} stopOpacity="0" />
                </radialGradient>
                <radialGradient id="fwRed" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFE4E6" stopOpacity="0.82" />
                  <stop offset="38%" stopColor={COLORS.amdRed} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={COLORS.amdRed} stopOpacity="0" />
                </radialGradient>
              </defs>
              {[
                { cx: 520, cy: 250, delay: 0, col: COLORS.gold, grad: "url(#fwGold)", scale: 1.05 },
                { cx: 1480, cy: 220, delay: 0.14, col: COLORS.amdRed, grad: "url(#fwRed)", scale: 1.15 },
                { cx: 980, cy: 175, delay: 0.3, col: "#FFE599", grad: "url(#fwGold)", scale: 0.92 },
                { cx: 410, cy: 400, delay: 0.44, col: COLORS.crimson, grad: "url(#fwRed)", scale: 0.85 },
                { cx: 1320, cy: 360, delay: 0.58, col: COLORS.gold, grad: "url(#fwGold)", scale: 0.95 },
              ].map((burst, bIdx) => {
                const p = Math.max(0, Math.min(1, (fireworkProg - burst.delay) / 0.55));
                if (p <= 0 || p >= 1) return null;
                const env = Math.sin(p * Math.PI);
                return (
                  <g key={bIdx} opacity={env}>
                    <circle
                      cx={burst.cx}
                      cy={burst.cy}
                      r={(160 + p * 210) * burst.scale}
                      fill={burst.grad}
                      opacity={0.75 * (1 - p * 0.4)}
                    />
                    {Array.from({ length: 24 }).map((_, rIdx) => {
                      const ang = (rIdx / 24) * Math.PI * 2 + bIdx * 0.37;
                      const lenScale = (0.72 + hash01(rIdx * 17 + bIdx * 43) * 0.42) * burst.scale;
                      const easeP = 1 - Math.pow(1 - p, 2);
                      const rad0 = easeP * 75 * lenScale;
                      const rad1 = easeP * 240 * lenScale;
                      const grav = p * p * 38;
                      const x1 = burst.cx + Math.cos(ang) * rad0;
                      const y1 = burst.cy + Math.sin(ang) * rad0 + grav * 0.3;
                      const x2 = burst.cx + Math.cos(ang) * rad1;
                      const y2 = burst.cy + Math.sin(ang) * rad1 + grav;
                      return (
                        <g key={rIdx}>
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={burst.col}
                            strokeWidth={6 * (1 - p)}
                            strokeLinecap="round"
                            opacity={0.42}
                          />
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#FFFDF4"
                            strokeWidth={2.2 * (1 - p)}
                            strokeLinecap="round"
                            opacity={0.85}
                          />
                          <circle cx={x2} cy={y2} r={4.2 * (1 - p * 0.55)} fill="#FFFDF4" />
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          )}

          <div
            style={{
              position: "absolute",
              left: "47%",
              bottom: 0,
              transform: `translate(-50%, ${(1 - lisaEnter) * 60}px) translateZ(50px)`,
              opacity: lisaEnter,
            }}
          >
            <PhotoCutout id="lisa_su" tone="amdRed" rimColor={COLORS.gold} rimPx={34} height={780} />
          </div>

          <div
            style={{
              position: "absolute",
              left: "69%",
              top: "52%",
              transform: `translate(-50%, -50%) translateZ(90px) scale(${0.86 + lisaEnter * 0.18})`,
              opacity: lisaEnter,
            }}
          >
            <PhotoCutout id="trophy" tone="gold" rimColor={COLORS.amber} rimPx={34} height={580} />
          </div>
        </div>
      )}

      {/* 18.35 - 24.10s: "喂？Elon？你真让我去特斯拉看大门吗？！" */}
      {pElon && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          <PhotoBackdrop id="falcon" tone="cyan" opacity={0.68} scale={1.06 + (sec - 18.35) * 0.01} blurPx={1.8} />

          {/* Monumental Silhouette Factory/Compound Iron Gate Framing Musk */}
          <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.72 }}>
            {Array.from({ length: 14 }).map((_, i) => {
              const gx = 780 + i * 76;
              return (
                <g key={i}>
                  <rect x={gx} y="240" width="8" height="840" fill="#070B12" />
                  <polygon points={`${gx - 4},240 ${gx + 12},240 ${gx + 4},205`} fill="#22D3EE" opacity="0.55" />
                </g>
              );
            })}
            <rect x="760" y="340" width="1080" height="10" fill="#0A1220" />
            <rect x="760" y="760" width="1080" height="12" fill="#0A1220" />
          </svg>

          <div
            style={{
              position: "absolute",
              left: "59%",
              bottom: 0,
              transform: `translate(-50%, ${(1 - elonEnter) * 50}px) translateZ(75px)`,
              opacity: elonEnter,
            }}
          >
            <PhotoCutout id="musk" tone="cyan" rimColor={COLORS.cyan} rimPx={32} height={800} />
          </div>
        </div>
      )}

      {/* 24.10 - 32.00s: Guitar Climax — Wall St Crash & Steady Printing Press Push-In Into Act 2 */}
      {pClimax && (
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {sec < 28.0 ? (
            <>
              <PhotoBackdrop id="wallst_night" tone="crimson" opacity={0.72} scale={1.08 + (sec - 24.1) * 0.015} blurPx={1.5} />
              <CrimsonCandlestickDeluge intensity={1.25} />
              <div style={{ position: "absolute", left: "62%", bottom: 0, transform: "translateX(-50%) translateZ(65px)" }}>
                <PhotoCutout id="trader" tone="crimson" rimColor={COLORS.crimson} rimPx={30} height={740} />
              </div>
            </>
          ) : (
            <>
              <PhotoBackdrop id="press" tone="crimson" opacity={0.76} scale={pressPush} blurPx={1.0} />
              {[0, 1, 2, 3].map((p) => {
                const offY = (((sec - 28.0) * 320 + p * 310) % 1350) - 180;
                const sideX = 980 + Math.sin(p * 1.9 + 0.5) * 340;
                return (
                  <div
                    key={p}
                    style={{
                      position: "absolute",
                      left: sideX,
                      top: offY,
                      transform: `translate(-50%, -50%) translateZ(${p * 30}px) rotate(${(hash01(p * 19) - 0.5) * 18}deg)`,
                      opacity: 0.78,
                    }}
                  >
                    <DocPlate id={p % 2 === 0 ? "fbi" : "nsa"} width={340} tone="crimson" />
                  </div>
                );
              })}
            </>
          )}

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

