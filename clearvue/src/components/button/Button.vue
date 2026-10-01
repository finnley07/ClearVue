<script setup lang="ts">
import { computed } from "vue";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  // toggle support
  modelValue?: boolean;
  isToggle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  type: "button",
  modelValue: false,
  isToggle: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => [
  "cv-btn",
  `cv-btn--${props.variant}`,
  `cv-btn--${props.size}`,
  { "cv-btn--loading": props.loading },
  { "cv-btn--active": props.isToggle && props.modelValue },
]);

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return;
  if (props.isToggle) emit("update:modelValue", !props.modelValue);
  emit("click", event);
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    :aria-pressed="isToggle ? modelValue : undefined"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span v-if="loading" class="cv-btn__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<style>
/* ── Base ───────────────────────────────────────────────────────── */
.cv-btn {
  --cv-btn-radius: var(--cv-radius-btn, 8px);
  --cv-btn-border-width: 1.5px;
  --cv-btn-font-weight: var(--cv-font-weight-btn, 600);
  --cv-btn-focus-ring: var(--cv-color-focus-ring, #6366f1);
  --cv-btn-disabled-opacity: 0.45;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  font-family: inherit;
  font-weight: var(--cv-btn-font-weight);
  border-radius: var(--cv-btn-radius);
  border: var(--cv-btn-border-width) solid transparent;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s,
    opacity 0.15s,
    transform 0.1s;
  white-space: nowrap;
  user-select: none;
}

.cv-btn:focus-visible {
  outline: 2px solid var(--cv-btn-focus-ring);
  outline-offset: 2px;
}

.cv-btn:disabled {
  opacity: var(--cv-btn-disabled-opacity);
  cursor: not-allowed;
}

.cv-btn:not(:disabled):hover {
  transform: translateY(-1px);
}

/* ── Sizes ─────────────────────────────────────────────────────── */
.cv-btn--sm {
  padding: 0.3rem 0.9rem;
  font-size: 0.8rem;
  min-width: 4rem;
}
.cv-btn--md {
  padding: 0.5rem 1.25rem;
  font-size: 0.9375rem;
  min-width: 5.5rem;
}
.cv-btn--lg {
  padding: 0.7rem 1.75rem;
  font-size: 1.05rem;
  min-width: 7rem;
}

/* ── Variants ──────────────────────────────────────────────────── */
.cv-btn--primary {
  --cv-btn-bg: var(--cv-color-primary, #6366f1);
  --cv-btn-color: var(--cv-color-on-primary, #fff);
  --cv-btn-border: var(--cv-color-primary, #6366f1);
  --cv-btn-bg-hover: var(--cv-color-primary-hover, #4f46e5);
  --cv-btn-border-hover: var(--cv-color-primary-hover, #4f46e5);

  background: var(--cv-btn-bg);
  color: var(--cv-btn-color);
  border-color: var(--cv-btn-border);
}
.cv-btn--primary:hover:not(:disabled) {
  background: var(--cv-btn-bg-hover);
  border-color: var(--cv-btn-border-hover);
}

.cv-btn--secondary {
  --cv-btn-bg: var(--cv-color-secondary, #e5e7eb);
  --cv-btn-color: var(--cv-color-on-secondary, #111827);
  --cv-btn-border: var(--cv-color-secondary, #e5e7eb);
  --cv-btn-bg-hover: var(--cv-color-secondary-hover, #d1d5db);
  --cv-btn-border-hover: var(--cv-color-secondary-hover, #d1d5db);

  background: var(--cv-btn-bg);
  color: var(--cv-btn-color);
  border-color: var(--cv-btn-border);
}
.cv-btn--secondary:hover:not(:disabled) {
  background: var(--cv-btn-bg-hover);
  border-color: var(--cv-btn-border-hover);
}

.cv-btn--outline {
  --cv-btn-bg: transparent;
  --cv-btn-color: var(--cv-color-outline, #6366f1);
  --cv-btn-border: var(--cv-color-outline, #6366f1);
  --cv-btn-bg-hover: var(--cv-color-outline-bg-hover, #ede9fe);

  background: var(--cv-btn-bg);
  color: var(--cv-btn-color);
  border-color: var(--cv-btn-border);
}
.cv-btn--outline:hover:not(:disabled) {
  background: var(--cv-btn-bg-hover);
}

.cv-btn--ghost {
  --cv-btn-bg: transparent;
  --cv-btn-color: var(--cv-color-ghost-text, #374151);
  --cv-btn-bg-hover: var(--cv-color-ghost-bg-hover, #f3f4f6);

  background: var(--cv-btn-bg);
  color: var(--cv-btn-color);
  border-color: transparent;
}
.cv-btn--ghost:hover:not(:disabled) {
  background: var(--cv-btn-bg-hover);
}

.cv-btn--danger {
  --cv-btn-bg: var(--cv-color-danger, #ef4444);
  --cv-btn-color: var(--cv-color-on-danger, #fff);
  --cv-btn-border: var(--cv-color-danger, #ef4444);
  --cv-btn-bg-hover: var(--cv-color-danger-hover, #dc2626);
  --cv-btn-border-hover: var(--cv-color-danger-hover, #dc2626);

  background: var(--cv-btn-bg);
  color: var(--cv-btn-color);
  border-color: var(--cv-btn-border);
}
.cv-btn--danger:hover:not(:disabled) {
  background: var(--cv-btn-bg-hover);
  border-color: var(--cv-btn-border-hover);
}

/* ── Active (toggle) ───────────────────────────────────────────── */
.cv-btn--active {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.25);
  filter: brightness(0.88);
}

/* ── Spinner ───────────────────────────────────────────────────── */
.cv-btn__spinner {
  display: inline-block;
  width: 0.9em;
  height: 0.9em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: cv-spin 0.6s linear infinite;
}

@keyframes cv-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
