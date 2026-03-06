<script setup lang="ts">
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

interface Props {
  size?: SpinnerSize;
  /** Accessible label for screen readers */
  label?: string;
}

withDefaults(defineProps<Props>(), {
  size: "md",
  label: "Loading…",
});
</script>

<template>
  <span
    role="status"
    :aria-label="label"
    :class="['cv-spinner', `cv-spinner--${size}`]"
  >
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle
        class="cv-spinner__track"
        cx="12"
        cy="12"
        r="10"
        stroke-width="3"
      />
      <path
        class="cv-spinner__arc"
        stroke-linecap="round"
        stroke-width="3"
        d="M12 2a10 10 0 0 1 10 10"
      />
    </svg>
  </span>
</template>

<style>
/* ── Base ────────────────────────────────────────────────────── */
.cv-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: cv-spin 0.75s linear infinite;
  flex-shrink: 0;
}

@keyframes cv-spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Sizes ───────────────────────────────────────────────────── */
.cv-spinner--xs svg {
  width: 0.875rem;
  height: 0.875rem;
}
.cv-spinner--sm svg {
  width: 1.125rem;
  height: 1.125rem;
}
.cv-spinner--md svg {
  width: 1.5rem;
  height: 1.5rem;
}
.cv-spinner--lg svg {
  width: 2rem;
  height: 2rem;
}
.cv-spinner--xl svg {
  width: 2.75rem;
  height: 2.75rem;
}

/* ── Track (light ring) ─────────────────────────────────────── */
.cv-spinner__track {
  stroke: color-mix(in srgb, var(--cv-color-primary, #6366f1) 20%, transparent);
}

/* ── Arc (animated part) ────────────────────────────────────── */
.cv-spinner__arc {
  stroke: var(--cv-color-primary, #6366f1);
}
</style>
