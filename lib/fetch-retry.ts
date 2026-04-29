// Tiny retry-with-backoff wrapper around fetch.
//
// Rules (from CLAUDE.md "Retry by Default"):
// - 3 retries
// - 1s / 2s / 4s base delay, doubling each attempt, with jitter
// - retry on 500/502/503/504 and network errors
// - DO NOT retry 4xx (including 404, 401, 403, 429-as-client-error)
//
// Returns the final Response (which may itself be a non-OK 4xx — the caller
// decides what to do). Throws only when all retry attempts have been exhausted
// for a network error or a retriable 5xx.

const MAX_ATTEMPTS = 4; // 1 initial + 3 retries
const BASE_DELAY_MS = 1000;
const RETRIABLE_STATUS_CODES = new Set<number>([500, 502, 503, 504]);

export interface FetchWithRetryOptions extends RequestInit {
  readonly maxAttempts?: number;
  readonly baseDelayMs?: number;
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function computeBackoff(attempt: number, baseDelayMs: number): number {
  const exponential = baseDelayMs * Math.pow(2, attempt);
  const jitter = Math.random() * baseDelayMs * 0.5;
  return exponential + jitter;
}

function isRetriableStatus(status: number): boolean {
  return RETRIABLE_STATUS_CODES.has(status);
}

export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: FetchWithRetryOptions,
): Promise<Response> {
  const maxAttempts = init?.maxAttempts ?? MAX_ATTEMPTS;
  const baseDelayMs = init?.baseDelayMs ?? BASE_DELAY_MS;

  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await fetch(input, init);

      if (response.ok) return response;

      // 4xx — never retry, just hand back to caller
      if (response.status >= 400 && response.status < 500) {
        return response;
      }

      // 5xx — only retry the listed ones, return others as-is
      if (!isRetriableStatus(response.status)) {
        return response;
      }

      lastError = new Error(`Retriable HTTP ${response.status}`);
    } catch (error) {
      // Network error / abort / DNS / TLS — retry
      lastError = error;
    }

    const isLastAttempt = attempt === maxAttempts - 1;
    if (isLastAttempt) break;

    await delay(computeBackoff(attempt, baseDelayMs));
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("fetchWithRetry: exhausted retries");
}
