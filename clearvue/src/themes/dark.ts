import type { ClearVueTheme } from "./types";

/**
 * Dark theme – optimised for use on dark-backgrounded pages.
 * Uses lighter primary shades so they remain readable on dark surfaces.
 */
export const darkTheme: ClearVueTheme = {
  colorPrimary: "#818cf8", // indigo-400
  colorPrimaryHover: "#6366f1", // indigo-500
  colorOnPrimary: "#ffffff",

  colorSecondary: "#374151", // gray-700
  colorSecondaryHover: "#4b5563", // gray-600
  colorOnSecondary: "#f9fafb", // gray-50

  colorDanger: "#f87171", // red-400
  colorDangerHover: "#ef4444", // red-500
  colorOnDanger: "#ffffff",

  colorOutline: "#818cf8", // indigo-400
  colorOutlineBgHover: "#1e1b4b", // indigo-950

  colorGhostText: "#e5e7eb", // gray-200
  colorGhostBgHover: "#1f2937", // gray-800

  colorFocusRing: "#818cf8",

  radiusBtn: "8px",
  fontWeightBtn: "600",
};
