# Switch

Toggle switch (on/off), functionally equivalent to a checkbox but with a slide-track visual. Available in two sizes.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Switch } from "clearvue";

const enabled = ref(false);
</script>

<template>
  <Switch v-model="enabled" label="Enable notifications" />
</template>
```

---

## Sizes

```vue
<Switch v-model="a" size="sm" label="Small" />
<Switch v-model="b" size="md" label="Medium (default)" />
```

---

## Helper Text

```vue
<Switch
  v-model="darkMode"
  label="Dark mode"
  helper-text="Applies immediately across the whole app."
/>
```

---

## Disabled

```vue
<Switch label="Disabled (off)" disabled />
<Switch :model-value="true" label="Disabled (on)" disabled />
```

---

## Props

| Prop         | Type           | Default | Description                     |
| ------------ | -------------- | ------- | ------------------------------- |
| `modelValue` | `boolean`      | `false` | Toggle state (`v-model`)        |
| `label`      | `string`       | —       | Label rendered beside the track |
| `helperText` | `string`       | —       | Small hint below the label      |
| `disabled`   | `boolean`      | `false` | Disable the switch              |
| `size`       | `'sm' \| 'md'` | `'md'`  | Size of the track and thumb     |

---

## Events

| Event               | Payload   | Description                     |
| ------------------- | --------- | ------------------------------- |
| `update:modelValue` | `boolean` | Emitted when the switch toggles |

---

## Slots

| Slot      | Description                                        |
| --------- | -------------------------------------------------- |
| `default` | Replaces the `label` prop if you need rich content |

---

## Customisation

```css
/* Custom track colour when active */
.cv-switch__input:checked ~ .cv-switch__track {
  background: #f59e0b;
}
```
