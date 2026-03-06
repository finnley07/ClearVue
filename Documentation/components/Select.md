# Select

Native `<select>` wrapper with label, placeholder, helper/error text, and per-option disabled state.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Select } from "clearvue";
import type { SelectOption } from "clearvue";

const value = ref("");

const options: SelectOption[] = [
  { label: "Vue 3", value: "vue" },
  { label: "React", value: "react" },
  { label: "Svelte", value: "svelte" },
];
</script>

<template>
  <Select
    v-model="value"
    :options="options"
    label="Framework"
    placeholder="Choose one…"
  />
</template>
```

---

## Disabled Options

Mark individual options as unavailable by setting `disabled: true` on the option object.

```ts
const options: SelectOption[] = [
  { label: "Vue 3", value: "vue" },
  { label: "Angular", value: "angular", disabled: true },
];
```

---

## Error & Required

```vue
<!-- Required with conditional error -->
<Select
  v-model="value"
  :options="options"
  label="Framework"
  placeholder="Choose one…"
  required
  :error-text="value ? undefined : 'Please make a selection.'"
/>

<!-- Always in error state (e.g. after failed validation) -->
<Select
  :options="options"
  label="Framework"
  error-text="This field is required."
/>
```

---

## Disabled

```vue
<Select :options="options" label="Framework" disabled />
```

---

## Props

| Prop          | Type               | Default | Description                           |
| ------------- | ------------------ | ------- | ------------------------------------- |
| `modelValue`  | `string \| number` | —       | Selected value (`v-model`)            |
| `options`     | `SelectOption[]`   | `[]`    | List of selectable options            |
| `label`       | `string`           | —       | Label above the select                |
| `placeholder` | `string`           | —       | First disabled option used as hint    |
| `helperText`  | `string`           | —       | Hint shown below the select           |
| `errorText`   | `string`           | —       | Error message (also turns border red) |
| `disabled`    | `boolean`          | `false` | Disable the entire control            |
| `required`    | `boolean`          | `false` | Marks the field as required (\*)      |

---

## `SelectOption` Type

```ts
interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}
```

---

## Events

| Event               | Payload            | Description                        |
| ------------------- | ------------------ | ---------------------------------- |
| `update:modelValue` | `string \| number` | Emitted when the selection changes |

---

## Customisation

```css
/* Custom focus ring */
.cv-select:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px color-mix(in srgb, #f59e0b 15%, transparent);
}
```
