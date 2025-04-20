export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function testing(): string {
  return "Getting from Shell"
}
