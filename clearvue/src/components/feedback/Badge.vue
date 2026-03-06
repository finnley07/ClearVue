<script setup lang="ts">
export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";
export type BadgeSize = "sm" | "md";

withDefaults(
  defineProps<{
    variant?: BadgeVariant;
    size?: BadgeSize;
    dot?: boolean;
  }>(),
  {
    variant: "primary",
    size: "md",
    dot: false,
  },
);
</script>

<template>
  <span :class="['cv-badge', `cv-badge--${variant}`, `cv-badge--${size}`]">
    <span v-if="dot" class="cv-badge__dot" aria-hidden="true" />
    <slot />
  </span>
</template>

<style>
.cv-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  font-family: inherit;
  font-weight: 600;
  border-radius: 999px;
  white-space: nowrap;
  line-height: 1;
}

/* ── Sizes ──────────────────────────────────────────────────── */
.cv-badge--sm {
  font-size: 0.7rem;
  padding: 0.2em 0.6em;
}
.cv-badge--md {
  font-size: 0.775rem;
  padding: 0.3em 0.75em;
}

/* ── Variants ───────────────────────────────────────────────── */
.cv-badge--primary {
  background: color-mix(
    in srgb,
    var(--cv-color-primary, #6366f1) 12%,
    transparent
  );
  color: var(--cv-color-primary, #6366f1);
}
.cv-badge--secondary {
  background: #f1f5f9;
  color: #475569;
}
.cv-badge--success {
  background: #dcfce7;
  color: #16a34a;
}
.cv-badge--warning {
  background: #fef9c3;
  color: #b45309;
}
.cv-badge--danger {
  background: color-mix(
    in srgb,
    var(--cv-color-danger, #ef4444) 10%,
    transparent
  );
  color: var(--cv-color-danger, #ef4444);
}
.cv-badge--neutral {
  background: #f3f4f6;
  color: #6b7280;
}

/* ── Dot ────────────────────────────────────────────────────── */
.cv-badge__dot {
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}
</style>
