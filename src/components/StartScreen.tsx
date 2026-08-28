import { FACTOR_INFO, FACTOR_ORDER, QUESTIONS } from "@/lib/existential";

interface StartScreenProps {
  onStart: () => void;
}

const PANEL =
  "rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow)] backdrop-blur-sm sm:p-12";

export function StartScreen({ onStart }: StartScreenProps) {
  const minutes = Math.max(3, Math.ceil(QUESTIONS.length * 0.25));

  return (
    <div className={PANEL}>
      <p className="mb-5 text-[11px] font-medium tracking-[0.28em] text-accent">
        ロゴセラピー · 実存分析
      </p>
      <h1 className="mb-2 font-serif text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
        実存的動機診断
      </h1>
      <p className="mb-6 text-sm tracking-[0.18em] text-subtle uppercase">
        生きる意味の四因子診断
      </p>

      <div className="mb-8 space-y-4 text-[15px] leading-relaxed text-foreground sm:text-base">
        <p>
          ヴィクトール・E・フランクルの実存分析（ロゴセラピー）は、人間を動かす根源を「快」でも「力」でもなく、
          <span className="text-heading">意味への意志</span>
          に見ました。苦痛や制約のなかでも、人は自分の生にどのような意味を与えるかを選びうる——その最後の自由が、この思想の中核です。
        </p>
        <p>
          フランクルは意味の実現を三つの価値に整理しました。世界へ働きかける
          <strong className="font-semibold text-heading">創造</strong>
          、世界と他者を深く受け取る
          <strong className="font-semibold text-heading">体験</strong>
          、変えられない運命にどう応答するかという
          <strong className="font-semibold text-heading">態度</strong>
          です。本診断はこれに、意味の法廷を外に置くか内に置くかを測る
          <strong className="font-semibold text-heading">実存的自律</strong>
          を加え、四つの通路としてあなたの生きる動機を解剖します。
        </p>
        <p>
          優劣の序列ではありません。どの通路がいま前面に出ているか、その輪郭を描きます。全
          {QUESTIONS.length}問・約{minutes}
          分。正答はなく、いまの自分に近いものを直感で選んでください。
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FACTOR_ORDER.map((factor) => {
          const info = FACTOR_INFO[factor];
          return (
            <div
              key={factor}
              className="rounded-xl border border-border-subtle bg-card px-4 py-3.5"
            >
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <span
                  className="text-sm font-semibold"
                  style={{ color: info.color }}
                >
                  {info.name}
                </span>
                <span className="text-[10px] tracking-wider text-subtle uppercase">
                  {info.nameEn}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                {info.description}
              </p>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full rounded-xl bg-button px-6 py-4 text-lg font-semibold tracking-wide text-button-fg transition-colors hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
      >
        診断をはじめる
      </button>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-subtle">
        本診断は自己理解のためのものであり、医学的診断ではありません。
      </p>
    </div>
  );
}
