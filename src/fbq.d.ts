export {};

/** Meta (Facebook) Pixel — loaded by inline script in `app/layout.tsx` */
declare global {
  interface Window {
    /** Meta Pixel queue function (same as global `fbq` in the browser). */
    fbq?: (command: string, ...args: unknown[]) => void;
  }

  /**
   * Meta Pixel API (`fbq('init', …)`, `fbq('track', 'Lead')`, …).
   * Prefer `window.fbq?.(...)` in app code so missing script does not throw.
   */
  function fbq(command: string, ...args: unknown[]): void;
}
