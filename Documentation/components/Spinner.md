# Spinner

Animated SVG loading indicator. Fully accessible via `role="status"` and a customisable `aria-label`. Available in five sizes.

---

## Basic Usage

```vue
<script setup lang="ts">
import { Spinner } from "clearvue";
</script>

<template>
  <Spinner />
</template>
```

---

## Sizes

```vue
<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<!-- default -->
<Spinner size="lg" />
<Spinner size="xl" />
```

---

## Custom Label

The `label` prop is read by screen readers via `aria-label`. Override it when the default "Loading…" is not descriptive enough.

```vue
<Spinner label="Fetching user data" />
<Spinner label="Saving changes" size="sm" />
```

---

## Inline Loading State

```vue
<div style="display: flex; align-items: center; gap: 0.5rem">
  <Spinner size="sm" label="Saving" />
  <span>Saving changes…</span>
</div>
```

---

## Props

| Prop    | Type                                   | Default      | Description                        |
| ------- | -------------------------------------- | ------------ | ---------------------------------- |
| `size`  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`       | Diameter of the spinner            |
| `label` | `string`                               | `'Loading…'` | Screen-reader label (`aria-label`) |

---

## Customisation

```css
/* Change the spinner colour */
.cv-spinner__arc {
  stroke: #f59e0b;
}

/* Change the track (bg ring) colour */
.cv-spinner__track {
  stroke: #fef3c7;
}
```
