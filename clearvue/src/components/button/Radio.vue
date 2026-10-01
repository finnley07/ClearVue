<script setup lang="ts">
import { computed, inject } from "vue";
import type { Ref } from "vue";

type AnyValue = string | number | boolean;

interface Props {
  modelValue?: AnyValue | AnyValue[] | null;
  value: AnyValue;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: AnyValue | AnyValue[] | null];
}>();

// ── Injected from RadioGroup ──────────────────────────────────
const groupValue = inject<Ref<AnyValue | AnyValue[] | null | undefined>>(
  "cv-radio-group-value",
);
const groupName = inject<Ref<string | undefined>>("cv-radio-group-name");
const groupDisabled = inject<Ref<boolean>>("cv-radio-group-disabled");
const groupMax = inject<Ref<number>>("cv-radio-group-max");
const groupSet = inject<(v: AnyValue) => void>("cv-radio-group-set");

// ── Resolved values ───────────────────────────────────────────
const currentValue = computed(() =>
  groupValue ? groupValue.value : props.modelValue,
);
const currentName = computed(() => (groupName ? groupName.value : props.name));
const isDisabled = computed(
  () => (groupDisabled ? groupDisabled.value : false) || props.disabled,
);

/** true when max !== 1, i.e. multi-select mode */
const isMulti = computed(() => (groupMax ? groupMax.value : 1) !== 1);

/** Whether this item is currently selected */
const isChecked = computed(() => {
  const v = currentValue.value;
  return Array.isArray(v) ? v.includes(props.value) : v === props.value;
});

/**
 * true when the group's limit is reached and this item is NOT selected –
 * unselected items become disabled so the user knows the cap is hit.
 */
const isAtMax = computed(() => {
  if (!isMulti.value || isChecked.value) return false;
  const v = currentValue.value;
  const max = groupMax ? groupMax.value : 0;
  return Array.isArray(v) && max > 0 && v.length >= max;
});

const effectiveDisabled = computed(() => isDisabled.value || isAtMax.value);

// ── Interaction ───────────────────────────────────────────────
function toggle() {
  if (groupSet) {
    groupSet(props.value); // RadioGroup handles single / multi logic
  } else {
    // Standalone radio: simple toggle
    emit("update:modelValue", isChecked.value ? null : props.value);
  }
}

/** type=radio only: re-clicking the checked item deselects it */
function handleRadioClick() {
  if (effectiveDisabled.value) return;
  if (isChecked.value) toggle();
}

function handleChange() {
  if (effectiveDisabled.value) return;
  if (isMulti.value) {
    toggle(); // checkbox fires change on every toggle
  } else if (!isChecked.value) {
    toggle(); // radio: select (deselect handled by handleRadioClick)
  }
}
</script>

<template>
  <label :class="['cv-radio', { 'cv-radio--disabled': effectiveDisabled }]">
    <span class="cv-radio__control">
      <input
        :type="isMulti ? 'checkbox' : 'radio'"
        class="cv-radio__input"
        :value="value"
        :checked="isChecked"
        :disabled="effectiveDisabled"
        :name="isMulti ? undefined : currentName"
        @click="!isMulti && handleRadioClick()"
        @change="handleChange"
      />
      <span class="cv-radio__circle" aria-hidden="true" />
    </span>
    <span v-if="label || $slots.default" class="cv-radio__label-text">
      <slot>{{ label }}</slot>
      <span v-if="helperText" class="cv-radio__helper">{{ helperText }}</span>
    </span>
  </label>
</template>

<style>
/* ── Wrapper ─────────────────────────────────────────────────── */
.cv-radio {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.6rem;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9375rem;
  color: var(--cv-color-ghost-text, #374151);
  user-select: none;
}

.cv-radio--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Control ─────────────────────────────────────────────────── */
.cv-radio__control {
  position: relative;
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  margin-top: 0.15rem;
}

.cv-radio__input {
  position: absolute;
  inset: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: inherit;
}

/* ── Visual circle ───────────────────────────────────────────── */
.cv-radio__circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  border: 1.5px solid var(--cv-color-secondary, #d1d5db);
  border-radius: 50%;
  background: var(--cv-color-surface, #fff);
  transition:
    background 0.15s,
    border-color 0.15s,
    box-shadow 0.15s;
  pointer-events: none;
}

/* Inner dot via pseudo-element */
.cv-radio__circle::after {
  content: "";
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--cv-color-on-primary, #fff);
  opacity: 0;
  transition: opacity 0.1s;
}

/* Checked */
.cv-radio__input:checked ~ .cv-radio__circle {
  background: var(--cv-color-primary, #6366f1);
  border-color: var(--cv-color-primary, #6366f1);
}

.cv-radio__input:checked ~ .cv-radio__circle::after {
  opacity: 1;
}

/* Focus ring */
.cv-radio__input:focus-visible ~ .cv-radio__circle {
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--cv-color-focus-ring, #6366f1) 25%, transparent);
}

/* ── Label helpers ───────────────────────────────────────────── */
.cv-radio__label-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.cv-radio__helper {
  font-size: 0.8125rem;
  color: var(--cv-color-text-muted, #6b7280);
}
</style>
