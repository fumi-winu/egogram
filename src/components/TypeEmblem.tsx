import { FACTOR_ORDER, PERSONALITY_TYPE_IDS, type PersonalityTypeId } from "@/lib/existential";

// Geometric emblems share the four-factor palette, with a distinct silhouette per type.
export function TypeEmblem({ typeId, className = "" }: { typeId?: PersonalityTypeId; className?: string }) {
  const index = typeId ? PERSONALITY_TYPE_IDS.indexOf(typeId) : 10;
  const petals = 3 + (index % 5);
  const color = `var(--factor-${FACTOR_ORDER[index % 4]})`;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeOpacity=".13" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeOpacity=".12" strokeDasharray="2 7" />
      {Array.from({ length: petals }, (_, i) => (
        <ellipse key={i} cx="100" cy="74" rx={20 + index % 3 * 5} ry="43" transform={`rotate(${i * 360 / petals + index * 12} 100 100)`} fill={color} fillOpacity=".13" stroke={color} strokeWidth="1.4" />
      ))}
      <circle cx="100" cy="100" r="12" fill={color} />
      <circle cx="100" cy="100" r="4" fill="var(--surface)" />
      <path d="M100 5v12m0 166v12M5 100h12m166 0h12" stroke="currentColor" strokeOpacity=".4" />
    </svg>
  );
}

export function MeaningCompass() {
  return (
    <svg viewBox="0 0 480 480" className="meaning-compass" fill="none" aria-hidden="true">
      <circle cx="240" cy="240" r="207" stroke="currentColor" strokeOpacity=".15" />
      <circle cx="240" cy="240" r="184" stroke="currentColor" strokeOpacity=".2" strokeDasharray="1 9" />
      <path d="M240 16v448M16 240h448" stroke="currentColor" strokeOpacity=".1" />
      {FACTOR_ORDER.map((factor, i) => (
        <g key={factor} transform={`rotate(${i * 90} 240 240)`}>
          <path d="M240 240C144 215 130 105 240 65C350 105 336 215 240 240Z" fill={`var(--factor-${factor})`} fillOpacity=".22" stroke={`var(--factor-${factor})`} strokeWidth="1.4" />
          <path d="M240 240Q195 160 240 85Q285 160 240 240" stroke={`var(--factor-${factor})`} strokeOpacity=".65" />
          <circle cx="240" cy="45" r="4" fill={`var(--factor-${factor})`} />
        </g>
      ))}
      <circle cx="240" cy="240" r="42" fill="var(--surface)" stroke="currentColor" strokeOpacity=".2" />
      <path d="m240 215 7 18 18 7-18 7-7 18-7-18-18-7 18-7Z" fill="var(--accent)" />
      <text x="240" y="22" textAnchor="middle" fill="currentColor" fontSize="9" letterSpacing="3">CREATE</text>
      <text x="240" y="474" textAnchor="middle" fill="currentColor" fontSize="9" letterSpacing="3">RESPOND</text>
      <text x="22" y="240" textAnchor="middle" fill="currentColor" fontSize="9" letterSpacing="3" transform="rotate(-90 22 240)">CHOOSE</text>
      <text x="458" y="240" textAnchor="middle" fill="currentColor" fontSize="9" letterSpacing="3" transform="rotate(90 458 240)">EXPERIENCE</text>
    </svg>
  );
}
