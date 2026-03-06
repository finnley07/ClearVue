# Modal

Dialog overlay rendered via Vue's `<Teleport>` into `<body>`. Supports five sizes, optional close-on-backdrop and close-on-Escape behaviour, and header/body/footer slots with a built-in close button.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Modal, Button } from "clearvue";

const open = ref(false);
</script>

<template>
  <Button @click="open = true">Open Modal</Button>

  <Modal v-model="open" title="Confirm action">
    <p>Are you sure you want to continue?</p>

    <template #footer>
      <Button variant="ghost" @click="open = false">Cancel</Button>
      <Button variant="danger" @click="open = false">Delete</Button>
    </template>
  </Modal>
</template>
```

---

## Sizes

```vue
<Modal v-model="open" size="sm" title="Small">…</Modal>
<Modal v-model="open" size="md" title="Medium (default)">…</Modal>
<Modal v-model="open" size="lg" title="Large">…</Modal>
<Modal v-model="open" size="xl" title="Extra large">…</Modal>
<Modal v-model="open" size="full" title="Full screen">…</Modal>
```

---

## Custom Header

Override the default title bar with the `#header` slot.

```vue
<Modal v-model="open">
  <template #header>
    <div style="display: flex; align-items: center; gap: 0.5rem">
      <Avatar initials="NF" size="sm" />
      <strong>User Profile</strong>
    </div>
  </template>
  …
</Modal>
```

---

## Disable Auto-close Behaviour

```vue
<!-- Only closeable via the header X button -->
<Modal
  v-model="open"
  title="Important"
  :close-on-backdrop="false"
  :close-on-esc="false"
>
  You must explicitly click Close.
  <template #footer>
    <Button @click="open = false">Close</Button>
  </template>
</Modal>
```

---

## Props

| Prop              | Type                                     | Default | Description                                   |
| ----------------- | ---------------------------------------- | ------- | --------------------------------------------- |
| `modelValue`      | `boolean`                                | —       | **Required.** Controls visibility (`v-model`) |
| `title`           | `string`                                 | —       | Title text in the header bar                  |
| `size`            | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`  | Width of the dialog                           |
| `closeOnBackdrop` | `boolean`                                | `true`  | Click outside the panel to close              |
| `closeOnEsc`      | `boolean`                                | `true`  | Press Escape to close                         |

---

## Events

| Event               | Payload   | Description                         |
| ------------------- | --------- | ----------------------------------- |
| `update:modelValue` | `boolean` | Emitted when the modal should close |

---

## Slots

| Slot      | Description                                              |
| --------- | -------------------------------------------------------- |
| `default` | Main body content                                        |
| `header`  | Replaces the default title + close button row            |
| `footer`  | Action bar at the bottom (e.g. Cancel / Confirm buttons) |

---

## Customisation

```css
/* Wider modal on large screens */
.cv-modal--lg {
  max-width: 900px;
}

/* Custom backdrop blur */
.cv-modal-backdrop {
  backdrop-filter: blur(6px);
}
```
