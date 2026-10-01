<script setup lang="ts">
export type ToastVariant = "default" | "info" | "warning" | "error" | "success";

interface Props {
  variant?: ToastVariant;
  title?: string;
  dismissible?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: "default",
  dismissible: false,
});

const emit = defineEmits<{
  dismiss: [];
}>();

const icons: Record<ToastVariant, string> = {
  default: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd"/></svg>`,
  info: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd"/></svg>`,
  warning: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"/></svg>`,
  error: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd"/></svg>`,
  success: `<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"/></svg>`,
};
</script>

<template>
  <div
    :role="variant === 'error' || variant === 'warning' ? 'alert' : 'status'"
    :class="['cv-toast', `cv-toast--${variant}`]"
  >
    <span class="cv-toast__icon" v-html="icons[variant]" />
    <div class="cv-toast__body">
      <p v-if="title" class="cv-toast__title">{{ title }}</p>
      <div class="cv-toast__message"><slot /></div>
    </div>
    <button
      v-if="dismissible"
      class="cv-toast__close"
      type="button"
      aria-label="Dismiss"
      @click="emit('dismiss')"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
        />
      </svg>
    </button>
  </div>
</template>

<style>
/* ── Base ───────────────────────────────────────────────────── */
.cv-toast {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: var(--cv-radius-btn, 8px);
  border: 1px solid transparent;
  font-family: inherit;
  font-size: 0.875rem;
  line-height: 1.5;
  width: 100%;
  box-sizing: border-box;
}

/* ── Icon ───────────────────────────────────────────────────── */
.cv-toast__icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.0625rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cv-toast__icon svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* ── Body ───────────────────────────────────────────────────── */
.cv-toast__body {
  flex: 1;
  min-width: 0;
}

.cv-toast__title {
  font-weight: 600;
  margin: 0 0 0.2rem;
}

.cv-toast__message {
  opacity: 0.85;
}

/* ── Close button ───────────────────────────────────────────── */
.cv-toast__close {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  opacity: 0.55;
  margin-top: 0.0625rem;
  transition: opacity 0.15s;
}

.cv-toast__close:hover {
  opacity: 1;
}

.cv-toast__close svg {
  width: 1rem;
  height: 1rem;
}

/* ── Variants ───────────────────────────────────────────────── */
.cv-toast--default {
  background: #f8fafc;
  border-color: #e2e8f0;
  color: #334155;
}

.cv-toast--info {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}

.cv-toast--success {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #15803d;
}

.cv-toast--warning {
  background: #fffbeb;
  border-color: #fde68a;
  color: #b45309;
}

.cv-toast--error {
  background: color-mix(
    in srgb,
    var(--cv-color-danger, #ef4444) 8%,
    transparent
  );
  border-color: color-mix(
    in srgb,
    var(--cv-color-danger, #ef4444) 30%,
    transparent
  );
  color: var(--cv-color-danger, #dc2626);
}
</style>
