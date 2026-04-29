const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;
const RETRYABLE_STATUS = new Set([500, 502, 503, 504]);

function jitter(delayMs: number): number {
  const spread = delayMs * 0.25;
  return delayMs + Math.random() * spread;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetry(status: number | null, attempt: number): boolean {
  if (attempt >= MAX_RETRIES) return false;
  if (status === null) return true;
  return RETRYABLE_STATUS.has(status);
}

export interface FetchWithRetryOptions extends RequestInit {
  timeoutMs?: number;
}

export async function fetchWithRetry(
  url: string,
  init: FetchWithRetryOptions = {},
): Promise<Response> {
  const { timeoutMs = 15000, ...rest } = init;
  let attempt = 0;
  let lastError: unknown = null;

  while (attempt <= MAX_RETRIES) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...rest, signal: controller.signal });
      clearTimeout(timer);
      if (response.ok) return response;
      if (!shouldRetry(response.status, attempt)) return response;
      lastError = new Error(`HTTP ${response.status} ${response.statusText}`);
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
      if (!shouldRetry(null, attempt)) break;
    }

    const delay = jitter(BASE_DELAY_MS * Math.pow(2, attempt));
    await sleep(delay);
    attempt += 1;
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`fetchWithRetry failed for ${url}`);
}
