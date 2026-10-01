<script setup lang="ts">
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarVariant = "circle" | "rounded" | "square";

interface Props {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  /** Any CSS colour used as the background of the initials / placeholder */
  color?: string;
}

withDefaults(defineProps<Props>(), {
  size: "md",
  variant: "circle",
  alt: "",
});
</script>

<template>
  <span
    :class="['cv-avatar', `cv-avatar--${size}`, `cv-avatar--${variant}`]"
    :style="!src && color ? { background: color } : undefined"
    :role="alt ? 'img' : undefined"
    :aria-label="alt || undefined"
    :aria-hidden="alt ? undefined : true"
  >
    <img
      v-if="src"
      class="cv-avatar__img"
      :src="src"
      alt=""
      draggable="false"
    />
    <span v-else-if="initials" class="cv-avatar__initials">
      {{ initials.slice(0, 2).toUpperCase() }}
    </span>
    <svg
      v-else
      class="cv-avatar__placeholder"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5ZM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17Z"
      />
    </svg>
  </span>
</template>

<style>
/* ── Base ────────────────────────────────────────────────────── */
.cv-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--cv-color-primary, #6366f1) 15%, #e0e7ff);
  color: var(--cv-color-primary, #6366f1);
  font-family: inherit;
  font-weight: 600;
  flex-shrink: 0;
  overflow: hidden;
  user-select: none;
}

/* ── Sizes ───────────────────────────────────────────────────── */
.cv-avatar--xs {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.55rem;
}
.cv-avatar--sm {
  width: 2rem;
  height: 2rem;
  font-size: 0.7rem;
}
.cv-avatar--md {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 0.875rem;
}
.cv-avatar--lg {
  width: 3.25rem;
  height: 3.25rem;
  font-size: 1.1rem;
}
.cv-avatar--xl {
  width: 4rem;
  height: 4rem;
  font-size: 1.35rem;
}

/* ── Shape variants ──────────────────────────────────────────── */
.cv-avatar--circle {
  border-radius: 50%;
}
.cv-avatar--rounded {
  border-radius: var(--cv-radius-btn, 8px);
}
.cv-avatar--square {
  border-radius: 0;
}

/* ── Image ───────────────────────────────────────────────────── */
.cv-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Placeholder icon ────────────────────────────────────────── */
.cv-avatar__placeholder {
  width: 55%;
  height: 55%;
  opacity: 0.6;
}
</style>
