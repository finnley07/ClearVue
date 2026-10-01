<script setup lang="ts">
import { computed, provide } from "vue";

type SingleValue = string | number | boolean | null;
type MultiValue = (string | number | boolean)[];

interface Props {
  /** Current selection. Use a plain value for `max=1`, an array for `max>1`. */
  modelValue?: SingleValue | MultiValue;
  label?: string;
  helperText?: string;
  errorText?: string;
  name?: string;
  disabled?: boolean;
  /**
   * How many items may be selected at once.
   * `1`  = single-select (default)
   * `0`  = unlimited multi-select
   * `n`  = at most n items
   */
  max?: number;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  max: 1,
});

const emit = defineEmits<{
  "update:modelValue": [value: SingleValue | MultiValue];
}>();

provide(
  "cv-radio-group-value",
  computed(() => props.modelValue),
);
provide(
  "cv-radio-group-name",
  computed(() => props.name),
);
provide(
  "cv-radio-group-disabled",
  computed(() => props.disabled),
);
provide(
  "cv-radio-group-max",
  computed(() => props.max),
);

provide("cv-radio-group-set", (val: string | number | boolean) => {
  if (props.max === 1) {
    // Single-select: toggle (re-clicking the same item deselects it)
    const cur = props.modelValue as SingleValue;
    emit("update:modelValue", cur === val ? null : val);
  } else {
    // Multi-select: toggle val in/out of the array
    const cur = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const idx = cur.findIndex((v) => v === val);
    if (idx >= 0) {
      cur.splice(idx, 1);
      emit("update:modelValue", cur);
    } else if (props.max === 0 || cur.length < props.max) {
      emit("update:modelValue", [...cur, val]);
    }
    // at max and not already selected → ignore click
  }
});
</script>

<template>
  <fieldset
    :class="[
      'cv-radio-group',
      {
        'cv-radio-group--error': !!errorText,
        'cv-radio-group--disabled': disabled,
      },
    ]"
    :disabled="disabled"
  >
    <legend v-if="label" class="cv-radio-group__legend">{{ label }}</legend>
    <div class="cv-radio-group__items">
      <slot />
    </div>
    <p v-if="errorText" class="cv-radio-group__error">{{ errorText }}</p>
    <p v-else-if="helperText" class="cv-radio-group__helper">
      {{ helperText }}
    </p>
  </fieldset>
</template>

<style>
/* ── Fieldset reset ──────────────────────────────────────────── */
.cv-radio-group {
  border: none;
  padding: 0;
  margin: 0;
  min-width: 0;
  font-family: inherit;
}

.cv-radio-group--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Legend ──────────────────────────────────────────────────── */
.cv-radio-group__legend {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--cv-color-ghost-text, #374151);
  margin-bottom: 0.5rem;
  padding: 0;
}

/* ── Items ───────────────────────────────────────────────────── */
.cv-radio-group__items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* ── Helpers / errors ────────────────────────────────────────── */
.cv-radio-group__helper {
  margin-top: 0.35rem;
  font-size: 0.8125rem;
  color: var(--cv-color-text-muted, #6b7280);
}

.cv-radio-group__error {
  margin-top: 0.35rem;
  font-size: 0.8125rem;
  color: var(--cv-color-danger, #ef4444);
}
</style>
