<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import { useUid } from "../../composables/useUid";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface Props {
  modelValue: boolean;
  title?: string;
  size?: ModalSize;
  /** Clicking the backdrop closes the modal */
  closeOnBackdrop?: boolean;
  /** Pressing Escape closes the modal */
  closeOnEsc?: boolean;
  /** Accessible name when no `title` is given (e.g. custom header slot) */
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  closeOnBackdrop: true,
  closeOnEsc: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

function close() {
  emit("update:modelValue", false);
}

function onBackdrop() {
  if (props.closeOnBackdrop) close();
}

const titleId = useUid("cv-modal-title");
const dialogEl = ref<HTMLElement | null>(null);
let previouslyFocused: HTMLElement | null = null;
let previousOverflow = "";
let active = false;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Listen on the document: the dialog usually has no focus yet when the user
// presses Escape, so a keydown handler on the dialog element never fires.
function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && props.closeOnEsc) {
    e.stopPropagation();
    close();
    return;
  }
  if (e.key !== "Tab" || !dialogEl.value) return;

  // Keep keyboard focus inside the dialog
  const items = Array.from(
    dialogEl.value.querySelectorAll<HTMLElement>(FOCUSABLE),
  );
  if (items.length === 0) {
    e.preventDefault();
    dialogEl.value.focus();
    return;
  }
  const first = items[0]!;
  const last = items[items.length - 1]!;
  const current = document.activeElement;
  if (e.shiftKey && (current === first || current === dialogEl.value)) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && current === last) {
    e.preventDefault();
    first.focus();
  }
}

watch(
  () => props.modelValue,
  async (open) => {
    if (open && !active) {
      active = true;
      previouslyFocused = document.activeElement as HTMLElement | null;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKeydown);
      await nextTick();
      (
        dialogEl.value?.querySelector<HTMLElement>(FOCUSABLE) ?? dialogEl.value
      )?.focus();
    } else if (!open && active) {
      release();
    }
  },
  { immediate: true },
);

function release() {
  active = false;
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = previousOverflow;
  previouslyFocused?.focus?.();
  previouslyFocused = null;
}

onBeforeUnmount(() => {
  if (active) release();
});
</script>

<template>
  <Teleport to="body">
    <Transition name="cv-modal-fade">
      <div
        v-if="modelValue"
        class="cv-modal-backdrop"
        @click.self="onBackdrop"
      >
        <div
          ref="dialogEl"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          :aria-labelledby="title ? titleId : undefined"
          :aria-label="!title ? ariaLabel : undefined"
          :class="['cv-modal', `cv-modal--${size}`]"
        >
          <!-- Header -->
          <div v-if="title || $slots.header" class="cv-modal__header">
            <slot name="header">
              <span :id="titleId" class="cv-modal__title">{{ title }}</span>
            </slot>
            <button
              type="button"
              class="cv-modal__close"
              aria-label="Close"
              @click="close"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
                />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="cv-modal__body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="cv-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
/* ── Backdrop ────────────────────────────────────────────────── */
.cv-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
  overflow-y: auto;
}

/* ── Dialog box ──────────────────────────────────────────────── */
.cv-modal {
  background: var(--cv-color-surface, #fff);
  border-radius: var(--cv-radius-btn, 10px);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.12),
    0 1px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100dvh - 2rem);
  overflow: hidden;
}

/* Sizes */
.cv-modal:focus {
  outline: none;
}

.cv-modal--sm {
  max-width: 22rem;
}
.cv-modal--md {
  max-width: 32rem;
}
.cv-modal--lg {
  max-width: 48rem;
}
.cv-modal--xl {
  max-width: 64rem;
}
.cv-modal--full {
  max-width: 100%;
  height: calc(100dvh - 2rem);
}

/* ── Header ──────────────────────────────────────────────────── */
.cv-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--cv-color-secondary, #e5e7eb);
  flex-shrink: 0;
}

.cv-modal__title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--cv-color-ghost-text, #111827);
}

.cv-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--cv-color-text-muted, #6b7280);
  border-radius: 6px;
  transition:
    background 0.15s,
    color 0.15s;
}

.cv-modal__close:hover {
  background: var(--cv-color-ghost-bg-hover, #f3f4f6);
  color: var(--cv-color-ghost-text, #374151);
}

.cv-modal__close svg {
  width: 1.125rem;
  height: 1.125rem;
}

/* ── Body ────────────────────────────────────────────────────── */
.cv-modal__body {
  padding: 1.25rem;
  overflow-y: auto;
  flex: 1;
}

/* ── Footer ──────────────────────────────────────────────────── */
.cv-modal__footer {
  padding: 0.875rem 1.25rem;
  border-top: 1px solid var(--cv-color-secondary, #e5e7eb);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
  background: var(--cv-color-surface-muted, #f8fafc);
}

/* ── Transition ──────────────────────────────────────────────── */
.cv-modal-fade-enter-active,
.cv-modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.cv-modal-fade-enter-active .cv-modal,
.cv-modal-fade-leave-active .cv-modal {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.cv-modal-fade-enter-from,
.cv-modal-fade-leave-to {
  opacity: 0;
}
.cv-modal-fade-enter-from .cv-modal,
.cv-modal-fade-leave-to .cv-modal {
  transform: translateY(-12px);
  opacity: 0;
}
</style>
