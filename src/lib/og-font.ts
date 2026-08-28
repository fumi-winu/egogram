import { FACTOR_INFO, FACTOR_ORDER, PERSONALITY_TYPES } from "@/lib/existential";

const UI_GLYPHS =
  "実存的動機診断診断結果四因子創造体験態度価値自律生きる意味への意志を読むEXISTENTIAL MOTIVATION 0123456789/% ";

function uniqueGlyphs(input: string): string {
  return [...new Set(input)].join("");
}

export function ogFontText(): string {
  const typeGlyphs = Object.values(PERSONALITY_TYPES)
    .map((type) => `${type.name}${type.nameEn}${type.tagline}`)
    .join("");
  const factorGlyphs = FACTOR_ORDER.map(
    (factor) => FACTOR_INFO[factor].name + FACTOR_INFO[factor].shortLabel,
  ).join("");
  return uniqueGlyphs(`${UI_GLYPHS}${typeGlyphs}${factorGlyphs}`);
}

const FONT_UA =
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1";

async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family.replaceAll(" ", "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;

  try {
    const cssResponse = await fetch(cssUrl, {
      headers: { "User-Agent": FONT_UA },
    });
    if (!cssResponse.ok) return null;

    const css = await cssResponse.text();
    const match =
      css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/) ??
      css.match(/src: url\((.+?)\) format\('woff'\)/);
    const fontUrl = match?.[1];
    if (!fontUrl) return null;

    const fontResponse = await fetch(fontUrl);
    if (!fontResponse.ok) return null;
    return fontResponse.arrayBuffer();
  } catch {
    return null;
  }
}

export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
};

let fontPromise: Promise<OgFont[]> | null = null;

export function loadOgFonts(): Promise<OgFont[]> {
  fontPromise ??= (async () => {
    const text = ogFontText();
    const [serif, sans] = await Promise.all([
      loadGoogleFont("Noto Serif JP", 700, text),
      loadGoogleFont("Noto Sans JP", 400, text),
    ]);

    const fonts: OgFont[] = [];
    if (serif) {
      fonts.push({
        name: "Noto Serif JP",
        data: serif,
        weight: 700,
        style: "normal",
      });
    }
    if (sans) {
      fonts.push({
        name: "Noto Sans JP",
        data: sans,
        weight: 400,
        style: "normal",
      });
    }
    return fonts;
  })();

  return fontPromise;
}
