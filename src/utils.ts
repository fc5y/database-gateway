export function getCurrentTimestamp(): number {
  return Math.floor(new Date().getTime() / 1000);
}

export function dateToTimestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export function timestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}
