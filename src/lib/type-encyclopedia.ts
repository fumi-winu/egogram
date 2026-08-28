import {
  type Factor,
  type PersonalityTypeId,
  FACTOR_INFO,
} from "@/lib/existential";

export interface TypeEncyclopedia {
  focus: Factor[];
  formation: string;
  essay: string;
  related: PersonalityTypeId[];
}

export const TYPE_ENCYCLOPEDIA: Record<PersonalityTypeId, TypeEncyclopedia> = {
  "solitary-architect": {
    focus: ["attitudinal", "creative"],
    formation:
      "態度価値と創造価値が接近して高いとき、制約のなかで形を与える類型として現れます。",
    essay:
      "孤高の設計者型は、運命をただ耐えるのでも、ただ作るのでもなく、避けられない条件そのものを素材にします。フランクルの態度価値が「それでも応答する」自由だとすれば、この類型はその自由を構造へ翻訳する。孤独は欠落ではなく、設計が純度を保つための作業条件です。\n完成を先延ばしにしすぎると、建築は誰も住めない記念碑になります。未完のまま差し出すこと、休息を沈黙として再定義すること、部分を他者に預けることが、この構えの耐久性を決めます。",
    related: ["existential-resolve", "creative-realizer", "autonomous-creator"],
  },
  "introspective-thinker": {
    focus: ["attitudinal", "experiential"],
    formation:
      "態度価値と体験価値がともに前面に出るとき、味わいと引き受けのあいだに立つ類型になります。",
    essay:
      "内省的思索型は、成果の量より、経験の質と姿勢の誠実さに意味を置きます。世界を深く受け取ることと、変えられないものへの内的応答が結びつき、問いとともに居続けること自体がすでに実存的な行為です。\nただし見ることに慣れすぎると、変えてよい条件まで運命として引き受け、思索が行動を無限に延期します。理解したことを一回だけ世界に返す小さな実験が、この類型を虚無から守ります。",
    related: ["fate-dialogist", "world-receiver", "meaning-seeker"],
  },
  "autonomous-creator": {
    focus: ["autonomy", "creative"],
    formation:
      "実存的自律と創造価値が高いとき、評価を待たずに生み出す類型として現れます。",
    essay:
      "自律的創造者型にとって、作ること自体がすでに意味の充足です。承認の回路をほとんど必要とせず、制作の現場で自己が立つ。孤独は欠落ではなく、創造が純粋であるための条件になりやすい。\n完結が強すぎると、世界からの呼びかけをノイズとして切り捨て、差し出せなさが創造そのものを枯らします。一人の他者に返す実験と、休む日を制作の一部に置くことが処方箋です。",
    related: ["creative-realizer", "self-contained", "solitary-architect"],
  },
  "aesthetic-practitioner": {
    focus: ["creative", "experiential"],
    formation:
      "創造価値と体験価値が近い距離にあるとき、味わいながら形にする類型になります。",
    essay:
      "感性的実践家型は、受容と創出が隣り合っています。美しいもの、他者、自然との接触がエネルギーとなり、そこから行為が立ち上がる。体験は消費ではなく創造の源泉です。\n感受が鈍ると行動も枯れます。成果だけを追う時期は水源を干上がらせ、忙しさのなかで味わう暇がなくなると虚無が来やすい。作る前に受け取る時間を守ることが、この類型の耐久性です。",
    related: ["creative-realizer", "world-receiver", "solitary-witness"],
  },
  "solitary-witness": {
    focus: ["autonomy", "experiential"],
    formation:
      "実存的自律と体験価値が高いとき、誰の基準にも回収されないまなざしで世界を受け取る類型になります。",
    essay:
      "孤高の感受者型は、体験の深さを集団の評価や流行に委ねません。共有されない体験でも価値が減じないことが、実存的自律の核です。流行に回収されないまなざしは、世界の細部を救い出す力になります。\n意味が私的に閉じすぎると橋が細くなります。感受を守りつつ一小片だけ差し出すこと——日記でも一人の友人でも——が、体験を世界に根づかせます。",
    related: ["world-receiver", "self-contained", "introspective-thinker"],
  },
  "existential-resolve": {
    focus: ["attitudinal", "autonomy"],
    formation:
      "態度価値と実存的自律が高いとき、変えられないものを自らの態度で引き受ける類型になります。",
    essay:
      "実存的覚悟型は、自由を「何でも選べること」ではなく、「選べない状況での姿勢」として理解しています。外部の称賛がなくても、運命への内的応答で自己を立てる。限界状況でこそ人間の尊厳を守る強度です。\n引き受けることが孤立の美化になると、助けを求めるのが遅れます。苦境がアイデンティティになりすぎると、平穏な日に空虚が来ます。耐える自己を唯一の物語にしないことが成熟です。",
    related: ["fate-dialogist", "self-contained", "solitary-architect"],
  },
  "creative-realizer": {
    focus: ["creative"],
    formation:
      "創造価値が突出して支配的なとき、まだ存在しないものを形にすることに意味の重心が置かれます。",
    essay:
      "創造的実現者型は、考え、感じ、耐えることより、まず手を動かし、世界に新しい事実を置くことで安心します。着手の早さと形にする執念が強みです。\n何も生み出していない時間は空虚になりやすく、休息が罪悪になります。産出し続けなければ存在が薄れる感覚は、典型的な実存的虚無です。生み出さない時間を次の形のための沈黙と見なし、感受と態度の通路を週に一度でも使うことが持続装置になります。",
    related: ["autonomous-creator", "aesthetic-practitioner", "solitary-architect"],
  },
  "world-receiver": {
    focus: ["experiential"],
    formation:
      "体験価値が支配的なとき、生きているという事実を感覚を通して確かめる類型になります。",
    essay:
      "世界受容者型は、意味を達成の向こう側より、いま触れている世界の側に見出します。他者、芸術、自然との接触が実存の実感を支え、受け取ることの誠実さが倫理になっています。\n接触が薄いと実感は急速に薄れます。受容に偏ると運命への態度や自律が後回しになり、状況に飲み込まれやすい。味わったものをどのように引き受けるかを次の問いにし、小さな創造と態度を一回ずつ試すことが処方箋です。",
    related: ["aesthetic-practitioner", "solitary-witness", "meaning-seeker"],
  },
  "fate-dialogist": {
    focus: ["attitudinal"],
    formation:
      "態度価値が突出するとき、不条理のただなかでなお応答する類型として現れます。",
    essay:
      "運命対話者型は、フランクルが最も根源的とした態度価値を中心にしています。変えられない痛みや制約のなかで、どのような人間であるかを選び直すこと自体が意味の源泉です。\n苦境がアイデンティティになりすぎると、平穏な時期に空虚を感じます。対話を運命とのあいだだけで完結させず、平穏のなかで何を創り、何を味わうかという問いへ開くこと。苦しみを唯一の意味の現場にしないことが処方箋です。",
    related: ["existential-resolve", "introspective-thinker", "meaning-seeker"],
  },
  "self-contained": {
    focus: ["autonomy"],
    formation:
      "実存的自律が突出するとき、意味の法廷を内側に置く類型になります。",
    essay:
      "自己完結者型は、外部の評価を情報としては受け取っても、判決としては受け取りません。流行や空気に自己を売却しない強さであり、自ら引き受けた基準で決断を完結できます。\n他者からの呼びかけを切りすぎると橋が消えます。完結が孤立の別名になり、虚無は「誰の声も必要ない」が「誰の声も届かない」に反転したときに来ます。基準を捨てずに一人へ相談する練習が、自律を関係のなかで成熟させます。",
    related: ["autonomous-creator", "solitary-witness", "existential-resolve"],
  },
  "integrated-existence": {
    focus: ["creative", "experiential", "attitudinal", "autonomy"],
    formation:
      "四因子が高く、かつ拮抗が小さいとき、通路を使い分けられる統合的な類型になります。",
    essay:
      "統合的実存型は、一つの価値に自己を還元せず、状況に応じて創造・体験・態度・自律を使い分けます。意味への意志が特定の通路に固定されていない状態であり、柔軟さが強みです。\n課題は「どれもそこそこ」で決断を避けることです。統合が平均化になると、どれにも深くコミットできず、虚無は全部できるのにどれも切実でない、という形で訪れます。いま最も誠実な通路を一つ選び、期間を区切って沈むことが処方箋です。",
    related: ["balanced-observer", "aesthetic-practitioner", "autonomous-creator"],
  },
  "balanced-observer": {
    focus: ["creative", "experiential", "attitudinal", "autonomy"],
    formation:
      "四因子の差が小さく、突出も沈み込みもないとき、均衡そのものに意味を感じる類型になります。",
    essay:
      "均衡的観察者型は、一つの動機に自己を同化させすぎない冷静さがあります。意味は高峰ではなく、バランスそのものに感じられる。観察の位置から全体を見渡せることは賢明さでもあります。\n均衡が防衛になると、どれにも深くコミットできず、生が始まらない倦怠が慢性化します。どこか一つを期間限定で生きてみる偏りは、失敗ではなく実験です。",
    related: ["integrated-existence", "meaning-seeker", "introspective-thinker"],
  },
  "meaning-seeker": {
    focus: [],
    formation:
      "四因子がいずれも突出せず、通路が一つに収束していないとき、探求途上の類型として現れます。",
    essay:
      "意味探求途上型は、欠落というより、意味の通路がまだ一つに収束していないしるしです。フランクルは意味を見つけるものであり、捏造するものではないとしました。急いで類型に収まらず、問いを生きていられることがすでに実存的な強みです。\n輪郭のなさは不安を呼び、「自分には動機がない」と虚無に読み替えられやすい。小さな行為・感受・態度の実験を続け、類型に収まることより今週一つの通路を試すことが処方箋です。",
    related: ["balanced-observer", "world-receiver", "fate-dialogist"],
  },
};

export function focusLabels(typeId: PersonalityTypeId): string[] {
  return TYPE_ENCYCLOPEDIA[typeId].focus.map((factor) => FACTOR_INFO[factor].name);
}
