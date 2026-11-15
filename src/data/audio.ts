import React, { createContext, useContext } from "react";
import { useCurrentFrame } from "remotion";
import audioFeaturesJson from "../../public/audio-features.json";

interface AudioFeatures {
  fps: number;
  duration: number;
  totalFrames: number;
  rms: number[];
  bass: number[];
  mid: number[];
  high: number[];
  pulse: number[];
  bands: number[][];
}

const features = audioFeaturesJson as AudioFeatures;

const GlobalFrameContext = createContext<number | null>(null);

export const GlobalFrameProvider: React.FC<{
  frame: number;
  children: React.ReactNode;
}> = ({ frame, children }) =>
  React.createElement(GlobalFrameContext.Provider, { value: frame }, children);

export const useGlobalFrame = (): number => {
  const localFrame = useCurrentFrame();
  const ctxFrame = useContext(GlobalFrameContext);
  return ctxFrame ?? localFrame;
};

export interface AudioFrameSample {
  rms: number;
  bass: number;
  mid: number;
  high: number;
  pulse: number;
  bands: number[];
}

const clampIndex = (frame: number) =>
  Math.max(0, Math.min(features.totalFrames - 1, Math.round(frame)));

export const sampleAudioAtFrame = (frame: number): AudioFrameSample => {
  const idx = clampIndex(frame);
  return {
    rms: features.rms[idx] / 99,
    bass: features.bass[idx] / 99,
    mid: features.mid[idx] / 99,
    high: features.high[idx] / 99,
    pulse: features.pulse[idx] / 99,
    bands: features.bands[idx].map((v) => v / 99),
  };
};

export const useAudioFrame = (): AudioFrameSample => {
  const frame = useGlobalFrame();
  return sampleAudioAtFrame(frame);
};
