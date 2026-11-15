export interface LyricLine {
  id: number;
  startSec: number;
  singStartSec: number;
  singEndSec: number;
  endSec: number;
  text: string;
  stanza: number;
}

export interface SpokenCue {
  id: number;
  startSec: number;
  endSec: number;
  text: string;
  section: "intro" | "interlude" | "outro";
}

interface RawLine {
  bar: number; // Exact musical measure downbeat / pickup anchor in audio.mp3
  dur?: number; // Phrase window (default 4.0s)
  singLag?: number; // Offset from bar to actual first sung syllable
  singSpan?: number; // Vocal sweep duration
  text: string;
  stanza: number;
}

// Quantized directly to measured 120 BPM (4.000s/bar) bass kicks & vocal onsets in public/audio.mp3
const RAW_LINES: RawLine[] = [
  // Stanza 1 (39.52s - 55.52s)
  { bar: 39.52, singLag: 0.16, singSpan: 3.35, text: "曾经真以为皮衣穿到老了", stanza: 1 },
  { bar: 43.52, singLag: 0.0, singSpan: 3.35, text: "卖卡的心拒绝再有浪潮", stanza: 1 },
  { bar: 47.52, singLag: 0.0, singSpan: 3.35, text: "禁了千次的芯片却断不了", stanza: 1 },
  { bar: 51.52, singLag: 0.0, singSpan: 3.25, text: "四十八亿它将我围绕", stanza: 1 },

  // Stanza 2 (55.52s - 71.52s)
  { bar: 55.52, singLag: 0.0, singSpan: 3.35, text: "国会问我你究竟是哪里好", stanza: 2 },
  { bar: 59.52, singLag: 0.0, singSpan: 3.35, text: "台北酒吧我还忘不了", stanza: 2 },
  { bar: 63.52, singLag: 0.0, singSpan: 3.35, text: "股价再高也比不上你的笑", stanza: 2 },
  { bar: 67.52, singLag: 0.0, singSpan: 3.25, text: "没买过卡的人不会明了", stanza: 2 },

  // Stanza 3 (71.52s - 87.52s)
  { bar: 71.52, singLag: 0.02, singSpan: 3.35, text: "是鬼迷了心窍也好", stanza: 3 },
  { bar: 75.52, singLag: 0.02, singSpan: 3.35, text: "是老康送秘书也好", stanza: 3 },
  { bar: 79.52, singLag: 0.02, singSpan: 3.35, text: "然而这一切已不再重要", stanza: 3 },
  { bar: 83.52, singLag: 0.02, singSpan: 3.35, text: "只要你再订百亿显卡包", stanza: 3 },

  // Stanza 4 (87.52s - 105.52s, includes 2s turnaround after L16)
  { bar: 87.52, singLag: 0.02, singSpan: 3.35, text: "是监听的巧合也好", stanza: 4 },
  { bar: 91.52, singLag: 0.02, singSpan: 3.35, text: "是你存心的渗透也好", stanza: 4 },
  { bar: 95.52, singLag: 0.02, singSpan: 3.35, text: "然而打码条已不再重要", stanza: 4 },
  { bar: 99.52, dur: 5.2, singLag: 0.02, singSpan: 4.1, text: "我愿意陪你被全球通报", stanza: 4 },

  // Stanza 5 (105.52s - 121.52s)
  { bar: 105.52, singLag: 0.02, singSpan: 3.35, text: "虽然老康总是笑笑的不计较", stanza: 5 },
  { bar: 109.52, singLag: 0.0, singSpan: 3.35, text: "虽然密电总是让人烦恼", stanza: 5 },
  { bar: 113.52, singLag: 0.0, singSpan: 3.35, text: "虽然芯片流向不能知道", stanza: 5 },
  { bar: 117.52, dur: 3.9, singLag: 0.0, singSpan: 3.4, text: "现在发道歉会不会太早", stanza: 5 },

  // Stanza 6 (Act 2 Verse 1: 153.52s - 169.52s)
  { bar: 153.52, singLag: 0.02, singSpan: 3.35, text: "曾经真的以为写封信就过了", stanza: 6 },
  { bar: 157.52, singLag: 0.0, singSpan: 3.35, text: "纽约时报反手又是一刀", stanza: 6 },
  { bar: 161.52, singLag: 0.0, singSpan: 3.35, text: "医疗部的女高管也瞒不了", stanza: 6 },
  { bar: 165.52, singLag: 0.0, singSpan: 3.25, text: "董事会在深夜里咆哮", stanza: 6 },

  // Stanza 7 (169.52s - 185.52s)
  { bar: 169.52, singLag: 0.0, singSpan: 3.35, text: "股东问我窝边草是哪里好", stanza: 7 },
  { bar: 173.52, singLag: 0.0, singSpan: 3.35, text: "圣何塞那晚我忘不了", stanza: 7 },
  { bar: 177.52, singLag: 0.0, singSpan: 3.35, text: "期权再贵也比不上你的笑", stanza: 7 },
  { bar: 181.52, singLag: 0.0, singSpan: 3.25, text: "没丢过官的人不会明了", stanza: 7 },

  // Stanza 8 (185.52s - 201.52s)
  { bar: 185.52, singLag: 0.04, singSpan: 3.35, text: "是华尔街逼宫也好", stanza: 8 },
  { bar: 189.52, singLag: 0.0, singSpan: 3.35, text: "是受惊鹿反咬也好", stanza: 8 },
  { bar: 193.52, singLag: 0.0, singSpan: 3.35, text: "然而一亿刀已全部打漂", stanza: 8 },
  { bar: 197.52, singLag: 0.0, singSpan: 3.35, text: "表外甥女正捧着奖杯笑", stanza: 8 },

  // Stanza 9 (201.52s - 219.52s, includes 2s turnaround after L36)
  { bar: 201.52, singLag: 0.02, singSpan: 3.35, text: "是懂王荐库克也好", stanza: 9 },
  { bar: 205.52, singLag: 0.0, singSpan: 3.35, text: "是马斯克来挖人也好", stanza: 9 },
  { bar: 209.52, singLag: 0.0, singSpan: 3.35, text: "然而这一切已不再重要", stanza: 9 },
  { bar: 213.52, dur: 5.2, singLag: 0.0, singSpan: 4.0, text: "老婆在加州把律师找好", stanza: 9 },

  // Stanza 10 (Final: 219.52s - 237.60s)
  { bar: 219.52, singLag: 0.05, singSpan: 3.35, text: "虽然韭菜总是哭着把请愿搞", stanza: 10 },
  { bar: 223.52, singLag: 0.0, singSpan: 3.35, text: "虽然大股东还想把我保", stanza: 10 },
  { bar: 227.52, singLag: 0.0, singSpan: 3.35, text: "虽然身家会不会砍半刀", stanza: 10 },
  { bar: 231.52, dur: 6.0, singLag: 0.0, singSpan: 4.35, text: "现在脱皮衣会不会太早", stanza: 10 },
];

export const LYRIC_LINES: LyricLine[] = RAW_LINES.map((item, idx) => {
  const dur = item.dur ?? 4.0;
  // Appear 0.14s early so the fast 100ms enter settles ON the beat, never lagging behind first syllable
  const startSec = item.bar - 0.14;
  const singStartSec = item.bar + (item.singLag ?? 0);
  const singEndSec = singStartSec + (item.singSpan ?? 3.35);
  const endSec = item.bar + dur - 0.14;
  return {
    id: idx,
    startSec,
    singStartSec,
    singEndSec,
    endSec,
    text: item.text,
    stanza: item.stanza,
  };
});

// Corner spoken monologue cues — timed verbatim to Jensen AI voice segments in public/audio.mp3
export const SPOKEN_CUES: SpokenCue[] = [
  // Intro spoken monologue (3.45s - 25.10s)
  {
    id: 0,
    startSec: 3.45,
    endSec: 7.88,
    text: "Ladies and gentlemen...\nThe more you buy, the more you save...",
    section: "intro",
  },
  {
    id: 1,
    startSec: 7.9,
    endSec: 13.42,
    text: "但没人告诉我，\nThe more you love, the more you 社死啊……",
    section: "intro",
  },
  {
    id: 2,
    startSec: 13.44,
    endSec: 16.08,
    text: "三十三年，四万亿美金，",
    section: "intro",
  },
  {
    id: 3,
    startSec: 16.1,
    endSec: 19.04,
    text: "最后栽在台北的一杯威士忌，",
    section: "intro",
  },
  {
    id: 4,
    startSec: 19.06,
    endSec: 21.84,
    text: "和圣何塞的一间酒店里。",
    section: "intro",
  },
  {
    id: 5,
    startSec: 21.86,
    endSec: 25.15,
    text: "音乐起，把我的黑皮衣拿来——",
    section: "intro",
  },

  // Interlude spoken phone call monologue (122.25s - 145.10s)
  {
    id: 6,
    startSec: 122.25,
    endSec: 124.15,
    text: "喂？克雷斯吗？",
    section: "interlude",
  },
  {
    id: 7,
    startSec: 124.17,
    endSec: 129.65,
    text: "我八月份骂你是‘车灯前受惊的鹿’、\n只会做财务报表，",
    section: "interlude",
  },
  {
    id: 8,
    startSec: 129.67,
    endSec: 133.78,
    text: "是我大声了点，你别真坐我老板椅啊！",
    section: "interlude",
  },
  {
    id: 9,
    startSec: 133.8,
    endSec: 137.08,
    text: "什么？Lisa Su 刚拿了 2026 年度 CEO？",
    section: "interlude",
  },
  {
    id: 10,
    startSec: 137.1,
    endSec: 139.85,
    text: "她还在推特上放鞭炮？！",
    section: "interlude",
  },
  {
    id: 11,
    startSec: 139.87,
    endSec: 145.2,
    text: "喂？Elon？你真让我去特斯拉看大门吗？！",
    section: "interlude",
  },

  // Outro closing spoken remark (238.75s - 246.15s) before final silent fade
  {
    id: 12,
    startSec: 238.75,
    endSec: 246.15,
    text: "十三万兄弟签了请愿书，\n等我把加州律师费结了，I'll be back.",
    section: "outro",
  },
];

export const getActiveLyric = (sec: number): { current: LyricLine | null } => {
  for (let i = 0; i < LYRIC_LINES.length; i++) {
    const line = LYRIC_LINES[i];
    if (sec >= line.startSec && sec < line.endSec) {
      return { current: line };
    }
  }
  return { current: null };
};

export const getActiveSpokenCue = (sec: number): SpokenCue | null => {
  for (let i = 0; i < SPOKEN_CUES.length; i++) {
    const cue = SPOKEN_CUES[i];
    if (sec >= cue.startSec && sec < cue.endSec) {
      return cue;
    }
  }
  return null;
};

