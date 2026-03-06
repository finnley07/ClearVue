<script setup lang="ts">
interface Props {
  modelValue?: boolean;
  label?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  indeterminate: false,
});

defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>

<template>
  <label
    :class="[
      'cv-checkbox',
      { 'cv-checkbox--disabled': disabled, 'cv-checkbox--error': !!errorText },
    ]"
  >
    <span class="cv-checkbox__control">
      <input
        type="checkbox"
        class="cv-checkbox__input"
        :checked="modelValue"
        :disabled="disabled"
        :indeterminate="indeterminate"
        @change="
          $emit(
            'update:modelValue',
            ($event.target as HTMLInputElement).checked,
          )
        "
      />
      <span class="cv-checkbox__box" aria-hidden="true">
        <!-- Checkmark -->
        <svg
          v-if="!indeterminate"
          class="cv-checkbox__icon"
          viewBox="0 0 12 10"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="1.5,5 4.5,8.5 10.5,1.5" />
        </svg>
        <!-- Indeterminate dash -->
        <svg
          v-else
          class="cv-checkbox__icon"
          viewBox="0 0 12 2"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
        >
          <line x1="1" y1="1" x2="11" y2="1" />
        </svg>
      </span>
    </span>
    <span v-if="label || $slots.default" class="cv-checkbox__label-text">
      <slot>{{ label }}</slot>
      <span v-if="errorText" class="cv-checkbox__error">{{ errorText }}</span>
      <span v-else-if="helperText" class="cv-checkbox__helper">{{
        helperText
      }}</span>
    </span>
  </label>
</template>

<style>
/* ── Wrapper ─────────────────────────────────────────────────── */
.cv-checkbox {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.6rem;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9375rem;
  color: var(--cv-color-ghost-text, #374151);
  user-select: none;
}

.cv-checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Control ─────────────────────────────────────────────────── */
.cv-checkbox__control {
  position: relative;
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  margin-top: 0.15rem;
}

.cv-checkbox__input {
  position: absolute;
  inset: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: inherit;
}

/* ── Visual box ──────────────────────────────────────────────── */
.cv-checkbox__box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  border: 1.5px solid var(--cv-color-secondary, #d1d5db);
  border-radius: 4px;
  background: #fff;
  transition:
    background 0.15s,
    border-color 0.15s,
    box-shadow 0.15s;
  pointer-events: none;
}

.cv-checkbox__icon {
  width: 0.7rem;
  opacity: 0;
  transition: opacity 0.1s;
  color: var(--cv-color-on-primary, #fff);
}

/* Checked state */
.cv-checkbox__input:checked ~ .cv-checkbox__box,
.cv-checkbox__input:indeterminate ~ .cv-checkbox__box {
  background: var(--cv-color-primary, #6366f1);
  border-color: var(--cv-color-primary, #6366f1);
}

.cv-checkbox__input:checked ~ .cv-checkbox__box .cv-checkbox__icon,
.cv-checkbox__input:indeterminate ~ .cv-checkbox__box .cv-checkbox__icon {
  opacity: 1;
}

/* Focus ring */
.cv-checkbox__input:focus-visible ~ .cv-checkbox__box {
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--cv-color-focus-ring, #6366f1) 25%, transparent);
}

/* Error */
.cv-checkbox--error .cv-checkbox__box {
  border-color: var(--cv-color-danger, #ef4444);
}

/* ── Label text and helpers ──────────────────────────────────── */
.cv-checkbox__label-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.cv-checkbox__helper {
  font-size: 0.8125rem;
  color: #6b7280;
}

.cv-checkbox__error {
  font-size: 0.8125rem;
  color: var(--cv-color-danger, #ef4444);
}
</style>
