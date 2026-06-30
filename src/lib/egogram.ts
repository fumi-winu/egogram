export type EgogramType = "CP" | "NP" | "A" | "FC" | "AC";

export type AnswerValue = 0 | 1 | 2;

export type Screen = "start" | "question" | "result";

export interface Question {
  id: number;
  text: string;
  type: EgogramType;
}

export interface EgogramInfo {
  type: EgogramType;
  name: string;
  nameJa: string;
  color: string;
  description: string;
  highScore: string;
  lowScore: string;
}

export const MAX_SCORE_PER_TYPE = 4;

export const EGOGRAM_INFO: Record<EgogramType, EgogramInfo> = {
  CP: {
    type: "CP",
    name: "Critical Parent",
    nameJa: "厳格な親",
    color: "#ef4444",
    description:
      "正しさ・ルール・責任を重視し、批判的・管理的な側面を表します。",
    highScore:
      "物事に対して厳格で、正しいと思う基準を周囲にも求める傾向があります。",
    lowScore:
      "批判的な態度は控えめで、他人を裁くより受け入れる姿勢が見られます。",
  },
  NP: {
    type: "NP",
    name: "Nurturing Parent",
    nameJa: "養育的親",
    color: "#22c55e",
    description:
      "思いやり・支援・励ましを通じて、周囲をケアする側面を表します。",
    highScore:
      "人の世話を焼くことが多く、周囲を支え・励ますことに喜びを感じます。",
    lowScore:
      "他者への過度な世話は少なく、距離を保ちながら関わる傾向があります。",
  },
  A: {
    type: "A",
    name: "Adult",
    nameJa: "成人",
    color: "#3b82f6",
    description:
      "事実と論理に基づいて冷静に判断する、理性的な側面を表します。",
    highScore:
      "感情に流されず、客観的な視点で物事を分析・判断する力が強いです。",
    lowScore:
      "論理より感情や直感で動くことが多く、冷静な分析は控えめです。",
  },
  FC: {
    type: "FC",
    name: "Free Child",
    nameJa: "自由な子供",
    color: "#f59e0b",
    description:
      "好奇心・創造性・自由な表現など、素直で自然体な側面を表します。",
    highScore:
      "自由で創造的な行動を好み、楽しさや好奇心を大切にする傾向があります。",
    lowScore:
      "衝動的な行動は控えめで、落ち着いた・慎重な姿勢が見られます。",
  },
  AC: {
    type: "AC",
    name: "Adapted Child",
    nameJa: "順応的子供",
    color: "#a855f7",
    description:
      "周囲への適応・協調・空気を読むなど、順応的な側面を表します。",
    highScore:
      "周囲の期待や雰囲気に敏感で、協調・順応を重視する傾向があります。",
    lowScore:
      "周囲に合わせすぎることは少なく、自分の意思をはっきり示します。",
  },
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "物事には正しいやり方があり、間違っている人には厳しく指摘すべきだと思う",
    type: "CP",
  },
  {
    id: 2,
    text: "ルールや約束は守らなければならないと強く感じる",
    type: "CP",
  },
  {
    id: 3,
    text: "困っている人がいれば、つい手を貸してしまう",
    type: "NP",
  },
  {
    id: 4,
    text: "周りの人が元気になるよう、励ましや気配りをしたくなる",
    type: "NP",
  },
  {
    id: 5,
    text: "問題が起きたとき、まず事実を整理してから判断する",
    type: "A",
  },
  {
    id: 6,
    text: "感情よりも論理と根拠を重視して決断することが多い",
    type: "A",
  },
  {
    id: 7,
    text: "好きなことをするとき、時間を忘れて夢中になる",
    type: "FC",
  },
  {
    id: 8,
    text: "いきなり新しいことに挑戦したくなることがある",
    type: "FC",
  },
  {
    id: 9,
    text: "場の空気を読んで、自分の意見を抑えることがある",
    type: "AC",
  },
  {
    id: 10,
    text: "周りの期待に応えようとして、無理をしてしまうことがある",
    type: "AC",
  },
];

export const ANSWER_OPTIONS: { label: string; value: AnswerValue }[] = [
  { label: "はい", value: 2 },
  { label: "どちらでもない", value: 1 },
  { label: "いいえ", value: 0 },
];

export function calculateScores(answers: AnswerValue[]): Record<EgogramType, number> {
  const scores: Record<EgogramType, number> = {
    CP: 0,
    NP: 0,
    A: 0,
    FC: 0,
    AC: 0,
  };

  QUESTIONS.forEach((question, index) => {
    scores[question.type] += answers[index] ?? 0;
  });

  return scores;
}

export function getDominantType(
  scores: Record<EgogramType, number>
): EgogramType {
  return (Object.entries(scores) as [EgogramType, number][]).reduce(
    (max, [type, score]) => (score > max[1] ? [type, score] : max),
    ["CP", 0] as [EgogramType, number]
  )[0];
}
