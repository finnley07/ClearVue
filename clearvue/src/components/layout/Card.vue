<script setup lang="ts">
withDefaults(
  defineProps<{
    padding?: "none" | "sm" | "md" | "lg";
    shadow?: boolean;
    border?: boolean;
  }>(),
  {
    padding: "md",
    shadow: false,
    border: true,
  },
);
</script>

<template>
  <div
    :class="[
      'cv-card',
      `cv-card--pad-${padding}`,
      { 'cv-card--shadow': shadow, 'cv-card--border': border },
    ]"
  >
    <div v-if="$slots.header" class="cv-card__header">
      <slot name="header" />
    </div>
    <div class="cv-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="cv-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style>
/* ── Base ───────────────────────────────────────────────────── */
.cv-card {
  background: #fff;
  border-radius: var(--cv-radius-btn, 10px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cv-card--border {
  border: 1px solid var(--cv-color-secondary, #e5e7eb);
}

.cv-card--shadow {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.06);
}

/* ── Padding variants ───────────────────────────────────────── */
.cv-card--pad-none .cv-card__body {
  padding: 0;
}
.cv-card--pad-sm .cv-card__body {
  padding: 0.75rem;
}
.cv-card--pad-md .cv-card__body {
  padding: 1.25rem;
}
.cv-card--pad-lg .cv-card__body {
  padding: 2rem;
}

/* ── Header ─────────────────────────────────────────────────── */
.cv-card__header {
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid var(--cv-color-secondary, #e5e7eb);
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--cv-color-ghost-text, #111827);
}

/* ── Footer ─────────────────────────────────────────────────── */
.cv-card__footer {
  padding: 0.85rem 1.25rem;
  border-top: 1px solid var(--cv-color-secondary, #e5e7eb);
  background: #f8fafc;
}
</style>
