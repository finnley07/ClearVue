# Checkbox

Binary toggle input with label, helper/error text, and an indeterminate state.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Checkbox } from "clearvue";

const accepted = ref(false);
</script>

<template>
  <Checkbox v-model="accepted" label="I accept the terms" />
</template>
```

---

## With Helper / Error Text

```vue
<Checkbox
  v-model="newsletter"
  label="Subscribe to newsletter"
  helper-text="You can unsubscribe at any time."
/>

<Checkbox
  v-model="agreed"
  label="I agree to the privacy policy"
  error-text="You must accept before continuing."
/>
```

---

## Indeterminate State

Useful for "select-all" checkboxes where only some children are checked.

```vue
<script setup lang="ts">
import { ref, computed } from "vue";
import { Checkbox } from "clearvue";

const items = ref([false, false, false]);

const allChecked = computed(() => items.value.every(Boolean));
const someChecked = computed(
  () => items.value.some(Boolean) && !allChecked.value,
);

function toggleAll(v: boolean) {
  items.value = items.value.map(() => v);
}
</script>

<template>
  <Checkbox
    :model-value="allChecked"
    :indeterminate="someChecked"
    label="Select all"
    @update:model-value="toggleAll"
  />
  <Checkbox
    v-for="(_, i) in items"
    :key="i"
    v-model="items[i]"
    :label="`Item ${i + 1}`"
  />
</template>
```

---

## Disabled

```vue
<Checkbox label="Disabled (unchecked)" disabled />
<Checkbox :model-value="true" label="Disabled (checked)" disabled />
```

---

## Props

| Prop            | Type      | Default | Description                                       |
| --------------- | --------- | ------- | ------------------------------------------------- |
| `modelValue`    | `boolean` | `false` | Checked state (`v-model`)                         |
| `label`         | `string`  | —       | Label text                                        |
| `helperText`    | `string`  | —       | Hint shown below the checkbox                     |
| `errorText`     | `string`  | —       | Error message (also turns the box red)            |
| `disabled`      | `boolean` | `false` | Disable the checkbox                              |
| `indeterminate` | `boolean` | `false` | Show an indeterminate (–) state instead of a tick |

---

## Events

| Event               | Payload   | Description                    |
| ------------------- | --------- | ------------------------------ |
| `update:modelValue` | `boolean` | Emitted when the state changes |

---

## Customisation

```css
/* Change the checked colour */
.cv-checkbox__input:checked ~ .cv-checkbox__box {
  background: #f59e0b;
  border-color: #f59e0b;
}
```
