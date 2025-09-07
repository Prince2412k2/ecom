
const lastRequestTimestamps = new Map<string, number>();
const MIN_INTERVAL = 1000; // 1 second

export function rateLimit(key: string) {
  const now = Date.now();
  const last = lastRequestTimestamps.get(key) || 0;

  if (now - last < MIN_INTERVAL) {
    throw new Error("Too many requests, wait a second");
  }

  lastRequestTimestamps.set(key, now);
}
