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
    "focus": [
      "attitudinal",
      "creative"
    ],
    "formation": "態度価値と創造価値が上位に並び、当てはまりが比較的高い場合の分類です。",
    "essay": "予定していた方法が使えなくなったとき、「別のやり方はあるか」「どこは保留するか」と考える場面を思い浮かべてください。工夫と向き合い方が同時に関わる例です。実際にそうした経験があったか、自分の記憶と照らし合わせてみましょう。",
    "related": [
      "existential-resolve",
      "creative-realizer",
      "autonomous-creator"
    ]
  },
  "introspective-thinker": {
    "focus": [
      "attitudinal",
      "experiential"
    ],
    "formation": "態度価値と体験価値が上位に並び、当てはまりが比較的高い場合の分類です。",
    "essay": "心に残る会話や作品に触れたあと、自分がどう生きたいかを考えたことはありますか。体験を受け取ることと、向き合い方を考えることが重なる例です。静かな思索を好む性格かどうかまでは、この結果では分かりません。",
    "related": [
      "fate-dialogist",
      "world-receiver",
      "meaning-seeker"
    ]
  },
  "autonomous-creator": {
    "focus": [
      "autonomy",
      "creative"
    ],
    "formation": "実存的自律と創造価値が上位に並び、当てはまりが比較的高い場合の分類です。",
    "essay": "頼まれた仕事に、自分が大切にしている工夫を加える場面を考えてみましょう。相手の希望と自分の納得が重なることも、調整が必要なこともあります。両方をどう扱ったかが、振り返りの手がかりです。",
    "related": [
      "creative-realizer",
      "self-contained",
      "solitary-architect"
    ]
  },
  "aesthetic-practitioner": {
    "focus": [
      "creative",
      "experiential"
    ],
    "formation": "創造価値と体験価値が上位に並び、当てはまりが比較的高い場合の分類です。",
    "essay": "人との会話から料理を作りたくなる、読んだ本をきっかけに暮らしを工夫する。体験と行為は日常の小さな場面でもつながります。作品として完成させなくても、その経験を大切にして構いません。",
    "related": [
      "creative-realizer",
      "world-receiver",
      "solitary-witness"
    ]
  },
  "solitary-witness": {
    "focus": [
      "autonomy",
      "experiential"
    ],
    "formation": "実存的自律と体験価値が上位に並び、当てはまりが比較的高い場合の分類です。",
    "essay": "周りでは評判でなくても、自分には大切な曲や場所はありますか。その理由を言葉にすることは、体験と自分の納得を見比べる入口です。人と共有するかどうかは別に選べます。",
    "related": [
      "world-receiver",
      "self-contained",
      "introspective-thinker"
    ]
  },
  "existential-resolve": {
    "focus": [
      "attitudinal",
      "autonomy"
    ],
    "formation": "態度価値と実存的自律が上位に並び、当てはまりが比較的高い場合の分類です。",
    "essay": "予定を変えられない場面で、自分にとって守りたいことを一つ選ぶ。そうした経験を思い出してみてください。選択の余地が小さい場合は、自分の努力だけに解決を求める必要はありません。",
    "related": [
      "fate-dialogist",
      "self-contained",
      "solitary-architect"
    ]
  },
  "creative-realizer": {
    "focus": [
      "creative"
    ],
    "formation": "創造価値が回答のなかで相対的に前に出た場合の分類です。絶対的な高さや能力を表すものではありません。",
    "essay": "仕事だけでなく、家事や誰かへの手助けにも目を向けてみてください。「何をしたか」と「どこによさを感じたか」は別の問いです。行為の量を増やすより、すでにある経験を確かめる読み方もできます。",
    "related": [
      "autonomous-creator",
      "aesthetic-practitioner",
      "solitary-architect"
    ]
  },
  "world-receiver": {
    "focus": [
      "experiential"
    ],
    "formation": "体験価値が回答のなかで相対的に前に出た場合の分類です。絶対的な高さや能力を表すものではありません。",
    "essay": "何かの役に立ったわけではなくても、大切に覚えている時間はありますか。会話や風景など、自分に残ったものを手がかりにしてください。人と比べて感動が大きいかどうかを問う必要はありません。",
    "related": [
      "aesthetic-practitioner",
      "solitary-witness",
      "meaning-seeker"
    ]
  },
  "fate-dialogist": {
    "focus": [
      "attitudinal"
    ],
    "formation": "態度価値が回答のなかで相対的に前に出た場合の分類です。絶対的な高さや能力を表すものではありません。",
    "essay": "結果を変えられなかったときも、相談したことや、休むと決めたことを振り返れます。どんな応答を選べたか、選びたかったかを考えるための視点です。苦しい状況にとどまることを求める分類ではありません。",
    "related": [
      "existential-resolve",
      "introspective-thinker",
      "meaning-seeker"
    ]
  },
  "self-contained": {
    "focus": [
      "autonomy"
    ],
    "formation": "実存的自律が回答のなかで相対的に前に出た場合の分類です。絶対的な高さや能力を表すものではありません。",
    "essay": "誰かの助言を聞いてから決めた経験を思い出してみましょう。助言のどこを参考にし、自分は何を大切にしたかを書けば、相談と選択の関係を見直せます。人に頼らないことが目標ではありません。",
    "related": [
      "autonomous-creator",
      "solitary-witness",
      "existential-resolve"
    ]
  },
  "integrated-existence": {
    "focus": [
      "creative",
      "experiential",
      "attitudinal",
      "autonomy"
    ],
    "formation": "4因子すべての当てはまりが高めで、差が小さい場合の分類です。",
    "essay": "一つの出来事に複数の意味が重なることがあります。誰かのために食事を作り、一緒に味わう時間を楽しむ、といった例です。得点が高いことから、実際に全てを使い分けられる能力までは判断できません。",
    "related": [
      "balanced-observer",
      "aesthetic-practitioner",
      "autonomous-creator"
    ]
  },
  "balanced-observer": {
    "focus": [
      "creative",
      "experiential",
      "attitudinal",
      "autonomy"
    ],
    "formation": "4因子の差が小さい場合や、上位の複数因子が近く、一つの入口に絞りにくい場合の分類です。",
    "essay": "質問によって思い浮かべた場面が違うこともあります。仕事では行為が、人と過ごす時間では体験が大切だったかもしれません。一つのタイプ名より、場面ごとの違いに目を向けてみてください。",
    "related": [
      "integrated-existence",
      "meaning-seeker",
      "introspective-thinker"
    ]
  },
  "meaning-seeker": {
    "focus": [],
    "formation": "4因子が全体に控えめな場合や、低めから中間の範囲で近い場合の分類です。",
    "essay": "質問の例とは違うところに、大切なものがあるかもしれません。安心できる暮らしや、いつもの習慣など、4因子に分類せず書いてみてください。意味を探している最中だと、自分を定義する必要もありません。",
    "related": [
      "balanced-observer",
      "world-receiver",
      "fate-dialogist"
    ]
  }
};

export function focusLabels(typeId: PersonalityTypeId): string[] {
  return TYPE_ENCYCLOPEDIA[typeId].focus.map((factor) => FACTOR_INFO[factor].name);
}
