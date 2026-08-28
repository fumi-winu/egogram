import {
  type DiagnosisResult,
  diagnoseFromScores,
} from "@/lib/existential";

export type QueryParamValue = string | string[] | undefined;

function resultQueryParams(result: DiagnosisResult): URLSearchParams {
  return new URLSearchParams({
    type: result.type.id,
    c: String(result.scores.creative),
    e: String(result.scores.experiential),
    a: String(result.scores.attitudinal),
    u: String(result.scores.autonomy),
  });
}

export function firstQueryValue(value: QueryParamValue): string | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export function buildResultPath(result: DiagnosisResult): string {
  return `/result?${resultQueryParams(result).toString()}`;
}

export function buildOgImagePath(result: DiagnosisResult): string {
  return `/api/og?${resultQueryParams(result).toString()}`;
}

export function buildXShareText(typeName: string): string {
  return `【実存的動機診断】私のタイプは『${typeName}』でした！ #実存的動機診断`;
}

export function parseResultSearchParams(
  searchParams: Pick<URLSearchParams, "get">,
): DiagnosisResult | null {
  const c = Number(searchParams.get("c"));
  const e = Number(searchParams.get("e"));
  const a = Number(searchParams.get("a"));
  const u = Number(searchParams.get("u"));

  return diagnoseFromScores(
    {
      creative: c,
      experiential: e,
      attitudinal: a,
      autonomy: u,
    },
    searchParams.get("type"),
  );
}

export function parseResultQuery(
  params: Record<string, QueryParamValue>,
): DiagnosisResult | null {
  return parseResultSearchParams({
    get: (key) => firstQueryValue(params[key]),
  });
}

export function toResultMetadata(
  result: DiagnosisResult,
): Record<string, string> {
  return {
    type: result.type.id,
    c: String(result.scores.creative),
    e: String(result.scores.experiential),
    a: String(result.scores.attitudinal),
    u: String(result.scores.autonomy),
  };
}

function toQueryString(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return undefined;
}

export function parseResultPayload(
  body: unknown,
): DiagnosisResult | null {
  if (typeof body !== "object" || body === null) return null;
  const record = body as Record<string, unknown>;
  return parseResultQuery({
    type: toQueryString(record.type),
    c: toQueryString(record.c),
    e: toQueryString(record.e),
    a: toQueryString(record.a),
    u: toQueryString(record.u),
  });
}
