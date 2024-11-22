import type { Time } from "@/types/common";

export function parseISODateString(s: string) {
  const b = s.split(/\D+/).map((x) => Number(x));
  return new Date(b[0], --b[1], b[2]);
}

export function parseISOTimeString(s: string): Time {
  const b = s.split(/\D+/).map((x) => Number(x));
  return {
    hour: b[0],
    minute: b[1],
    second: b[2],
  };
}

export function isSameDate(d1: Date, d2: Date) {
  return (
    d1.getFullYear() == d2.getFullYear() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getDate() == d2.getDate()
  );
}

export function formatTime(time: Time) {
  return `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
}

export function formatDateISO(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export function dateDiffDays(d1: Date, d2: Date) {
  return Math.floor((d2.getTime() - d1.getTime()) / (24 * 3600 * 1000)) + 1;
}
