import React from "react";
import { Composition } from "remotion";
import { JensenPV } from "./JensenPV";
import {
  TOTAL_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./design/tokens";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="JensenPV"
      component={JensenPV}
      durationInFrames={TOTAL_FRAMES}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
