interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 sm:p-12">
      <div className="mb-6 inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
        性格診断
      </div>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        エゴグラム診断
      </h1>
      <p className="mb-2 text-lg text-slate-600">
        交流分析に基づく、あなたの5つの自我状態を測定します。
      </p>
      <p className="mb-8 text-slate-500">
        全10問・約3分で完了します。直感でお答えください。
      </p>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { abbr: "CP", label: "厳格な親" },
          { abbr: "NP", label: "養育的親" },
          { abbr: "A", label: "成人" },
          { abbr: "FC", label: "自由な子供" },
          { abbr: "AC", label: "順応的子供" },
        ].map((item) => (
          <div
            key={item.abbr}
            className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-center"
          >
            <div className="text-sm font-bold text-indigo-600">{item.abbr}</div>
            <div className="text-xs text-slate-500">{item.label}</div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full rounded-xl bg-indigo-600 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        診断をはじめる
      </button>
    </div>
  );
}
