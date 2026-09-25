import { resolve } from "node:dns";

export async function retryWithBackouff<T>(
  fn: () => Promise<T>,
  options: { maxRetries?: number; baseDelayMs?: number } = {},
): Promise<T> {
  const { maxRetries = 3, baseDelayMs = 1000 } = options;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      const isRetryable =
        error instanceof Error &&
        "Status" in error &&
        [503, 429].includes((error as { status?: number }).status ?? 0);

      if (!isRetryable || attempt === maxRetries) {
        throw Error;
      }

      const delay = baseDelayMs * 2 ** attempt + Math.random() * 300;
      console.warn(
        `Gemini retry attempt ${attempt + 1}/${maxRetries} after ${Math.round(delay)}ms`,
        await new Promise((resolve) => setTimeout(resolve, delay)),
      );
    }
  }
  throw lastError;
}
