# Card

General-purpose container with optional header, body, and footer slots. Supports adjustable padding, a drop shadow, and a border.

---

## Basic Usage

```vue
<script setup lang="ts">
import { Card } from "clearvue";
</script>

<template>
  <Card>
    <p>Simple card with default padding and border.</p>
  </Card>
</template>
```

---

## With Header & Footer

```vue
<Card>
  <template #header>
    <h2>Card Title</h2>
    <span>Subtitle</span>
  </template>

  <p>Main content goes here.</p>

  <template #footer>
    <Button size="sm">Save</Button>
  </template>
</Card>
```

---

## Shadow & No Border

```vue
<Card shadow :border="false">
  Elevated card without a visible border.
</Card>
```

---

## Props

| Prop      | Type                             | Default | Description                   |
| --------- | -------------------------------- | ------- | ----------------------------- |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'`  | Inner padding size            |
| `shadow`  | `boolean`                        | `false` | Apply a drop shadow           |
| `border`  | `boolean`                        | `true`  | Show a border around the card |

---

## Slots

| Slot      | Description                                  |
| --------- | -------------------------------------------- |
| `default` | Card body content                            |
| `header`  | Optional top section (rendered inside a div) |
| `footer`  | Optional bottom section                      |

---

## Customisation

```css
/* Increase border radius for all cards */
.cv-card {
  border-radius: 16px;
}

/* Custom shadow */
.cv-card--shadow {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}
```
