/**
 * ClearVue theme token interface.
 * Every theme must satisfy this shape.
 * Tokens map 1-to-1 to CSS custom properties set on :root by setTheme().
 */
export interface ClearVueTheme {
  // ── Primary action ───────────────────────────────────────────
  colorPrimary: string; // --cv-color-primary
  colorPrimaryHover: string; // --cv-color-primary-hover
  colorOnPrimary: string; // --cv-color-on-primary  (text on primary bg)

  // ── Secondary / neutral ──────────────────────────────────────
  colorSecondary: string; // --cv-color-secondary
  colorSecondaryHover: string; // --cv-color-secondary-hover
  colorOnSecondary: string; // --cv-color-on-secondary

  // ── Destructive ──────────────────────────────────────────────
  colorDanger: string; // --cv-color-danger
  colorDangerHover: string; // --cv-color-danger-hover
  colorOnDanger: string; // --cv-color-on-danger

  // ── Outline variant ──────────────────────────────────────────
  colorOutline: string; // --cv-color-outline       (border + text)
  colorOutlineBgHover: string; // --cv-color-outline-bg-hover

  // ── Ghost variant ────────────────────────────────────────────
  colorGhostText: string; // --cv-color-ghost-text
  colorGhostBgHover: string; // --cv-color-ghost-bg-hover

  // ── Focus / accessibility ────────────────────────────────────
  colorFocusRing: string; // --cv-color-focus-ring

  // ── Surfaces & text (optional – fall back to light defaults) ──
  colorSurface?: string; // --cv-color-surface        (inputs, cards, modals)
  colorSurfaceMuted?: string; // --cv-color-surface-muted  (headers, footers, stripes)
  colorTextMuted?: string; // --cv-color-text-muted     (helper text, placeholders)

  // ── Shape ────────────────────────────────────────────────────
  radiusBtn: string; // --cv-radius-btn
  fontWeightBtn: string; // --cv-font-weight-btn
}
