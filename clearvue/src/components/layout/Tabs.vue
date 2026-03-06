<script setup lang="ts">
import { ref, provide } from "vue";

interface Props {
  modelValue?: string | number;
  variant?: "line" | "pill";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "line",
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();

const activeTab = ref<string | number>(props.modelValue ?? "");

function setActive(id: string | number) {
  activeTab.value = id;
  emit("update:modelValue", id);
}

provide("cv-tabs-active", activeTab);
provide("cv-tabs-set-active", setActive);
provide("cv-tabs-variant", props.variant);
</script>

<template>
  <div :class="['cv-tabs', `cv-tabs--${variant}`]">
    <div class="cv-tabs__list" role="tablist">
      <slot name="tabs" />
    </div>
    <div class="cv-tabs__panels">
      <slot />
    </div>
  </div>
</template>

<style>
/* ── Tabs container ──────────────────────────────────────────── */
.cv-tabs {
  font-family: inherit;
}

/* ── Tab list ────────────────────────────────────────────────── */
.cv-tabs__list {
  display: flex;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.cv-tabs__list::-webkit-scrollbar {
  display: none;
}

/* ── Line variant ────────────────────────────────────────────── */
.cv-tabs--line .cv-tabs__list {
  border-bottom: 1px solid var(--cv-color-secondary, #e5e7eb);
  gap: 0;
}

/* ── Pill variant ────────────────────────────────────────────── */
.cv-tabs--pill .cv-tabs__list {
  background: var(--cv-color-secondary, #f1f5f9);
  padding: 0.25rem;
  border-radius: var(--cv-radius-btn, 8px);
  gap: 0.25rem;
  display: inline-flex;
}

/* ── Panels ──────────────────────────────────────────────────── */
.cv-tabs__panels {
  padding-top: 1rem;
}
</style>
