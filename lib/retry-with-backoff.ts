// Generic retry-with-backoff helper for arbitrary async operations.
//
// Mirrors the rules from `lib/fetch-retry.ts` (the fetch-specific cousin):
// - 3 retries by default (4 total attempts)
// - 1s / 2s / 4s base delay, doubling each attempt, with jitter
// - retry only on conditions the caller flags as retriable (5xx + network)
// - never retry 4xx — caller signals that by returning false from `shouldRetry`
//
// Used by the Bingus chat route to wrap the Anthropic SDK call. The SDK throws
// `APIError` instances with a numeric `status` field; the caller passes a
// `shouldRetry` predicate that whitelists 5xx + network errors only.

const DEFAULT_MAX_ATTEMPTS = 4; // 1 initial + 3 retries
const DEFAULT_BASE_DELAY_MS = 1000;

export interface RetryOptions {
  readonly maxAttempts?: number;
  readonly baseDelayMs?: number;
  readonly shouldRetry: (error: unknown) => boolean;
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function computeBackoff(attempt: number, baseDelayMs: number): number {
  const exponential = baseDelayMs * Math.pow(2, attempt);
  const jitter = Math.random() * baseDelayMs * 0.5;
  return exponential + jitter;
}

export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  options: RetryOptions,
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
  const baseDelayMs = options.baseDelayMs ?? DEFAULT_BASE_DELAY_MS;

  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      const isLastAttempt = attempt === maxAttempts - 1;
      if (isLastAttempt) break;

      if (!options.shouldRetry(error)) {
        throw error;
      }

      await delay(computeBackoff(attempt, baseDelayMs));
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("retryWithBackoff: exhausted retries");
}
