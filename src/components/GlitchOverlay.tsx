import React from "react";
import { COLORS } from "../design/tokens";
import { useGlobalFrame } from "../data/audio";

interface GlitchOverlayProps {
  intensity?: number; // 0..1
  tint?: string;
}

export const GlitchOverlay: React.FC<GlitchOverlayProps> = ({
  intensity = 0,
  tint = COLORS.crimson,
}) => {
  const frame = useGlobalFrame();
  if (intensity <= 0.04) return null;

  const slices = [0, 1, 2, 3, 4].map((idx) => {
    const hSeed = Math.sin(frame * 1.37 + idx * 91.7);
    const topPct = ((Math.abs(hSeed) * 88) % 85) + 4;
    const heightPx = 6 + ((idx * 11) % 28);
    const offsetX = Math.cos(frame * 2.13 + idx * 47.3) * 48 * intensity;
    return { topPct, heightPx, offsetX };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 80,
        mixBlendMode: "screen",
        opacity: intensity * 0.75,
      }}
    >
      {slices.map((s, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${s.topPct}%`,
            height: s.heightPx,
            transform: `translateX(${s.offsetX}px)`,
            background:
              idx % 2 === 0
                ? `linear-gradient(90deg, transparent 8%, ${tint}55 45%, ${COLORS.cyan}44 75%, transparent 95%)`
                : `linear-gradient(90deg, transparent 5%, ${COLORS.nvLime}44 50%, ${tint}55 85%, transparent 98%)`,
          }}
        />
      ))}
    </div>
  );
};
