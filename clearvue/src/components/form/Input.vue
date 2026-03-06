<script setup lang="ts">
export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search";

interface Props {
  modelValue?: string;
  type?: InputType;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  readonly: false,
  required: false,
});

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <div
    :class="[
      'cv-input-wrap',
      {
        'cv-input-wrap--error': !!errorText,
        'cv-input-wrap--disabled': disabled,
      },
    ]"
  >
    <label v-if="label" class="cv-input__label">
      {{ label
      }}<span v-if="required" class="cv-input__required" aria-hidden="true">
        *</span
      >
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      class="cv-input"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <p v-if="errorText" class="cv-input__error">{{ errorText }}</p>
    <p v-else-if="helperText" class="cv-input__helper">{{ helperText }}</p>
  </div>
</template>

<style>
/* ── Wrapper ────────────────────────────────────────────────── */
.cv-input-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

/* ── Label ──────────────────────────────────────────────────── */
.cv-input__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--cv-color-ghost-text, #374151);
}

.cv-input__required {
  color: var(--cv-color-danger, #ef4444);
}

/* ── Input ──────────────────────────────────────────────────── */
.cv-input {
  font-family: inherit;
  font-size: 0.9375rem;
  color: var(--cv-color-ghost-text, #111827);
  background: #fff;
  border: 1.5px solid var(--cv-color-secondary, #d1d5db);
  border-radius: var(--cv-radius-btn, 8px);
  padding: 0.5rem 0.85rem;
  width: 100%;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
  outline: none;
  line-height: 1.5;
}

.cv-input::placeholder {
  color: #9ca3af;
}

.cv-input:focus {
  border-color: var(--cv-color-primary, #6366f1);
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--cv-color-primary, #6366f1) 15%, transparent);
}

.cv-input-wrap--error .cv-input {
  border-color: var(--cv-color-danger, #ef4444);
}

.cv-input-wrap--error .cv-input:focus {
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--cv-color-danger, #ef4444) 15%, transparent);
}

.cv-input-wrap--disabled .cv-input {
  opacity: 0.45;
  cursor: not-allowed;
  background: #f9fafb;
}

/* ── Helper / Error text ────────────────────────────────────── */
.cv-input__helper {
  font-size: 0.78rem;
  color: #6b7280;
}

.cv-input__error {
  font-size: 0.78rem;
  color: var(--cv-color-danger, #ef4444);
}
</style>
