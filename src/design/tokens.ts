export const VIDEO_FPS = 60;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const TOTAL_FRAMES = 15400; // 256.667s @ 60fps

export const COLORS = {
  void: "#040608",
  obsidian: "#080B0E",
  nvGreen: "#76B900",
  nvLime: "#A6F016",
  nvTeal: "#0C3325",
  amber: "#F5A623",
  amberHot: "#FF7828",
  crimson: "#FF2E4C",
  crimsonDeep: "#8D0A1D",
  cyan: "#22D3EE",
  iceBlue: "#7DD3FC",
  amdRed: "#ED1C24",
  ivory: "#F4EFE6",
  gold: "#E8BA5A",
  textPrimary: "#F7F8FA",
} as const;

export const FONTS = {
  sans: "'Noto Sans CJK SC', 'Noto Sans SC', system-ui, sans-serif",
  serif: "'Noto Serif CJK SC', 'Noto Serif SC', Georgia, serif",
  display: "'Oswald', 'Noto Sans CJK SC', sans-serif",
  mono: "'IBM Plex Mono', monospace",
} as const;

export const secToFrame = (sec: number) => Math.round(sec * VIDEO_FPS);
export const frameToSec = (frame: number) => frame / VIDEO_FPS;
