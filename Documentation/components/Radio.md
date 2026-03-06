# Radio & RadioGroup

Styled radio buttons for single-selection or multi-selection (with a configurable cap). `Radio` can be used standalone or composed inside a `RadioGroup`.

---

## Basic Usage — Single Select (default)

```vue
<script setup lang="ts">
import { ref } from "vue";
import { RadioGroup, Radio } from "clearvue";

const framework = ref("vue");
</script>

<template>
  <RadioGroup v-model="framework" label="Favourite framework" name="fw">
    <Radio value="vue" label="Vue 3" />
    <Radio value="react" label="React" helper-text="A JavaScript library" />
    <Radio value="svelte" label="Svelte" />
  </RadioGroup>
</template>
```

Clicking an already-selected radio deselects it (sets the value to `null`).

---

## Multi-Select

Set `max` to allow more than one selection. The `v-model` value becomes an **array**.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { RadioGroup, Radio } from "clearvue";

const picks = ref<string[]>(["vue"]);
</script>

<template>
  <!-- Unlimited -->
  <RadioGroup v-model="picks" :max="0" label="Pick any frameworks">
    <Radio value="vue" label="Vue 3" />
    <Radio value="react" label="React" />
    <Radio value="svelte" label="Svelte" />
    <Radio value="angular" label="Angular" />
  </RadioGroup>

  <!-- At most 2 -->
  <RadioGroup v-model="picks" :max="2" label="Pick up to 2">
    <Radio value="vue" label="Vue 3" />
    <Radio value="react" label="React" />
    <Radio value="svelte" label="Svelte" />
    <Radio value="angular" label="Angular" />
  </RadioGroup>
</template>
```

When the limit is reached, unchecked items are automatically disabled visually.

---

## Error & Helper Text

```vue
<RadioGroup
  v-model="selected"
  label="Pick a tier"
  error-text="Please select a subscription tier."
  name="tier"
>
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
</RadioGroup>
```

---

## Disabled Group

```vue
<RadioGroup v-model="val" label="Locked" disabled name="locked">
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
</RadioGroup>
```

---

## Standalone Radio

`Radio` also works without a `RadioGroup` — use `v-model` directly on it.

```vue
<Radio v-model="accept" :value="true" label="I agree" />
```

---

## RadioGroup Props

| Prop         | Type                                           | Default | Description                                                           |
| ------------ | ---------------------------------------------- | ------- | --------------------------------------------------------------------- |
| `modelValue` | `string \| number \| boolean \| null \| Array` | —       | Current selection. Scalar for `max=1`, array for `max>1`. (`v-model`) |
| `label`      | `string`                                       | —       | Legend text displayed above the group                                 |
| `helperText` | `string`                                       | —       | Hint shown below the group                                            |
| `errorText`  | `string`                                       | —       | Error message (shown in red)                                          |
| `name`       | `string`                                       | —       | HTML `name` attribute shared by all radios in the group               |
| `disabled`   | `boolean`                                      | `false` | Disable all radios in the group                                       |
| `max`        | `number`                                       | `1`     | Max selections. `1` = single-select, `0` = unlimited, `n` = at most n |

---

## Radio Props

| Prop         | Type                                           | Default | Description                                   |
| ------------ | ---------------------------------------------- | ------- | --------------------------------------------- |
| `value`      | `string \| number \| boolean`                  | —       | **Required.** The value this radio represents |
| `modelValue` | `string \| number \| boolean \| Array \| null` | —       | Used when the radio is standalone (`v-model`) |
| `label`      | `string`                                       | —       | Label text                                    |
| `helperText` | `string`                                       | —       | Small hint below the label                    |
| `disabled`   | `boolean`                                      | `false` | Disable this specific radio                   |
| `name`       | `string`                                       | —       | HTML `name` (overridden by the group's name)  |

---

## Events

Both components emit the same event:

| Event               | Payload                                        | Description                    |
| ------------------- | ---------------------------------------------- | ------------------------------ |
| `update:modelValue` | `string \| number \| boolean \| null \| Array` | Emitted when selection changes |

---

## Customisation

```css
/* Active radio colour */
.cv-radio__input:checked ~ .cv-radio__circle {
  background: #f59e0b;
  border-color: #f59e0b;
}
```
