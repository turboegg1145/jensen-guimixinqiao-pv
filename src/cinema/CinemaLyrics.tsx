import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../design/tokens";
import { getActiveLyric } from "../data/lyrics";
import { useAudioFrame, useGlobalFrame } from "../data/audio";

export const CinemaLyrics: React.FC<{ accentColor?: string }> = ({
  accentColor = COLORS.nvLime,
}) => {
  const frame = useGlobalFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();
  const { current } = getActiveLyric(sec);

  // Rule 3: ONLY render currently active sung lyrics; NO small preview line, NO black card/band
  if (!current) return null;

  const enterProgress = spring({
    frame: Math.max(0, Math.round((sec - current.startSec) * fps)),
    fps,
    config: { damping: 24, stiffness: 200, mass: 0.8 },
  });

  const exitOpacity = interpolate(sec, [current.endSec - 0.18, current.endSec], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sweepPct = interpolate(sec, [current.startSec, current.singEndSec], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 46,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 70,
      }}
    >
      <div
        style={{
          position: "relative",
          opacity: exitOpacity * Math.min(1, enterProgress * 1.4),
          transform: `translateY(${(1 - enterProgress) * 14}px) scale(${
            0.99 + enterProgress * 0.01 + audio.mid * 0.008
          })`,
          padding: "0 80px",
          textAlign: "center",
        }}
      >
        {/* Base atmospheric un-swept silhouette */}
        <div
          style={{
            fontFamily: FONTS.serif,
            fontWeight: 800,
            fontSize: 48,
            lineHeight: 1.24,
            letterSpacing: "0.09em",
            color: "rgba(244, 239, 230, 0.42)",
            textShadow:
              "0 3px 16px rgba(0,0,0,0.98), 0 0 34px rgba(0,0,0,0.92), 0 1px 4px rgba(0,0,0,1)",
            whiteSpace: "nowrap",
          }}
        >
          {current.text}
        </div>

        {/* Karaoke luminous illumination sweep */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "0 80px",
            fontFamily: FONTS.serif,
            fontWeight: 800,
            fontSize: 48,
            lineHeight: 1.24,
            letterSpacing: "0.09em",
            color: "#FFFFFF",
            textShadow: `0 0 22px ${accentColor}77, 0 3px 16px rgba(0,0,0,0.98)`,
            whiteSpace: "nowrap",
            clipPath: `inset(-20% ${100 - sweepPct}% -20% 0%)`,
          }}
        >
          <span
            style={{
              background: `linear-gradient(90deg, #FFFFFF 0%, #FFF7ED 72%, ${accentColor} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {current.text}
          </span>
        </div>
      </div>
    </div>
  );
};
