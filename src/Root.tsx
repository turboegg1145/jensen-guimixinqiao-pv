import React from "react";
import { Composition, Still } from "remotion";
import { JensenPV } from "./JensenPV";
import { Cover4x3 } from "./Cover4x3";
import {
  TOTAL_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./design/tokens";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="JensenPV"
        component={JensenPV}
        durationInFrames={TOTAL_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Still
        id="Cover4x3"
        component={Cover4x3}
        width={1600}
        height={1200}
      />
    </>
  );
};
