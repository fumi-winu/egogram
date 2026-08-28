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
  creative: {
    id: "creative",
    name: "創造価値",
    nameEn: "Creative Value",
    shortLabel: "創造",
    color: "var(--factor-creative)",
    description:
      "仕事、作品、事業、役割、日々の工夫まで、「まだ存在しないものを世界に置く」ことで意味を実現しようとする動機です。フランクルはこれを創造価値と呼び、成果の多寡ではなく、行為を通じて実存が立つ通路だとしました。手を動かし、形を与え、痕跡を残そうとする意志の強さを測ります。",
    highScore:
      "高いほど、構想し、作り、世界に新しい事実を置くことに強い実存的充足を感じます。何も生み出していない時間は空白として体験されやすく、制作や実践が自己の輪郭を保つ柱になっています。",
    midScore:
      "中程度の場合、創造は人生の主旋律というより、必要なときに立ち上がる通路です。状況が求めれば形を与えられますが、生み出すことだけに自己を還元してはいません。",
    lowScore:
      "低めの場合、意味の重心は創ることより、受け取る・耐える・自らを保つ側にあります。生み出せない時期を失敗と見なしすぎないことが、この配置ではかえって誠実です。",
  },
  experiential: {
    id: "experiential",
    name: "体験価値",
    nameEn: "Experiential Value",
    shortLabel: "体験",
    color: "var(--factor-experiential)",
    description:
      "愛、芸術、自然、他者との出会いなど、世界を深く受容し味わうことで意味が満ちる通路です。体験価値は消費ではなく感受であり、「与える」以前に「受け取る」誠実さを問います。世界の細部に意識が向くとき、生きているという事実そのものが根拠になります。",
    highScore:
      "高いほど、出会いと感受そのものが意味です。接触が薄いと実存の実感が急速に薄れ、世界を受け取ることのうちに生きている感覚が宿ります。",
    midScore:
      "中程度の場合、体験は重要な水源ですが、唯一の根拠ではありません。味わうことと、行為や態度が交互に意味を支えています。",
    lowScore:
      "低めの場合、体験の深化より、創出・態度・自律といった別の通路で意味を支えやすい傾向です。感受の薄さを欠点とせず、別の通路の強さとして読めます。",
  },
  attitudinal: {
    id: "attitudinal",
    name: "態度価値",
    nameEn: "Attitudinal Value",
    shortLabel: "態度",
    color: "var(--factor-attitudinal)",
    description:
      "病、喪失、制約など、変えられない運命にどのような姿勢で応答するかという、フランクルが最も根源的とした価値です。状況を選べなくても、応答の仕方は選べる——その最後の自由が、態度価値の核です。苦難を美化することではなく、不条理のなかで人間であり続ける意志を測ります。",
    highScore:
      "高いほど、変えられない状況のなかでも応答の仕方を選ぶこと自体に意味の核を置きます。苦境が自己理解の現場になりやすく、姿勢を失わないことに実存の誇りがあります。",
    midScore:
      "中程度の場合、態度は必要なときに立ち上がる備えです。日常は別の通路で意味を支え、限界状況でこの価値が前面に出ます。",
    lowScore:
      "低めの場合、運命への内的応答より、創出や体験、自己基準の確立のほうに動機が傾きます。平穏な時期の空虚を「覚悟不足」と責める必要はありません。",
  },
  autonomy: {
    id: "autonomy",
    name: "実存的自律",
    nameEn: "Existential Autonomy",
    shortLabel: "自律",
    color: "var(--factor-autonomy)",
    description:
      "意味の法廷を外（評価、役割、空気）に置くか、内に置くかを測る軸です。フランクルの三価値に加えた第四の通路であり、承認の有無にかかわらず、自ら引き受けた基準で決断を完結できるかを問います。孤立の賛美ではなく、関係のなかで基準を失わない能力です。",
    highScore:
      "高いほど、承認の有無にかかわらず、自ら引き受けた基準で生きることに安定を感じます。外部の評価は情報になっても判決にはなりにくい配置です。",
    midScore:
      "中程度の場合、内的基準と世界からの応答を両立させようとします。完結しすぎず、依存しすぎない位置に動機があります。",
    lowScore:
      "低めの場合、内的な完結より、世界との交感や行為の成果、関係のなかで意味を確かめやすい傾向です。他者の声を手がかりにできることは、欠陥ではなく通路です。",
  },
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
    id: 1,
    text: "まだ誰も形にしていないものを、自分の手で生み出したくなる。",
    factor: "creative",
  },
  {
    id: 2,
    text: "美しい風景や芸術に触れたとき、言葉にできないほどの充足を覚える。",
    factor: "experiential",
  },
  {
    id: 3,
    text: "避けられない苦しみのただなかでも、自分の姿勢だけは選べると感じる。",
    factor: "attitudinal",
  },
  {
    id: 4,
    text: "周囲の評価が低くても、自分の基準で決断を完結できる。",
    factor: "autonomy",
  },
  {
    id: 5,
    text: "考えているだけでは物足りず、実際に手を動かして実現したくなる。",
    factor: "creative",
  },
  {
    id: 6,
    text: "他者の存在そのものを、深く味わうように受け取ることがある。",
    factor: "experiential",
  },
  {
    id: 7,
    text: "理不尽な状況でも、それにどう向き合うかで人生の意味は変わると考える。",
    factor: "attitudinal",
  },
  {
    id: 8,
    text: "他人の期待より、自分が本当に引き受けたいかを優先する。",
    factor: "autonomy",
  },
  {
    id: 9,
    text: "自分の仕事や活動が、世界に何かを残していると感じたい。",
    factor: "creative",
  },
  {
    id: 10,
    text: "自然や音楽に没入しているとき、生きている実感が強まる。",
    factor: "experiential",
  },
  {
    id: 11,
    text: "変えられない運命を、恨みではなく引き受けようとする。",
    factor: "attitudinal",
  },
  {
    id: 12,
    text: "認められなくても、自分の選択に対する納得は揺らぎにくい。",
    factor: "autonomy",
  },
  {
    id: 13,
    text: "新しい仕組みや表現を考案することに、強い充実を覚える。",
    factor: "creative",
  },
  {
    id: 14,
    text: "何かを成し遂げることより、出会いと体験そのものに意味を見出す。",
    factor: "experiential",
  },
  {
    id: 15,
    text: "失敗や喪失のあとでも、なお自分の態度に責任を持てると感じる。",
    factor: "attitudinal",
  },
  {
    id: 16,
    text: "「正しいとされること」より、「自分が引き受けること」を軸にする。",
    factor: "autonomy",
  },
  {
    id: 17,
    text: "何も生み出していない時間が続くと、自分の存在が薄くなる気がする。",
    factor: "creative",
  },
  {
    id: 18,
    text: "世界の細部（光、気配、声）に意識が向き、心が満たされることがある。",
    factor: "experiential",
  },
  {
    id: 19,
    text: "苦しい状況でも、「それでも意味はある」と自分に問いかけられる。",
    factor: "attitudinal",
  },
  {
    id: 20,
    text: "孤立しても、自分の内的な基準で生きていける自信がある。",
    factor: "autonomy",
  },
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
    id: "solitary-architect",
    name: "孤高の設計者型",
    nameEn: "Solitary Architect",
    tagline: "苦難のなかで、なお形を与えようとする。",
    strengths:
      "あなたは所与の条件を、そのまま運命として飲み込むことを拒みます。制約のなかに構造を見出し、避けられない運命に対しても内側から意味の骨格を組み直そうとする。創造は自己顕示ではなく、実存を崩壊させないための建築です。他者の共感より、自ら引き受けた形が残ることを重視し、孤独を欠落ではなく作業条件へ変換できる強さがあります。混乱した状況でこそ、設計図を描く冷静さが前面に出ます。",
    crisis:
      "孤独が美化されると、助けを求めることが設計の不純に見えてしまいます。成果が出ない時期には、建築し続けなければ自己が崩れるという強迫が虚無感を呼びやすい。他者を設計対象として扱い、共感より構造を優先しすぎると関係が冷え、バーンアウトは「休めない設計者」の形をとります。未完のまま差し出せないことが、完成への無限延期になります。",
    prescription:
      "未完のまま世界に差し出す練習をしてください。休息を怠惰ではなく「次の設計図のための沈黙」と再定義すること。一人で引き受けすぎる負荷を、信頼できる他者に部分的に預けることが、建築の耐久性を高めます。完璧な構造より、人が住める余白を残すことが、このタイプの成熟です。",
  },
  "introspective-thinker": {
    id: "introspective-thinker",
    name: "内省的思索型",
    nameEn: "Introspective Contemplative",
    tagline: "味わうことと、引き受けることのあいだに立つ。",
    strengths:
      "あなたは行為の成果より、経験の質と態度の誠実さに意味を置きます。世界を深く受容する感受性と、変えられないものへの内的応答が結びつき、静かな思索として人生を編む。表面的な達成より、苦しみを含んだ現実をどのように見るかが中心問題であり、急いで答えを出すより、問いとともに居続けること自体がすでに実存的な行為です。深い理解と、焦らない時間感覚が強みです。",
    crisis:
      "思索が行動を先送りし、現実との接点が細くなると虚無感が訪れます。苦しみを「見る」ことに慣れすぎて、変えてよい条件まで運命として引き受けてしまうことがあります。内省が自己処罰に転じ、バーンアウトは静かな消耗——何もしていないのに疲れている——という形をとりやすい。他者から見ると動かない人と誤解され、孤立が深まります。",
    prescription:
      "小さな行為を、思索の延長として置いてください。理解したことを一回だけ世界に返す実験です。助けを求めることは思索の敗北ではなく、体験価値と態度価値を接続する実践です。期限を区切った「未完の提出」が、このタイプを虚無から守ります。",
  },
  "autonomous-creator": {
    id: "autonomous-creator",
    name: "自律的創造者型",
    nameEn: "Autonomous Creator",
    tagline: "評価を待たず、生み出すこと自体で完結する。",
    strengths:
      "あなたの創造衝動は、承認の回路をほとんど必要としません。作ること、始めること、世界に痕跡を残すことがすでに意味の充足です。他者の尺度が揺らいでも、制作の現場で自己が立ち、孤独は欠落ではなく創造が純粋であるための条件になりやすい。外部評価に振り回されず、着手できることが最大の強みです。",
    crisis:
      "完結が強すぎると、世界からの予期せぬ呼びかけをノイズとして切り捨てます。見せないことが純粋さの証明になり、関係が細る。成果が出ない空白は虚無として体験され、バーンアウトは「誰にも見られずに作り続ける」過労の形をとります。差し出せなさは、やがて創造そのものの動機を枯らします。",
    prescription:
      "生み出したものを、あえて一人の他者に差し出す実験をしてください。評価を求めるのではなく、世界に返すことです。休む日を制作の一部としてカレンダーに置くこと。完結の自由を守りつつ、応答の自由を第二段階として育てることが処方箋です。",
  },
  "aesthetic-practitioner": {
    id: "aesthetic-practitioner",
    name: "感性的実践家型",
    nameEn: "Aesthetic Practitioner",
    tagline: "世界を味わいながら、それを形にする。",
    strengths:
      "受容と創出が近い距離にあります。美しいもの、他者、自然との接触がエネルギーとなり、そこから行為が立ち上がる。体験は消費ではなく創造の源泉であり、感受が行動を潤します。世界を味わいながら形にできることは、創造価値と体験価値を橋渡しする稀有な構えです。",
    crisis:
      "感受性が鈍ると行動も枯れます。成果だけを追う時期は意味の水源を干上がらせ、刺激を求めて体験を消費に変える危険があります。忙しさのなかで「味わう暇がない」が常態化すると虚無感が来やすい。バーンアウトは、感じられなくなったあとも作り続ける形をとります。",
    prescription:
      "成果の指標とは別に、感受の衛生を習慣にしてください。短い散歩、音楽、対話など、水源を守る行為です。作る前に受け取る時間を意図的に置くこと。枯れた感受のまま量産しないことが、このタイプの耐久性を決めます。",
  },
  "solitary-witness": {
    id: "solitary-witness",
    name: "孤高の感受者型",
    nameEn: "Solitary Witness",
    tagline: "誰の基準にも回収されないまなざしで、世界を受け取る。",
    strengths:
      "あなたは体験の深さを、集団の評価や流行に委ねません。芸術、自然、他者との出会いを自分の内的な尺度で完結させ、共有されない体験でも価値が減じないことが実存的自律の核です。流行に回収されないまなざしは、世界の細部を救い出す力になります。",
    crisis:
      "意味が私的に閉じすぎると、世界との橋が細くなります。誰にも渡さない感受は純粋ですが、孤独が実存の唯一の家になると虚無が訪れやすい。助けを求めることは感受の汚染に見え、バーンアウトは静かな引きこもりとして進行します。",
    prescription:
      "感受を守りつつ、あえて一小片だけ差し出す練習をしてください。日記でも、一人の友人でもよい。共有は価値の減算ではなく、体験が世界に根を持つことです。内的尺度を捨てる必要はなく、橋を一本足すだけで危機は和らぎます。",
  },
  "existential-resolve": {
    id: "existential-resolve",
    name: "実存的覚悟型",
    nameEn: "Existential Resolve",
    tagline: "変えられないものを、自分の態度で引き受ける。",
    strengths:
      "あなたは自由を「何でも選べること」ではなく、「選べない状況での姿勢」として理解しています。外部の称賛がなくても、運命に対する内的な応答で自己を立てる。この覚悟は、成功指標では測れない強度を持ち、限界状況でこそ人間の尊厳を守ります。",
    crisis:
      "引き受けることが孤立の美化になり、助けを求めることを遅らせます。苦境がアイデンティティになりすぎると、平穏な時期に空虚を感じ、バーンアウトは「耐えている自分」をやめられない形をとります。変えられる条件まで運命として抱え込むと、態度価値が自己搾取に転じます。",
    prescription:
      "引き受けることと、一人で抱えることを分けてください。態度の自由は関係のなかでこそ試されます。平穏な日に、創造や体験の小さな通路を開くこと。耐える自己を唯一の物語にしないことが、このタイプの処方箋です。",
  },
  "creative-realizer": {
    id: "creative-realizer",
    name: "創造的実現者型",
    nameEn: "Creative Realizer",
    tagline: "意味は、まだ存在しないものを形にしたときに現れる。",
    strengths:
      "動機の重心は明らかに創造価値にあります。考え、感じ、耐えることより、まず手を動かし、世界に新しい事実を置くことで安心する。着手の早さと、形にする執念が強みです。まだ存在しないものに名前を与えられる人です。",
    crisis:
      "何も生み出していない時間は空虚として体験されやすく、休息が罪悪になります。産出し続けなければ存在が薄れる感覚は、典型的な実存的虚無と創造的バーンアウトです。受容や態度の通路が未使用のまま残り、行き詰まったときに逃げ場がありません。",
    prescription:
      "生み出さない時間を「空白」ではなく「次の形のための沈黙」と見なしてください。体験価値（感受）と態度価値（限界の引き受け）を、創造の持続装置として週に一度でも使うこと。量より、一つの形を最後まで届けることが成熟です。",
  },
  "world-receiver": {
    id: "world-receiver",
    name: "世界受容者型",
    nameEn: "World Receiver",
    tagline: "生きているという事実を、感覚を通して確かめる。",
    strengths:
      "意味を、達成の向こう側より、いま触れている世界の側に見出します。他者、芸術、自然との接触が実存の実感を支え、受け取ることの誠実さが倫理になっている。与えることや耐えることより先に、世界を味わえることは、フランクルの体験価値そのものです。",
    crisis:
      "接触が薄いと実存の実感が急速に薄れます。受容に偏ると運命への態度や自律が後回しになり、状況に飲み込まれやすい。刺激が途切れたときの空虚、関係への過度の依存、バーンアウトは「感じ続けること」の過労として現れます。",
    prescription:
      "味わったものを、どのように引き受けるかを次の問いにしてください。小さな創造（形にして返す）と、変えられないことへの態度を一回ずつ試す。感受の水源を守りつつ、受け取るだけで終わらせないことが処方箋です。",
  },
  "fate-dialogist": {
    id: "fate-dialogist",
    name: "運命対話者型",
    nameEn: "Dialogue with Fate",
    tagline: "不条理のただなかで、なお応答する。",
    strengths:
      "フランクルが最も根源的とした態度価値が中心にあります。変えられない痛みや制約のなかで、どのような人間であるかを選び直すこと自体が意味の源泉です。外側の成功指標では測れない強度を持ち、不条理との対話を諦めないことが強みです。",
    crisis:
      "苦境がアイデンティティになりすぎると、平穏な時期に空虚を感じます。「対話する相手」としての運命がいないと、実存が手持ち無沙汰になる。バーンアウトは、苦しみを物語の中心にし続けなければ自己が色褪せる形です。創造や体験が未開発のまま残りやすい。",
    prescription:
      "対話を運命とのあいだだけで完結させないでください。平穏のなかで何を創り、何を味わうかという問いへ開くこと。苦しみを唯一の意味の現場にしない。助けと喜びを、態度価値を汚すものではなく、対話の別の相手として招くことが処方箋です。",
  },
  "self-contained": {
    id: "self-contained",
    name: "自己完結者型",
    nameEn: "Self-Contained",
    tagline: "意味の法廷を、自分の内側に置いている。",
    strengths:
      "実存的自律が突出しています。外部の評価を情報としては受け取っても、判決としては受け取らない。これは自由の条件であり、流行や空気に自己を売却しない強さです。自ら引き受けた基準で決断を完結できることが、このタイプの核です。",
    crisis:
      "他者からの呼びかけをノイズとして切りすぎると、橋が消えます。完結が孤立の別名になり、助言も愛情も侵入に感じられる。虚無は「誰の声も必要ない」が「誰の声も届かない」に反転したときに来ます。バーンアウトは、一人で基準を守り続ける疲労です。",
    prescription:
      "完結を守ることと、世界に応答することは対立ではなく二段階の自由です。一人を選んで、基準を捨てずに相談する練習をしてください。評価を判決にしないまま、情報として世界を使うこと。自律は関係のなかで基準を失わない能力として成熟します。",
  },
  "integrated-existence": {
    id: "integrated-existence",
    name: "統合的実存型",
    nameEn: "Integrated Existence",
    tagline: "創り、味わい、引き受け、自ら立つ。",
    strengths:
      "四つの動機が拮抗せず、互いに支え合っています。一つの価値に自己を還元せず、状況に応じて創造・体験・態度・自律を使い分けられる。フランクルの言う「意味への意志」が特定の通路に固定されていない状態であり、柔軟さが強みです。必要なときに一つの動機へ深く沈むこともできます。",
    crisis:
      "課題は「どれもそこそこ」で終わらせ、決断を避けることです。統合が平均化になると、どれにも深くコミットできず、実存が器用な観察に薄まります。虚無は、全部できるのにどれも切実でない、という形で訪れます。バーンアウトは、すべての通路を同時に満たそうとする過労です。",
    prescription:
      "いま最も誠実な通路を一つ選び、期間を区切って深く沈んでください。統合は平均ではなく、使い分けです。選ばなかった通路を「捨てた」のではなく「待機」と名づけること。柔軟さを、優柔不断の別名にしないことが処方箋です。",
  },
  "balanced-observer": {
    id: "balanced-observer",
    name: "均衡的観察者型",
    nameEn: "Equanimous Observer",
    tagline: "偏りなく見つめ、どれか一つに身を預けすぎない。",
    strengths:
      "創造も体験も態度も自律も、極端な偏りなく存在します。突出した情熱はないが、一つの動機に自己を同化させすぎない冷静さがある。意味は「どれか一つの高峰」ではなく、バランスそのものに感じられる。観察の位置から全体を見渡せることは、賢明さでもあります。",
    crisis:
      "均衡が防衛になると、どれにも深くコミットできず、実存が観察の位置に留まります。情熱の欠如が自己否定になり、虚無は「どれもそこそこ」の平板さとして来ます。バーンアウトは少ないかわりに、生が始まらない倦怠が慢性化しやすい。",
    prescription:
      "どこか一つを、期間を区切って生きてみてください。偏りは失敗ではなく、実験です。観察をやめなくてよい。ただし観察のまま人生を済ませないこと。小さな賭けが、このタイプの突破口になります。",
  },
  "meaning-seeker": {
    id: "meaning-seeker",
    name: "意味探求途上型",
    nameEn: "Seeker of Meaning",
    tagline: "輪郭はまだ定まらず、問いそのものが生きている。",
    strengths:
      "四つの動機がいずれも突出していないのは、欠落というより、意味の通路がまだ一つに収束していないしるしです。いまは成果、体験、忍耐、自律のどれを軸にしても十分にはしっくり来ないかもしれない。フランクルは意味を「見つけるもの」であり「捏造するもの」ではないとしました。急いで類型に収まらず、問いを生きていられることが、すでに実存的な強みです。",
    crisis:
      "輪郭のなさは不安を呼び、「自分には動機がない」と虚無に読み替えられやすい。他人の類型を借りて自己を捏造したくなる。何も選べない倦怠が、探求ではなく停止になることがあります。バーンアウトは、自分探しを仕事のように追い続ける消耗です。",
    prescription:
      "小さな行為・感受・態度の実験を続けてください。類型に収まることより、今週一つの通路を試すことです。意味は机上で完成させず、生きた痕跡から後から輪郭が現れます。探求途上であることを欠陥ではなく、いまの正直な位置として引き受けてください。",
  },
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

  if (range <= 15) {
    if (mean >= 68) return PERSONALITY_TYPES["integrated-existence"];
    if (mean <= 48) return PERSONALITY_TYPES["meaning-seeker"];
    return PERSONALITY_TYPES["balanced-observer"];
  }

  if (closeCount >= 3 && top.percentile >= 60) {
    return PERSONALITY_TYPES["integrated-existence"];
  }

  if (closeCount >= 2 && ranked[1].percentile >= 55) {
    const typeId = PAIR_TO_TYPE[pairKey(ranked[0].factor, ranked[1].factor)];
    if (typeId) return PERSONALITY_TYPES[typeId];
  }

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
