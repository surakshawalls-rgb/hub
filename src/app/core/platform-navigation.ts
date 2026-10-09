export function isSafeDestination(value: string): boolean {
  try {
    const destination = new URL(value);
    return destination.protocol === 'https:' && destination.hostname.length > 0;
  } catch {
    return false;
  }
}
