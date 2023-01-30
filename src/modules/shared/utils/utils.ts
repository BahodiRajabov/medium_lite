import { defaults } from "../../shared/defaults/defaults";

export function getFirst(v: any[]) {
  return v[0];
}

export function generateRandomDigit(max: number) {
  return Math.round(Math.random() * 10 ** max)
    .toString()
    .padEnd(max, '0');
}

export function jwtExpiresInToDate(expiresIn: number) {
  const expiresAt = getCurrentDate() + (expiresIn * 1000)
  return getDateByValue(expiresAt).toISOString()
}

export function getExpireDate(date: Date) {
  const dateTimestamp = new Date(date);
  return dateTimestamp.getTime() + (60 * 1000)
}

export function getDateByValue(date: number | Date) {
  return new Date(date);
}

export function getCurrentDate() {
  return Date.now();
}

export function generateRangesArray(value: string) {
  const splitted = value.split(defaults.rangeSplitter)
  return [Number(splitted[0]), Number(splitted[1])];
}
