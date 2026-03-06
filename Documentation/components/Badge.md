# Badge

Small status or label pill. Supports six colour variants, two sizes, and an optional leading dot.

---

## Basic Usage

```vue
<script setup lang="ts">
import { Badge } from "clearvue";
</script>

<template>
  <Badge>Primary</Badge>
  <Badge variant="success">Active</Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="danger">Error</Badge>
  <Badge variant="secondary">Beta</Badge>
  <Badge variant="neutral">Archived</Badge>
</template>
```

---

## With Dot

```vue
<Badge variant="success" dot>Online</Badge>
<Badge variant="danger" dot>Offline</Badge>
```

---

## Sizes

```vue
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
```

---

## Props

| Prop      | Type                                                                          | Default     | Description                     |
| --------- | ----------------------------------------------------------------------------- | ----------- | ------------------------------- |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'primary'` | Colour variant                  |
| `size`    | `'sm' \| 'md'`                                                                | `'md'`      | Size                            |
| `dot`     | `boolean`                                                                     | `false`     | Show a coloured dot on the left |

---

## Slots

| Slot      | Description      |
| --------- | ---------------- |
| `default` | Badge label text |

---

## Customisation

```css
/* Change the success variant colours */
.cv-badge--success {
  background: #d1fae5;
  color: #065f46;
}
```
