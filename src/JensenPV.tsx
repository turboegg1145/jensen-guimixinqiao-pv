import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "./fonts.css";
import { COLORS, secToFrame } from "./design/tokens";
import { GlobalFrameProvider, useAudioFrame } from "./data/audio";
import { CinemaLyrics } from "./cinema/CinemaLyrics";
import { GlitchOverlay } from "./components/GlitchOverlay";
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

const CUT_FRAMES = [
  secToFrame(39.89),
  secToFrame(55.82),
  secToFrame(71.94),
  secToFrame(88.1),
  secToFrame(105.86),
  secToFrame(121.9),
  secToFrame(153.66),
  secToFrame(169.73),
  secToFrame(186.02),
  secToFrame(201.99),
  secToFrame(220.06),
];

const SceneGlitchLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;
  const audio = useAudioFrame();

  let cutGlitch = 0;
  for (const cut of CUT_FRAMES) {
    const dist = Math.abs(frame - cut);
    if (dist <= 7) {
      cutGlitch = Math.max(cutGlitch, (1 - dist / 7) * 0.75);
    }
  }

  const dropGlitch =
    sec > 72 && sec < 220 && audio.pulse > 0.82
      ? (audio.pulse - 0.82) * 1.9
      : 0;

  const intensity = Math.min(1, Math.max(cutGlitch, dropGlitch));
  const tint =
    sec >= 197.77 && sec < 201.99
      ? COLORS.amdRed
      : sec >= 145
      ? COLORS.crimson
      : COLORS.amber;

  return <GlitchOverlay intensity={intensity} tint={tint} />;
};

const getLyricAccent = (sec: number): string => {
  if (sec < 71.94) return COLORS.nvLime;
  if (sec < 121.9) return COLORS.amber;
  if (sec >= 197.77 && sec < 201.99) return COLORS.amdRed;
  if (sec >= 205.78 && sec < 209.72) return COLORS.cyan;
  if (sec >= 220.06 && sec < 227.75) return COLORS.nvLime;
  if (sec >= 227.75) return COLORS.gold;
  return COLORS.crimson;
};

export const JensenPV: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const sec = frame / fps;

  const f1 = secToFrame(39.89);
  const f2 = secToFrame(55.82);
  const f3 = secToFrame(71.94);
  const f4 = secToFrame(88.1);
  const f5 = secToFrame(105.86);
  const f6 = secToFrame(121.9);
  const f7 = secToFrame(153.66);
  const f8 = secToFrame(169.73);
  const f9 = secToFrame(186.02);
  const f10 = secToFrame(201.99);
  const f11 = secToFrame(220.06);

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

        <SceneGlitchLayer />
        <CinemaLyrics accentColor={getLyricAccent(sec)} />
      </AbsoluteFill>
    </GlobalFrameProvider>
  );
};
