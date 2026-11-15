import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import "./fonts.css";
import { COLORS, secToFrame } from "./design/tokens";
import { GlobalFrameProvider } from "./data/audio";
import { CinemaLyrics } from "./cinema/CinemaLyrics";
import { Scene00Intro } from "./scenes/Scene00Intro";
import { Scene01Act1Verse1 } from "./scenes/Scene01Act1Verse1";
import { Scene02Act1Verse2 } from "./scenes/Scene02Act1Verse2";
import { Scene03Act1Chorus1 } from "./scenes/Scene03Act1Chorus1";
import { Scene04Act1Chorus2 } from "./scenes/Scene04Act1Chorus2";
import { Scene05Act1Bridge } from "./scenes/Scene05Act1Bridge";
import { Scene06Interlude } from "./scenes/Scene06Interlude";
import { Scene07Act2Verse1 } from "./scenes/Scene07Act2Verse1";
import { Scene08Act2Verse2 } from "./scenes/Scene08Act2Verse2";
import { Scene09Act2Chorus1 } from "./scenes/Scene09Act2Chorus1";
import { Scene10Act2Chorus2 } from "./scenes/Scene10Act2Chorus2";
import { Scene11FinalAndOutro } from "./scenes/Scene11FinalAndOutro";

const getLyricAccent = (sec: number): string => {
  if (sec < 71.52) return COLORS.nvLime;
  if (sec < 121.52) return COLORS.amber;
  if (sec >= 197.52 && sec < 201.52) return COLORS.amdRed;
  if (sec >= 205.52 && sec < 209.52) return COLORS.cyan;
  if (sec >= 219.52 && sec < 227.52) return COLORS.nvLime;
  if (sec >= 227.52) return COLORS.gold;
  return COLORS.crimson;
};

export const JensenPV: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const sec = frame / fps;

  // All section cuts quantized strictly to true 4.000s downbeats
  const f1 = secToFrame(39.52);
  const f2 = secToFrame(55.52);
  const f3 = secToFrame(71.52);
  const f4 = secToFrame(87.52);
  const f5 = secToFrame(105.52);
  const f6 = secToFrame(121.52);
  const f7 = secToFrame(153.52);
  const f8 = secToFrame(169.52);
  const f9 = secToFrame(185.52);
  const f10 = secToFrame(201.52);
  const f11 = secToFrame(219.52);

  return (
    <GlobalFrameProvider frame={frame}>
      <AbsoluteFill style={{ backgroundColor: COLORS.void }}>
        <Audio src={staticFile("audio.mp3")} />

        <Sequence from={0} durationInFrames={f1}>
          <Scene00Intro />
        </Sequence>
        <Sequence from={f1} durationInFrames={f2 - f1}>
          <Scene01Act1Verse1 />
        </Sequence>
        <Sequence from={f2} durationInFrames={f3 - f2}>
          <Scene02Act1Verse2 />
        </Sequence>
        <Sequence from={f3} durationInFrames={f4 - f3}>
          <Scene03Act1Chorus1 />
        </Sequence>
        <Sequence from={f4} durationInFrames={f5 - f4}>
          <Scene04Act1Chorus2 />
        </Sequence>
        <Sequence from={f5} durationInFrames={f6 - f5}>
          <Scene05Act1Bridge />
        </Sequence>
        <Sequence from={f6} durationInFrames={f7 - f6}>
          <Scene06Interlude />
        </Sequence>
        <Sequence from={f7} durationInFrames={f8 - f7}>
          <Scene07Act2Verse1 />
        </Sequence>
        <Sequence from={f8} durationInFrames={f9 - f8}>
          <Scene08Act2Verse2 />
        </Sequence>
        <Sequence from={f9} durationInFrames={f10 - f9}>
          <Scene09Act2Chorus1 />
        </Sequence>
        <Sequence from={f10} durationInFrames={f11 - f10}>
          <Scene10Act2Chorus2 />
        </Sequence>
        <Sequence from={f11} durationInFrames={durationInFrames - f11}>
          <Scene11FinalAndOutro />
        </Sequence>

        <CinemaLyrics accentColor={getLyricAccent(sec)} />
      </AbsoluteFill>
    </GlobalFrameProvider>
  );
};

