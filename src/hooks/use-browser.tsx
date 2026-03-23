export function getChromeFlg(userAgent?: string) {
  const ua = userAgent ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '');

  // Exclude Chromium-based browsers that report "Chrome" in UA.
  return /Chrome/.test(ua) && !/Edg|OPR/.test(ua);
}
