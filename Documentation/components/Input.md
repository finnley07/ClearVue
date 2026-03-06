# Input

Styled text input supporting all common HTML types, label, placeholder, helper/error text, and required state.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Input } from "clearvue";

const value = ref("");
</script>

<template>
  <Input v-model="value" label="Username" placeholder="Enter username" />
</template>
```

---

## Types

```vue
<Input type="email" label="Email" placeholder="you@example.com" />
<Input type="password" label="Password" />
<Input type="number" label="Age" />
<Input type="tel" label="Phone" />
<Input type="url" label="Website" />
<Input type="search" label="Search" />
```

---

## States

```vue
<!-- Helper text -->
<Input label="Email" helper-text="We'll never share your email." />

<!-- Error state -->
<Input label="Email" error-text="Please enter a valid email address." />

<!-- Disabled -->
<Input label="Username" value="alice" disabled />

<!-- Read-only -->
<Input label="ID" value="usr_001" readonly />

<!-- Required -->
<Input label="Name" required />
```

---

## Props

| Prop          | Type                                                                        | Default  | Description                           |
| ------------- | --------------------------------------------------------------------------- | -------- | ------------------------------------- |
| `modelValue`  | `string`                                                                    | —        | Bound value (`v-model`)               |
| `type`        | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | HTML input type                       |
| `label`       | `string`                                                                    | —        | Label above the input                 |
| `placeholder` | `string`                                                                    | —        | Placeholder text                      |
| `helperText`  | `string`                                                                    | —        | Hint shown below the input            |
| `errorText`   | `string`                                                                    | —        | Error message (also turns border red) |
| `disabled`    | `boolean`                                                                   | `false`  | Disable the input                     |
| `readonly`    | `boolean`                                                                   | `false`  | Read-only mode                        |
| `required`    | `boolean`                                                                   | `false`  | Marks the field as required (\*)      |

---

## Events

| Event               | Payload  | Description                  |
| ------------------- | -------- | ---------------------------- |
| `update:modelValue` | `string` | Emitted on every input event |

---

## Customisation

```css
/* Custom focus ring colour */
.cv-input:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px color-mix(in srgb, #f59e0b 15%, transparent);
}
```
