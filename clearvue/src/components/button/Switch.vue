<script setup lang="ts">
interface Props {
  modelValue?: boolean;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  size?: "sm" | "md";
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  size: "md",
});

defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>

<template>
  <label
    :class="[
      'cv-switch',
      `cv-switch--${size}`,
      { 'cv-switch--disabled': disabled },
    ]"
  >
    <span class="cv-switch__track-wrap">
      <input
        type="checkbox"
        role="switch"
        class="cv-switch__input"
        :checked="modelValue"
        :disabled="disabled"
        @change="
          $emit(
            'update:modelValue',
            ($event.target as HTMLInputElement).checked,
          )
        "
      />
      <span class="cv-switch__track" aria-hidden="true">
        <span class="cv-switch__thumb" />
      </span>
    </span>
    <span v-if="label || $slots.default" class="cv-switch__label-text">
      <slot>{{ label }}</slot>
      <span v-if="helperText" class="cv-switch__helper">{{ helperText }}</span>
    </span>
  </label>
</template>

<style>
/* ── Wrapper ─────────────────────────────────────────────────── */
.cv-switch {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.65rem;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9375rem;
  color: var(--cv-color-ghost-text, #374151);
  user-select: none;
}

.cv-switch--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Track wrapper (holds hidden input + visual track) ───────── */
.cv-switch__track-wrap {
  position: relative;
  flex-shrink: 0;
}

.cv-switch__input {
  position: absolute;
  inset: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: inherit;
}

/* ── Track ───────────────────────────────────────────────────── */
.cv-switch__track {
  display: flex;
  align-items: center;
  border-radius: 999px;
  background: var(--cv-color-secondary, #d1d5db);
  transition:
    background 0.2s,
    box-shadow 0.15s;
  pointer-events: none;
}

/* Sizes */
.cv-switch--md .cv-switch__track {
  width: 2.5rem;
  height: 1.375rem;
  padding: 0.1875rem;
}

.cv-switch--sm .cv-switch__track {
  width: 1.875rem;
  height: 1.0625rem;
  padding: 0.125rem;
}

/* ── Thumb ───────────────────────────────────────────────────── */
.cv-switch__thumb {
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s;
  flex-shrink: 0;
}

.cv-switch--md .cv-switch__thumb {
  width: 1rem;
  height: 1rem;
}

.cv-switch--sm .cv-switch__thumb {
  width: 0.8125rem;
  height: 0.8125rem;
}

/* Checked */
.cv-switch__input:checked ~ .cv-switch__track {
  background: var(--cv-color-primary, #6366f1);
}

.cv-switch--md .cv-switch__input:checked ~ .cv-switch__track .cv-switch__thumb {
  transform: translateX(1.125rem);
}

.cv-switch--sm .cv-switch__input:checked ~ .cv-switch__track .cv-switch__thumb {
  transform: translateX(0.8125rem);
}

/* Focus ring */
.cv-switch__input:focus-visible ~ .cv-switch__track {
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--cv-color-focus-ring, #6366f1) 25%, transparent);
}

/* ── Label helpers ───────────────────────────────────────────── */
.cv-switch__label-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding-top: 0.1rem;
}

.cv-switch__helper {
  font-size: 0.8125rem;
  color: var(--cv-color-text-muted, #6b7280);
}
</style>
