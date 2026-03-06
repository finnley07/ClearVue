<script setup lang="ts">
import { inject, computed } from "vue";
import type { Ref } from "vue";

interface Props {
  id: string | number;
}

const props = defineProps<Props>();

const activeTab = inject<Ref<string | number>>("cv-tabs-active");
const isActive = computed(() => activeTab?.value === props.id);
</script>

<template>
  <div v-show="isActive" role="tabpanel" class="cv-tab-panel">
    <slot />
  </div>
</template>

<style>
.cv-tab-panel {
  animation: cv-tab-panel-in 0.15s ease;
}

@keyframes cv-tab-panel-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
