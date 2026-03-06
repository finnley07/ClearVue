# Avatar

User avatar that renders an image, initials, or a placeholder icon as a fallback — in that priority order. Supports five sizes and three shape variants.

---

## Basic Usage

```vue
<script setup lang="ts">
import { Avatar } from "clearvue";
</script>

<template>
  <!-- Image -->
  <Avatar src="/avatars/alice.jpg" alt="Alice Meyer" />

  <!-- Initials fallback -->
  <Avatar initials="AM" />

  <!-- Placeholder icon (no src, no initials) -->
  <Avatar />
</template>
```

---

## Sizes

```vue
<Avatar src="/img/user.jpg" size="xs" />
<Avatar src="/img/user.jpg" size="sm" />
<Avatar src="/img/user.jpg" size="md" />
<!-- default -->
<Avatar src="/img/user.jpg" size="lg" />
<Avatar src="/img/user.jpg" size="xl" />
```

---

## Shape Variants

```vue
<Avatar initials="JD" variant="circle" />
<!-- default — full circle -->
<Avatar initials="JD" variant="rounded" />
<!-- rounded corners -->
<Avatar initials="JD" variant="square" />
<!-- square -->
```

---

## Custom Background Colour

Override the background of the initials avatar with any CSS colour value.

```vue
<Avatar initials="TK" color="#6366f1" />
<Avatar initials="SM" color="#10b981" />
```

---

## Props

| Prop       | Type                                   | Default    | Description                                    |
| ---------- | -------------------------------------- | ---------- | ---------------------------------------------- |
| `src`      | `string`                               | —          | URL of the avatar image                        |
| `alt`      | `string`                               | `''`       | Alt text for the image (accessibility)         |
| `initials` | `string`                               | —          | 1–2 characters shown when no image is provided |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`     | Avatar size                                    |
| `variant`  | `'circle' \| 'rounded' \| 'square'`    | `'circle'` | Shape of the avatar                            |
| `color`    | `string`                               | —          | CSS colour for the initials background         |

---

## Customisation

```css
/* Custom size */
.cv-avatar--xl {
  width: 4rem;
  height: 4rem;
  font-size: 1.25rem;
}
```
