export type { ClearVueTheme } from "./types";
export { baseTheme } from "./base";
export { darkTheme } from "./dark";

import type { ClearVueTheme } from "./types";

/** Maps every ClearVueTheme key to its CSS custom property name. */
const TOKEN_MAP: Record<keyof ClearVueTheme, string> = {
  colorPrimary: "--cv-color-primary",
  colorPrimaryHover: "--cv-color-primary-hover",
  colorOnPrimary: "--cv-color-on-primary",
  colorSecondary: "--cv-color-secondary",
  colorSecondaryHover: "--cv-color-secondary-hover",
  colorOnSecondary: "--cv-color-on-secondary",
  colorDanger: "--cv-color-danger",
  colorDangerHover: "--cv-color-danger-hover",
  colorOnDanger: "--cv-color-on-danger",
  colorOutline: "--cv-color-outline",
  colorOutlineBgHover: "--cv-color-outline-bg-hover",
  colorGhostText: "--cv-color-ghost-text",
  colorGhostBgHover: "--cv-color-ghost-bg-hover",
  colorFocusRing: "--cv-color-focus-ring",
  colorSurface: "--cv-color-surface",
  colorSurfaceMuted: "--cv-color-surface-muted",
  colorTextMuted: "--cv-color-text-muted",
  radiusBtn: "--cv-radius-btn",
  fontWeightBtn: "--cv-font-weight-btn",
};

/**
 * Applies a theme by writing all token values as CSS custom properties
 * onto the document root element (<html>).
 *
 * @example
 * import { setTheme, darkTheme } from 'clearvue'
 * setTheme(darkTheme)
 */
export function setTheme(theme: ClearVueTheme): void {
  const root = document.documentElement;
  for (const key of Object.keys(TOKEN_MAP) as (keyof ClearVueTheme)[]) {
    const value = theme[key];
    // Optional tokens that a custom theme omits are cleared so a previously
    // applied theme doesn't leak through and the CSS fallbacks take over.
    if (value === undefined) root.style.removeProperty(TOKEN_MAP[key]);
    else root.style.setProperty(TOKEN_MAP[key], value);
  }
}
