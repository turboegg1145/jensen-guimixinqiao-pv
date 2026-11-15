import React from "react";
import { interpolate } from "remotion";
import { useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../design/tokens";
import { getActiveLyric, getActiveSpokenCue } from "../data/lyrics";
import { useGlobalFrame } from "../data/audio";

export const CinemaLyrics: React.FC<{ accentColor?: string }> = ({
  accentColor = COLORS.nvLime,
}) => {
  const frame = useGlobalFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const { current } = getActiveLyric(sec);
  const spoken = getActiveSpokenCue(sec);

  // Clean zero-box corner spoken dialogue (bottom-left corner — never centered!)
  const renderSpokenCorner = () => {
    if (!spoken) return null;
    const inOp = interpolate(sec, [spoken.startSec, spoken.startSec + 0.12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const outOp = interpolate(sec, [spoken.endSec - 0.16, spoken.endSec], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const opacity = inOp * outOp;
    const shiftY = (1 - inOp) * 6;

    return (
      <div
        style={{
          position: "absolute",
          left: 72,
          bottom: 54,
          maxWidth: 660,
          pointerEvents: "none",
          zIndex: 72,
          opacity,
          transform: `translateY(${shiftY}px)`,
          textAlign: "left",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.serif,
            fontWeight: 600,
            fontSize: 28,
            lineHeight: 1.48,
            letterSpacing: "0.04em",
            color: COLORS.ivory,
            whiteSpace: "pre-line",
            textShadow:
              "0 2px 12px rgba(0,0,0,0.98), 0 0 28px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,1)",
          }}
        >
          {spoken.text}
        </div>
      </div>
    );
  };

  if (!current) {
    return renderSpokenCorner();
  }

  // Crisp fast 100ms pre-downbeat settle so text is 100% legible BEFORE the first sung syllable
  const enterOpacity = interpolate(sec, [current.startSec, current.startSec + 0.1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterY = interpolate(sec, [current.startSec, current.startSec + 0.12], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(sec, [current.endSec - 0.14, current.endSec], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sweepPct = interpolate(sec, [current.singStartSec, current.singEndSec], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      {renderSpokenCorner()}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 46,
          padding: "0 80px",
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
            display: "inline-block",
            opacity: exitOpacity * enterOpacity,
            transform: `translateY(${enterY}px)`,
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
              color: "rgba(244, 239, 230, 0.58)",
              textShadow:
                "0 3px 16px rgba(0,0,0,0.98), 0 0 34px rgba(0,0,0,0.92), 0 1px 4px rgba(0,0,0,1)",
              whiteSpace: "nowrap",
            }}
          >
            {current.text}
          </div>

          {/* Karaoke luminous illumination sweep (tightly fitted to glyph box) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
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
    </>
  );
};

