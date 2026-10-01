<script setup lang="ts">
import { inject, computed } from "vue";
import type { Ref } from "vue";

interface Props {
  id: string | number;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const activeTab = inject<Ref<string | number>>("cv-tabs-active");
const setActive = inject<(id: string | number) => void>("cv-tabs-set-active");
const variant = inject<Ref<string>>("cv-tabs-variant");

const isActive = computed(() => activeTab?.value === props.id);
</script>

<template>
  <button
    role="tab"
    type="button"
    :id="`cv-tab-${id}`"
    :aria-selected="isActive"
    :aria-controls="`cv-tabpanel-${id}`"
    :tabindex="isActive ? 0 : -1"
    :disabled="disabled"
    :class="[
      'cv-tab',
      `cv-tab--${variant ?? 'line'}`,
      { 'cv-tab--active': isActive, 'cv-tab--disabled': disabled },
    ]"
    @click="!disabled && setActive?.(id)"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<style>
/* ── Base tab button ─────────────────────────────────────────── */
.cv-tab {
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  background: none;
  border: none;
  transition:
    color 0.15s,
    background 0.15s,
    box-shadow 0.15s;
  white-space: nowrap;
  outline: none;
}

.cv-tab--disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.cv-tab:focus-visible {
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--cv-color-focus-ring, #6366f1) 30%, transparent);
}

/* ── Line variant ────────────────────────────────────────────── */
.cv-tab--line {
  padding: 0.6rem 1rem;
  color: var(--cv-color-text-muted, #6b7280);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  border-radius: 4px 4px 0 0;
}

.cv-tab--line:hover:not(.cv-tab--disabled) {
  color: var(--cv-color-primary, #6366f1);
}

.cv-tab--line.cv-tab--active {
  color: var(--cv-color-primary, #6366f1);
  border-bottom-color: var(--cv-color-primary, #6366f1);
}

/* ── Pill variant ────────────────────────────────────────────── */
.cv-tab--pill {
  padding: 0.4rem 0.9rem;
  color: var(--cv-color-text-muted, #6b7280);
  border-radius: calc(var(--cv-radius-btn, 8px) - 2px);
}

.cv-tab--pill:hover:not(.cv-tab--disabled) {
  color: var(--cv-color-ghost-text, #374151);
  background: var(--cv-color-ghost-bg-hover, rgba(0, 0, 0, 0.04));
}

.cv-tab--pill.cv-tab--active {
  background: var(--cv-color-surface, #fff);
  color: var(--cv-color-primary, #6366f1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
