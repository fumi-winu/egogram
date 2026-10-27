export type Factor =
  | "creative"
  | "experiential"
  | "attitudinal"
  | "autonomy";

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export type Screen = "start" | "question";

export type PersonalityTypeId =
  | "solitary-architect"
  | "introspective-thinker"
  | "autonomous-creator"
  | "aesthetic-practitioner"
  | "solitary-witness"
  | "existential-resolve"
  | "creative-realizer"
  | "world-receiver"
  | "fate-dialogist"
  | "self-contained"
  | "integrated-existence"
  | "balanced-observer"
  | "meaning-seeker";

export interface Question {
  id: number;
  text: string;
  factor: Factor;
}

export interface FactorInfo {
  id: Factor;
  name: string;
  nameEn: string;
  shortLabel: string;
  color: string;
  description: string;
  highScore: string;
  midScore: string;
  lowScore: string;
}

export interface PersonalityType {
  id: PersonalityTypeId;
  name: string;
  nameEn: string;
  tagline: string;
  strengths: string;
  crisis: string;
  prescription: string;
}

export type ScoreBand = "high" | "mid" | "low";

export const SCORE_BAND_LABEL: Record<ScoreBand, string> = {
  high: "高い",
  mid: "中程度",
  low: "低め",
};

export function getScoreBand(percentile: number): ScoreBand {
  if (percentile >= 65) return "high";
  if (percentile <= 34) return "low";
  return "mid";
}

export interface DiagnosisResult {
  scores: Record<Factor, number>;
  percentiles: Record<Factor, number>;
  maxScore: number;
  minScore: number;
  type: PersonalityType;
}

export const FACTOR_ORDER: Factor[] = [
  "creative",
  "experiential",
  "attitudinal",
  "autonomy",
];

export const QUESTIONS_PER_FACTOR = 5;
export const MIN_SCORE_PER_FACTOR = QUESTIONS_PER_FACTOR * 1;
export const MAX_SCORE_PER_FACTOR = QUESTIONS_PER_FACTOR * 5;

export const FACTOR_INFO: Record<Factor, FactorInfo> = {
  "creative": {
    "id": "creative",
    "name": "創造価値",
    "nameEn": "Creative Value",
    "shortLabel": "創造",
    "color": "var(--factor-creative)",
    "description": "仕事や制作、家事、誰かへの手助けなど、行為を通して世界に何かを返すこと。フランクルの創造価値を参考に、取り組むことに意味を感じる傾向を振り返ります。独創性や成果の大きさを測るものではありません。",
    "highScore": "今回の回答では、手を動かしたり役割を果たしたりすることに、意味を感じる傾向が表れています。最近、取り組んでよかったことを思い出してみてください。",
    "midScore": "行為に関する回答は中間の範囲でした。場面による違いや迷いも含まれるため、具体的な経験と照らし合わせて読んでください。",
    "lowScore": "今回の質問では、行為を通した意味への当てはまりは控えめでした。創造力や能力の低さを示すものではなく、忙しさや取り組む機会にも左右されます。"
  },
  "experiential": {
    "id": "experiential",
    "name": "体験価値",
    "nameEn": "Experiential Value",
    "shortLabel": "体験",
    "color": "var(--factor-experiential)",
    "description": "人との出会い、自然、芸術などを通して、世界から大切なものを受け取ること。フランクルの体験価値を参考に、味わうことや関わることに意味を感じる傾向を振り返ります。",
    "highScore": "今回の回答では、出会いや体験を大切にする傾向が表れています。誰かと過ごした時間や、心に残った風景が、日々の意味を考える手がかりになりそうです。",
    "midScore": "体験に関する回答は中間の範囲でした。相手や場面によって感じ方が変わることもあります。最近心に残った時間を一つ思い出してみてください。",
    "lowScore": "今回の質問では、体験を通した意味への当てはまりは控えめでした。感受性や愛情が乏しいという意味ではありません。質問が自分の大切な体験を捉えていない可能性もあります。"
  },
  "attitudinal": {
    "id": "attitudinal",
    "name": "態度価値",
    "nameEn": "Attitudinal Value",
    "shortLabel": "態度",
    "color": "var(--factor-attitudinal)",
    "description": "どうしても変えられない状況に対し、どのように向き合うかに意味を見いだすこと。フランクルの態度価値を参考にしています。変えられる負担を減らすことや、助けを求めることも大切です。",
    "highScore": "今回の回答では、状況への向き合い方を大切にする傾向が表れています。耐える力の評価ではありません。状況を変える選択と、自分の応答を選ぶことを分けて考えてみてください。",
    "midScore": "態度に関する回答は中間の範囲でした。経験した状況や、いまの余裕によっても答えは変わります。常に前向きでいる必要はありません。",
    "lowScore": "今回の質問では、向き合い方に意味を見いだす項目への当てはまりは控えめでした。覚悟や人間的な強さの不足を意味しません。いまは意味を探すより負担を減らすことを選んでも構いません。"
  },
  "autonomy": {
    "id": "autonomy",
    "name": "実存的自律",
    "nameEn": "Existential Autonomy",
    "shortLabel": "自律",
    "color": "var(--factor-autonomy)",
    "description": "他者の意見を受け取りながら、自分が大切にしたいことを選択に反映する傾向。本サイトが三価値に加えた独自の観点で、フランクルの「第四の価値」ではありません。",
    "highScore": "今回の回答では、自分の納得や価値観を選択の手がかりにする傾向が表れています。人に相談することと、自分で選ぶことは両立できます。",
    "midScore": "自律に関する回答は中間の範囲でした。自分の考えと周囲の意見をどう扱うかは、選択の内容によっても変わります。最近の決断を一つ振り返ってみてください。",
    "lowScore": "今回の質問では、自分の基準を選択に反映する項目への当てはまりは控えめでした。依存的という判定ではありません。周囲との関係や、自由に選べる状況かどうかも影響します。"
  }
};

export function getFactorInsight(factor: Factor, percentile: number): string {
  const info = FACTOR_INFO[factor];
  const band = getScoreBand(percentile);
  if (band === "high") return info.highScore;
  if (band === "low") return info.lowScore;
  return info.midScore;
}

export const QUESTIONS: Question[] = [
  {
    "id": 1,
    "text": "自分の取り組みが誰かの役に立ったとき、やってよかったと感じる。",
    "factor": "creative"
  },
  {
    "id": 2,
    "text": "自然や芸術に触れる時間そのものに、大切な意味を感じる。",
    "factor": "experiential"
  },
  {
    "id": 3,
    "text": "すぐには変えられない状況でも、自分が大切にしたい向き合い方を考える。",
    "factor": "attitudinal"
  },
  {
    "id": 4,
    "text": "何かを決めるとき、自分が何を大切にしたいかを確かめる。",
    "factor": "autonomy"
  },
  {
    "id": 5,
    "text": "考えたことを実際に形にする過程に、充実を感じる。",
    "factor": "creative"
  },
  {
    "id": 6,
    "text": "大切な人と過ごす時間に、何かを達成することとは別の喜びを感じる。",
    "factor": "experiential"
  },
  {
    "id": 7,
    "text": "思いどおりにならないときも、どのように応じるかを考えることに意味を感じる。",
    "factor": "attitudinal"
  },
  {
    "id": 8,
    "text": "周囲の期待を知ったうえで、自分が納得できる選択を探す。",
    "factor": "autonomy"
  },
  {
    "id": 9,
    "text": "日々の小さな仕事や役割を果たすことに、意味を感じる。",
    "factor": "creative"
  },
  {
    "id": 10,
    "text": "音楽や物語に触れて、日々の見え方が変わることがある。",
    "factor": "experiential"
  },
  {
    "id": 11,
    "text": "変えられることと、いまは変えられないことを分けて考えようとする。",
    "factor": "attitudinal"
  },
  {
    "id": 12,
    "text": "他者からの評価だけでなく、自分で納得できるかも判断の基準にする。",
    "factor": "autonomy"
  },
  {
    "id": 13,
    "text": "身近な困りごとに工夫を加えることに、やりがいを感じる。",
    "factor": "creative"
  },
  {
    "id": 14,
    "text": "成果として残らなくても、心に残る体験には価値があると感じる。",
    "factor": "experiential"
  },
  {
    "id": 15,
    "text": "失敗のあと、結果とは別に、自分がどう向き合ったかを振り返る。",
    "factor": "attitudinal"
  },
  {
    "id": 16,
    "text": "人に相談したあとも、最後は自分が大切にしたいことを確かめる。",
    "factor": "autonomy"
  },
  {
    "id": 17,
    "text": "誰かに何かを届けたり、手助けをしたりすることが、日々の張り合いになる。",
    "factor": "creative"
  },
  {
    "id": 18,
    "text": "光や音、季節の変化など、日常の小さな発見に心が満たされる。",
    "factor": "experiential"
  },
  {
    "id": 19,
    "text": "難しい状況で、休むことや助けを求めることも、自分の向き合い方として選びたい。",
    "factor": "attitudinal"
  },
  {
    "id": 20,
    "text": "周囲と意見が違うとき、自分がそう考える理由を言葉にしようとする。",
    "factor": "autonomy"
  }
];

export const ANSWER_OPTIONS: { label: string; value: AnswerValue }[] = [
  { label: "まったく当てはまらない", value: 1 },
  { label: "あまり当てはまらない", value: 2 },
  { label: "どちらともいえない", value: 3 },
  { label: "やや当てはまる", value: 4 },
  { label: "とても当てはまる", value: 5 },
];

export const PERSONALITY_TYPES: Record<PersonalityTypeId, PersonalityType> = {
  "solitary-architect": {
    "id": "solitary-architect",
    "name": "孤高の設計者型",
    "nameEn": "Solitary Architect",
    "tagline": "制約のなかにも、形にできることを探す。",
    "strengths": "今回の回答では、行為を通して意味をつくることと、変えられない状況への向き合い方が、ともに前に出ています。条件を見直しながら、いまできる一歩を形にすることが手がかりになりそうです。",
    "crisis": "もし「自分が何とかしなければ」と抱え込む場面があれば、工夫で変えられることと、人に頼めることを分けてみてください。この結果だけで、孤独を好むかどうかは分かりません。",
    "prescription": "いま気になっている課題を一つ選び、「変えられる条件」「相談したいこと」「10分でできる一歩」を一つずつ書いてみましょう。"
  },
  "introspective-thinker": {
    "id": "introspective-thinker",
    "name": "内省的思索型",
    "nameEn": "Introspective Contemplative",
    "tagline": "経験を味わい、自分なりの向き合い方を探す。",
    "strengths": "今回の回答では、出会いや体験を受け取ることと、状況への向き合い方に意味を見いだす傾向が並んでいます。心に残った経験を振り返ることが、自分の大切にしたいものを知る入口になりそうです。",
    "crisis": "考え続けることが負担になる日には、答えを急いで出す必要はありません。このタイプだから行動が苦手、という意味ではありません。",
    "prescription": "最近心に残った出来事について、「何を感じたか」「何を大切にしたいか」を一文ずつ書き、できそうなら一つだけ行動に移してみましょう。"
  },
  "autonomous-creator": {
    "id": "autonomous-creator",
    "name": "自律的創造者型",
    "nameEn": "Autonomous Creator",
    "tagline": "自分の納得を、日々の行為に込める。",
    "strengths": "今回の回答では、取り組むことへの充実と、自分の基準で選ぶことが、ともに前に出ています。何を大切にして取り組むかを言葉にすると、次の行動を考えやすくなりそうです。",
    "crisis": "自分の納得と、相手に必要なものが違う場面もあります。もし行き詰まったら、自分の意図を保ちながら相手の希望も確かめてみてください。",
    "prescription": "小さな取り組みを一つ選び、「自分が大切にしたいこと」と「届ける相手が必要とすること」を一つずつ書いてみましょう。"
  },
  "aesthetic-practitioner": {
    "id": "aesthetic-practitioner",
    "name": "感性的実践家型",
    "nameEn": "Aesthetic Practitioner",
    "tagline": "受け取ったものを、小さな形にして返す。",
    "strengths": "今回の回答では、体験を味わうことと、行為を通して意味を感じることが並んでいます。心に残ったことを、言葉や工夫、誰かへの手助けに結びつける楽しさが手がかりになりそうです。",
    "crisis": "好きな体験をすべて成果にしようとすると、味わう時間が忙しくなることもあります。何も形にせず楽しむ日があっても構いません。",
    "prescription": "今日よかったと感じたものを一つ選び、一文のメモや小さな工夫にしてみましょう。形にせず、そのまま味わう選択も残してください。"
  },
  "solitary-witness": {
    "id": "solitary-witness",
    "name": "孤高の感受者型",
    "nameEn": "Solitary Witness",
    "tagline": "自分の心に残るものを、大切にする。",
    "strengths": "今回の回答では、出会いや体験の価値と、自分の納得を大切にする傾向が並んでいます。周囲の評判とは別に、何が自分の心に残るかを確かめることが手がかりになりそうです。",
    "crisis": "この結果は、一人で過ごすことを好むという判定ではありません。人と感じ方が違っても、どちらかの価値を下げる必要はありません。",
    "prescription": "最近心に残ったものを一つ、「自分はどこに惹かれたか」と一緒に書いてみましょう。共有したければ、身近な人にも聞いてみてください。"
  },
  "existential-resolve": {
    "id": "existential-resolve",
    "name": "実存的覚悟型",
    "nameEn": "Existential Resolve",
    "tagline": "選べない状況でも、大切にしたいことを確かめる。",
    "strengths": "今回の回答では、状況への向き合い方と、自分で納得して選ぶことが並んでいます。制約があるときに、いま残されている選択を確かめることが手がかりになりそうです。",
    "crisis": "向き合うことは、負担を一人で引き受けることではありません。変えられる状況から離れることや、支援を求めることも選択肢に含めてください。",
    "prescription": "困りごとを一つ、「自分で変えられること」「助けを借りたいこと」「今日は保留すること」に分けてみましょう。"
  },
  "creative-realizer": {
    "id": "creative-realizer",
    "name": "創造的実現者型",
    "nameEn": "Creative Realizer",
    "tagline": "日々の行為に、意味を見つける。",
    "strengths": "今回の回答では、仕事や工夫、手助けなど、行為を通して意味を感じる項目が比較的前に出ています。大きな成果だけでなく、身近な役割も振り返る手がかりになりそうです。",
    "crisis": "もし成果だけで一日を評価していると感じたら、休息や人との時間にも目を向けてみてください。この結果は、生産性や創造力の高さを示すものではありません。",
    "prescription": "今日取り組んだ小さなことを一つ書き、「誰にとって、どんな意味があったか」を考えてみましょう。思い浮かばない日は、明日試したいことでも構いません。"
  },
  "world-receiver": {
    "id": "world-receiver",
    "name": "世界受容者型",
    "nameEn": "World Receiver",
    "tagline": "出会いや体験のなかに、意味を見つける。",
    "strengths": "今回の回答では、人や自然、芸術との出会いに価値を感じる項目が比較的前に出ています。何かを達成した時間だけでなく、心に残った時間も日々を支える手がかりになりそうです。",
    "crisis": "体験の感じ方は、その日の余裕や環境にも左右されます。心が動かない日を、自分らしさを失った証拠にする必要はありません。",
    "prescription": "最近心に残った会話、景色、作品を一つ思い出し、「何がよかったか」を一文にしてみましょう。新しい体験を無理に増やす必要はありません。"
  },
  "fate-dialogist": {
    "id": "fate-dialogist",
    "name": "運命対話者型",
    "nameEn": "Dialogue with Fate",
    "tagline": "状況への応答に、自分なりの意味を見つける。",
    "strengths": "今回の回答では、思いどおりにならない状況への向き合い方を考える項目が比較的前に出ています。結果だけではなく、どう応じたいかを確かめることが手がかりになりそうです。",
    "crisis": "苦しむこと自体が目標になるわけではありません。変えられる負担は減らしてよく、つらい経験に意味を見つけられなくても、自分を責める必要はありません。",
    "prescription": "いまの状況について「減らせる負担」を一つ探してください。そのうえで余裕があれば、今日大切にしたい向き合い方を一文にしてみましょう。"
  },
  "self-contained": {
    "id": "self-contained",
    "name": "自己完結者型",
    "nameEn": "Self-Contained",
    "tagline": "人の声も聞きながら、自分の納得を確かめる。",
    "strengths": "今回の回答では、自分の価値観を選択に反映する項目が比較的前に出ています。周囲の意見と自分の希望を分けて書くことが、判断の手がかりになりそうです。",
    "crisis": "自分で選ぶことと、他者から学ぶことは両立します。この結果は、一人ですべて決められる能力や、他者を必要としない性格を示すものではありません。",
    "prescription": "迷っていることを一つ選び、「自分の希望」「他者から得た情報」「まだ分からないこと」を書いてみましょう。必要なら、そのメモを持って相談してみてください。"
  },
  "integrated-existence": {
    "id": "integrated-existence",
    "name": "統合的実存型",
    "nameEn": "Integrated Existence",
    "tagline": "いくつもの入口から、日々の意味を見つめる。",
    "strengths": "今回の回答では、4因子すべてで当てはまりが高めでした。行為、体験、向き合い方、自分の選択など、複数の観点から経験を振り返れそうです。実際の能力や、ほかのタイプより優れていることを示す結果ではありません。",
    "crisis": "すべての観点をいつも満たす必要はありません。幅広く当てはまる回答が、実際に場面ごとにどう表れるかを確かめてみてください。",
    "prescription": "最近充実した出来事を一つ選び、4つの観点のどれが関わっていたかを書いてみましょう。複数選んでも構いません。"
  },
  "balanced-observer": {
    "id": "balanced-observer",
    "name": "均衡的観察者型",
    "nameEn": "Equanimous Observer",
    "tagline": "一つに決めず、いくつかの入口を見比べる。",
    "strengths": "今回の回答では、一つの因子だけに絞りにくい配置になりました。4因子が近い場合も、上位の複数因子が並ぶ場合もあります。情熱の有無や優柔不断さを示す結果ではありません。",
    "crisis": "中間の回答には、場面による違いや判断の難しさも含まれます。タイプ名に自分を合わせず、各因子の数字と具体的な経験を照らし合わせてください。",
    "prescription": "最近よかった出来事を二つ挙げ、それぞれで大切だったことを書いてみましょう。違う観点が出てきても、どちらも残して構いません。"
  },
  "meaning-seeker": {
    "id": "meaning-seeker",
    "name": "意味探求途上型",
    "nameEn": "Seeker of Meaning",
    "tagline": "いまの言葉に収まらない、大切なものを探す。",
    "strengths": "今回の質問では、4因子への当てはまりが全体に控えめでした。この質問では捉えきれない価値観や、答えにくい状況も考えられます。意味や意欲がないという判定ではありません。",
    "crisis": "低い点数を上げることを目標にする必要はありません。質問の言葉が合わなかったのか、最近そうした機会が少なかったのか、自分の実感を優先してください。",
    "prescription": "4因子はいったん置いて、最近「少しほっとしたこと」「大切にしておきたいこと」を一つだけ書いてみましょう。思い浮かばなければ、今日は保留でも構いません。"
  }
};

const PAIR_TO_TYPE: Record<string, PersonalityTypeId> = {
  "attitudinal:creative": "solitary-architect",
  "attitudinal:experiential": "introspective-thinker",
  "autonomy:creative": "autonomous-creator",
  "creative:experiential": "aesthetic-practitioner",
  "autonomy:experiential": "solitary-witness",
  "attitudinal:autonomy": "existential-resolve",
};

const DOMINANT_TO_TYPE: Record<Factor, PersonalityTypeId> = {
  creative: "creative-realizer",
  experiential: "world-receiver",
  attitudinal: "fate-dialogist",
  autonomy: "self-contained",
};

export function calculateScores(
  answers: AnswerValue[]
): Record<Factor, number> {
  const scores: Record<Factor, number> = {
    creative: 0,
    experiential: 0,
    attitudinal: 0,
    autonomy: 0,
  };

  QUESTIONS.forEach((question, index) => {
    scores[question.factor] += answers[index] ?? 0;
  });

  return scores;
}

export function toPercentile(score: number): number {
  const ratio =
    (score - MIN_SCORE_PER_FACTOR) /
    (MAX_SCORE_PER_FACTOR - MIN_SCORE_PER_FACTOR);
  return Math.round(Math.min(100, Math.max(0, ratio * 100)));
}

export function calculatePercentiles(
  scores: Record<Factor, number>
): Record<Factor, number> {
  return {
    creative: toPercentile(scores.creative),
    experiential: toPercentile(scores.experiential),
    attitudinal: toPercentile(scores.attitudinal),
    autonomy: toPercentile(scores.autonomy),
  };
}

function pairKey(a: Factor, b: Factor): string {
  return [a, b].sort().join(":");
}

export function determineType(
  percentiles: Record<Factor, number>
): PersonalityType {
  const ranked = FACTOR_ORDER.map((factor) => ({
    factor,
    percentile: percentiles[factor],
  })).sort((a, b) => b.percentile - a.percentile);

  const mean =
    ranked.reduce((sum, item) => sum + item.percentile, 0) / ranked.length;
  const range = ranked[0].percentile - ranked[ranked.length - 1].percentile;
  const top = ranked[0];
  const closeCount = ranked.filter(
    (item) => top.percentile - item.percentile <= 12
  ).length;

  if (top.percentile <= 34) return PERSONALITY_TYPES["meaning-seeker"];

  if (range <= 15) {
    if (ranked.every((item) => item.percentile >= 65)) return PERSONALITY_TYPES["integrated-existence"];
    if (mean <= 48) return PERSONALITY_TYPES["meaning-seeker"];
    return PERSONALITY_TYPES["balanced-observer"];
  }

  if (closeCount >= 3) {
    return PERSONALITY_TYPES["balanced-observer"];
  }

  if (closeCount >= 2 && ranked[1].percentile >= 55) {
    const typeId = PAIR_TO_TYPE[pairKey(ranked[0].factor, ranked[1].factor)];
    if (typeId) return PERSONALITY_TYPES[typeId];
  }

  if (closeCount >= 2) return PERSONALITY_TYPES["balanced-observer"];

  return PERSONALITY_TYPES[DOMINANT_TO_TYPE[top.factor]];
}

export function diagnose(answers: AnswerValue[]): DiagnosisResult {
  const scores = calculateScores(answers);
  const percentiles = calculatePercentiles(scores);

  return {
    scores,
    percentiles,
    maxScore: MAX_SCORE_PER_FACTOR,
    minScore: MIN_SCORE_PER_FACTOR,
    type: determineType(percentiles),
  };
}

export const PERSONALITY_TYPE_IDS = Object.keys(
  PERSONALITY_TYPES,
) as PersonalityTypeId[];

export function isPersonalityTypeId(
  value: string | null | undefined,
): value is PersonalityTypeId {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(PERSONALITY_TYPES, value)
  );
}

export function getPersonalityType(id: PersonalityTypeId): PersonalityType {
  return PERSONALITY_TYPES[id];
}

export function isValidFactorScore(value: number): boolean {
  return (
    Number.isInteger(value) &&
    value >= MIN_SCORE_PER_FACTOR &&
    value <= MAX_SCORE_PER_FACTOR
  );
}

export function diagnoseFromScores(
  scores: Record<Factor, number>,
  typeId?: string | null,
): DiagnosisResult | null {
  if (!FACTOR_ORDER.every((factor) => isValidFactorScore(scores[factor]))) {
    return null;
  }

  const percentiles = calculatePercentiles(scores);
  const type = isPersonalityTypeId(typeId)
    ? PERSONALITY_TYPES[typeId]
    : determineType(percentiles);

  return {
    scores,
    percentiles,
    maxScore: MAX_SCORE_PER_FACTOR,
    minScore: MIN_SCORE_PER_FACTOR,
    type,
  };
}
