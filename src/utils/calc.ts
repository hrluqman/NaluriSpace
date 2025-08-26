export const KM_TO_MILES = 0.621371;

export const RADII_KM = { sun: 696340, earth: 6371, mars: 3389.5 } as const;

export function parsePi(piStr?: string): number {
  if (!piStr) return Math.PI;

  const n = Number(piStr);
  if (Number.isFinite(n)) return n;

  const parsed = parseFloat(piStr);
  return Number.isFinite(parsed) ? parsed : Math.PI;
}

export function calculateCircumference(
  piStr: string | undefined,
  radiusKm: number,
  unit: "kilometres" | "miles" = "kilometres"
) {
  const pi = parsePi(piStr);
  const radius = unit === "miles" ? radiusKm * KM_TO_MILES : radiusKm;
  return 2 * pi * radius;
}
