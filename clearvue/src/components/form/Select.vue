<script setup lang="ts">
import { computed, useAttrs } from "vue";
import type { StyleValue } from "vue";
import { useUid } from "../../composables/useUid";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  modelValue?: string | number;
  options?: SelectOption[];
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  required?: boolean;
}

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  disabled: false,
  required: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();

const attrs = useAttrs();
const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});
const generatedId = useUid("cv-select");
const selectId = computed(() => (attrs.id as string | undefined) ?? generatedId);
const describedBy = computed(() =>
  props.errorText
    ? `${selectId.value}-error`
    : props.helperText
      ? `${selectId.value}-helper`
      : undefined,
);

// The DOM always yields strings – map back to the option's original value so
// numeric options keep emitting numbers as the prop type promises.
function onChange(e: Event) {
  const raw = (e.target as HTMLSelectElement).value;
  const match = props.options.find((o) => String(o.value) === raw);
  emit("update:modelValue", match ? match.value : raw);
}
</script>

<template>
  <div
    :class="[
      'cv-select-wrap',
      {
        'cv-select-wrap--error': !!errorText,
        'cv-select-wrap--disabled': disabled,
      },
      attrs.class,
    ]"
    :style="attrs.style as StyleValue"
  >
    <label v-if="label" :for="selectId" class="cv-select__label">
      {{ label
      }}<span v-if="required" class="cv-select__required" aria-hidden="true">
        *</span
      >
    </label>
    <div class="cv-select__container">
      <select
        v-bind="inputAttrs"
        :id="selectId"
        class="cv-select"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :aria-invalid="!!errorText || undefined"
        :aria-describedby="describedBy"
        @change="onChange"
      >
        <option
          v-if="placeholder"
          value=""
          disabled
          :selected="modelValue === undefined || modelValue === ''"
        >
          {{ placeholder }}
        </option>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          :disabled="opt.disabled"
        >
          {{ opt.label }}
        </option>
        <!-- Allow arbitrary option slots as fallback -->
        <slot />
      </select>
      <!-- Chevron icon -->
      <span class="cv-select__chevron" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </div>
    <p v-if="errorText" :id="`${selectId}-error`" class="cv-select__error">
      {{ errorText }}
    </p>
    <p
      v-else-if="helperText"
      :id="`${selectId}-helper`"
      class="cv-select__helper"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<style>
/* ── Wrapper ─────────────────────────────────────────────────── */
.cv-select-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

/* ── Label ───────────────────────────────────────────────────── */
.cv-select__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--cv-color-ghost-text, #374151);
}

.cv-select__required {
  color: var(--cv-color-danger, #ef4444);
}

/* ── Container (position anchor for chevron) ─────────────────── */
.cv-select__container {
  position: relative;
}

/* ── Native select ───────────────────────────────────────────── */
.cv-select {
  appearance: none;
  -webkit-appearance: none;
  display: block;
  width: 100%;
  font-family: inherit;
  font-size: 0.9375rem;
  color: var(--cv-color-ghost-text, #111827);
  background: var(--cv-color-surface, #fff);
  border: 1.5px solid var(--cv-color-secondary, #d1d5db);
  border-radius: var(--cv-radius-btn, 8px);
  padding: 0.5rem 2.25rem 0.5rem 0.85rem;
  outline: none;
  cursor: pointer;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
  line-height: 1.5;
}

.cv-select:focus {
  border-color: var(--cv-color-primary, #6366f1);
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--cv-color-primary, #6366f1) 15%, transparent);
}

.cv-select-wrap--error .cv-select {
  border-color: var(--cv-color-danger, #ef4444);
}

.cv-select-wrap--error .cv-select:focus {
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--cv-color-danger, #ef4444) 15%, transparent);
}

.cv-select-wrap--disabled .cv-select {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Chevron ─────────────────────────────────────────────────── */
.cv-select__chevron {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--cv-color-text-muted, #6b7280);
  display: flex;
  align-items: center;
}

.cv-select__chevron svg {
  width: 1rem;
  height: 1rem;
}

/* ── Helpers ─────────────────────────────────────────────────── */
.cv-select__helper {
  font-size: 0.8125rem;
  color: var(--cv-color-text-muted, #6b7280);
}

.cv-select__error {
  font-size: 0.8125rem;
  color: var(--cv-color-danger, #ef4444);
}
</style>
