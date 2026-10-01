<script setup lang="ts">
import { ref, provide, computed, watch } from "vue";

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
provide(
  "cv-tabs-variant",
  computed(() => props.variant),
);

// Keep the internal state in sync when the parent changes v-model
watch(
  () => props.modelValue,
  (v) => {
    if (v !== undefined) activeTab.value = v;
  },
);

// WAI-ARIA tabs keyboard support: arrows, Home, End
function onKeydown(e: KeyboardEvent) {
  const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
  if (!keys.includes(e.key)) return;
  const tabs = Array.from(
    (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(
      '[role="tab"]:not([disabled])',
    ),
  );
  if (!tabs.length) return;
  const current = tabs.indexOf(document.activeElement as HTMLElement);
  let next = current;
  if (e.key === "ArrowRight") next = (current + 1) % tabs.length;
  else if (e.key === "ArrowLeft")
    next = (current - 1 + tabs.length) % tabs.length;
  else if (e.key === "Home") next = 0;
  else next = tabs.length - 1;
  e.preventDefault();
  tabs[next]!.focus();
  tabs[next]!.click();
}
</script>

<template>
  <div :class="['cv-tabs', `cv-tabs--${variant}`]">
    <div class="cv-tabs__list" role="tablist" @keydown="onKeydown">
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
