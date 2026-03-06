# Tabs / Tab / TabPanel

A three-part tab component — `Tabs` is the container, `Tab` renders the clickable trigger, and `TabPanel` renders the corresponding content. Communication between the three is handled internally via `provide`/`inject`. Two visual variants are available: `line` (underline) and `pill`.

---

## Basic Usage

```vue
<script setup lang="ts">
import { Tabs, Tab, TabPanel } from "clearvue";
</script>

<template>
  <Tabs>
    <template #tabs>
      <Tab id="overview" label="Overview" />
      <Tab id="settings" label="Settings" />
      <Tab id="billing" label="Billing" />
    </template>

    <TabPanel id="overview">Overview content…</TabPanel>
    <TabPanel id="settings">Settings content…</TabPanel>
    <TabPanel id="billing">Billing content…</TabPanel>
  </Tabs>
</template>
```

The first `Tab` is selected by default; set a `modelValue` / `v-model` to control the initial tab programmatically.

---

## Pill Variant

```vue
<Tabs variant="pill">
  <template #tabs>
    <Tab id="a" label="Tab A" />
    <Tab id="b" label="Tab B" />
  </template>
  <TabPanel id="a">A</TabPanel>
  <TabPanel id="b">B</TabPanel>
</Tabs>
```

---

## Controlled (v-model)

```vue
<script setup lang="ts">
import { ref } from "vue";
const active = ref("settings");
</script>

<template>
  <Tabs v-model="active">
    <template #tabs>
      <Tab id="overview" label="Overview" />
      <Tab id="settings" label="Settings" />
    </template>
    <TabPanel id="overview">…</TabPanel>
    <TabPanel id="settings">…</TabPanel>
  </Tabs>
</template>
```

---

## Disabled Tab

```vue
<Tab id="admin" label="Admin" disabled />
```

---

## Tabs Props

| Prop         | Type               | Default  | Description                                |
| ------------ | ------------------ | -------- | ------------------------------------------ |
| `modelValue` | `string \| number` | —        | ID of the initially active tab (`v-model`) |
| `variant`    | `'line' \| 'pill'` | `'line'` | Visual style of the tab list               |

## Tab Props

| Prop       | Type               | Default | Description                         |
| ---------- | ------------------ | ------- | ----------------------------------- |
| `id`       | `string \| number` | —       | **Required.** Unique tab identifier |
| `label`    | `string`           | —       | **Required.** Text shown in the tab |
| `disabled` | `boolean`          | `false` | Disable this tab                    |

## TabPanel Props

| Prop | Type               | Default | Description                                           |
| ---- | ------------------ | ------- | ----------------------------------------------------- |
| `id` | `string \| number` | —       | **Required.** Must match the corresponding `Tab` `id` |

---

## Tabs Events

| Event               | Payload            | Description                         |
| ------------------- | ------------------ | ----------------------------------- |
| `update:modelValue` | `string \| number` | Emitted when the active tab changes |

---

## Slots

### Tabs

| Slot      | Description                        |
| --------- | ---------------------------------- |
| `tabs`    | Place `<Tab>` components here      |
| `default` | Place `<TabPanel>` components here |

### TabPanel

| Slot      | Description            |
| --------- | ---------------------- |
| `default` | Content for this panel |

---

## Customisation

```css
/* Active tab colour (line variant) */
.cv-tabs--line .cv-tab--line[aria-selected="true"] {
  color: #f59e0b;
  border-bottom-color: #f59e0b;
}

/* Active pill colour */
.cv-tabs--pill .cv-tab--pill[aria-selected="true"] {
  background: #f59e0b;
  color: #fff;
}
```
