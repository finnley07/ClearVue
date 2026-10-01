let counter = 0;

/** Returns a unique, SSR-agnostic id such as `cv-input-3` (Vue 3.3 compatible). */
export function useUid(prefix: string): string {
  return `${prefix}-${++counter}`;
}
