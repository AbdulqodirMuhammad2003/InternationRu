import type { UnitDetail } from "@/lib/data";

/** O'quvchining joriy darajasidagi mazmuni bor darslar. */
export function levelUnits(units: UnitDetail[], level: string) {
  return units.filter((u) => u.level_code === level && u.lock_reason !== "Tez orada");
}

/** Joriy dars — joriy darajadagi oxirgi ochiq dars (o'qituvchi o'quvchini
 *  daraja o'rtasidan boshlatgan bo'lsa ham, oldingi darajalar emas, aynan
 *  shu yer). Ochiq dars bo'lmasa — null. */
export function currentUnitOf(units: UnitDetail[], level: string): UnitDetail | null {
  const open = levelUnits(units, level).filter((u) => !u.locked);
  return open[open.length - 1] ?? null;
}
