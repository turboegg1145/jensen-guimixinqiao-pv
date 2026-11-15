export interface LyricLine {
  id: number;
  startSec: number;
  singEndSec: number;
  endSec: number;
  text: string;
  stanza: number;
}

interface RawLine {
  start: number;
  end: number;
  text: string;
  stanza: number;
}

const RAW_LINES: RawLine[] = [
  // Stanza 1
  { start: 39.89, end: 43.69, text: "曾经真以为皮衣穿到老了", stanza: 1 },
  { start: 43.69, end: 47.83, text: "卖卡的心拒绝再有浪潮", stanza: 1 },
  { start: 47.83, end: 51.81, text: "禁了千次的芯片却断不了", stanza: 1 },
  { start: 51.81, end: 54.98, text: "四十八亿它将我围绕", stanza: 1 },

  // Stanza 2
  { start: 55.82, end: 59.65, text: "国会问我你究竟是哪里好", stanza: 2 },
  { start: 59.65, end: 63.74, text: "台北酒吧我还忘不了", stanza: 2 },
  { start: 63.74, end: 67.59, text: "股价再高也比不上你的笑", stanza: 2 },
  { start: 67.59, end: 71.11, text: "没买过卡的人不会明了", stanza: 2 },

  // Stanza 3
  { start: 71.94, end: 75.69, text: "是鬼迷了心窍也好", stanza: 3 },
  { start: 75.69, end: 79.86, text: "是老康送秘书也好", stanza: 3 },
  { start: 79.86, end: 83.85, text: "然而这一切已不再重要", stanza: 3 },
  { start: 83.85, end: 87.78, text: "只要你再订百亿显卡包", stanza: 3 },

  // Stanza 4
  { start: 88.1, end: 91.86, text: "是监听的巧合也好", stanza: 4 },
  { start: 91.86, end: 95.81, text: "是你存心的渗透也好", stanza: 4 },
  { start: 95.81, end: 99.72, text: "然而打码条已不再重要", stanza: 4 },
  { start: 99.72, end: 104.41, text: "我愿意陪你被全球通报", stanza: 4 },

  // Stanza 5
  { start: 105.86, end: 109.63, text: "虽然老康总是笑笑的不计较", stanza: 5 },
  { start: 109.63, end: 113.82, text: "虽然密电总是让人烦恼", stanza: 5 },
  { start: 113.82, end: 117.67, text: "虽然芯片流向不能知道", stanza: 5 },
  { start: 117.67, end: 121.9, text: "现在发道歉会不会太早", stanza: 5 },

  // Stanza 6 (Act 2)
  { start: 153.66, end: 157.55, text: "曾经真的以为写封信就过了", stanza: 6 },
  { start: 157.55, end: 161.74, text: "纽约时报反手又是一刀", stanza: 6 },
  { start: 161.74, end: 165.69, text: "医疗部的女高管也瞒不了", stanza: 6 },
  { start: 165.69, end: 168.93, text: "董事会在深夜里咆哮", stanza: 6 },

  // Stanza 7
  { start: 169.73, end: 173.59, text: "股东问我窝边草是哪里好", stanza: 7 },
  { start: 173.59, end: 177.76, text: "圣何塞那晚我忘不了", stanza: 7 },
  { start: 177.76, end: 181.52, text: "期权再贵也比不上你的笑", stanza: 7 },
  { start: 181.52, end: 185.08, text: "没丢过官的人不会明了", stanza: 7 },

  // Stanza 8
  { start: 186.02, end: 189.82, text: "是华尔街逼宫也好", stanza: 8 },
  { start: 189.82, end: 193.78, text: "是受惊鹿反咬也好", stanza: 8 },
  { start: 193.78, end: 197.77, text: "然而一亿刀已全部打漂", stanza: 8 },
  { start: 197.77, end: 201.5, text: "表外甥女正捧着奖杯笑", stanza: 8 },

  // Stanza 9
  { start: 201.99, end: 205.78, text: "是懂王荐库克也好", stanza: 9 },
  { start: 205.78, end: 209.72, text: "是马斯克来挖人也好", stanza: 9 },
  { start: 209.72, end: 213.54, text: "然而这一切已不再重要", stanza: 9 },
  { start: 213.54, end: 217.87, text: "老婆在加州把律师找好", stanza: 9 },

  // Stanza 10
  { start: 220.06, end: 223.51, text: "虽然韭菜总是哭着把请愿搞", stanza: 10 },
  { start: 223.51, end: 227.75, text: "虽然大股东还想把我保", stanza: 10 },
  { start: 227.75, end: 231.61, text: "虽然身家会不会砍半刀", stanza: 10 },
  { start: 231.61, end: 237.73, text: "现在脱皮衣会不会太早", stanza: 10 },
];

export const LYRIC_LINES: LyricLine[] = RAW_LINES.map((item, idx) => {
  const span = item.end - item.start;
  const singRatio = idx === RAW_LINES.length - 1 ? 0.72 : 0.86;
  return {
    id: idx,
    startSec: item.start,
    singEndSec: item.start + span * singRatio,
    endSec: item.end,
    text: item.text,
    stanza: item.stanza,
  };
});

export const getActiveLyric = (sec: number): { current: LyricLine | null; next: LyricLine | null } => {
  for (let i = 0; i < LYRIC_LINES.length; i++) {
    const line = LYRIC_LINES[i];
    if (sec >= line.startSec && sec < line.endSec) {
      const next = LYRIC_LINES[i + 1] ?? null;
      return {
        current: line,
        next: next && next.stanza === line.stanza ? next : null,
      };
    }
  }
  // Preview upcoming first line of next stanza 1.2s early
  for (let i = 0; i < LYRIC_LINES.length; i++) {
    const line = LYRIC_LINES[i];
    if (sec >= line.startSec - 1.0 && sec < line.startSec) {
      return { current: null, next: line };
    }
  }
  return { current: null, next: null };
};
