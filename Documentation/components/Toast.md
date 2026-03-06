# Toast

Inline popup message component for feedback, alerts, and status notifications. Supports five variants and an optional dismiss button.

---

## Basic Usage

```vue
<script setup lang="ts">
import { Toast } from "clearvue";
</script>

<template>
  <Toast>Something happened.</Toast>
  <Toast variant="info" title="Did you know?"
    >You can customise the theme.</Toast
  >
  <Toast variant="success" title="Saved!">Your changes have been saved.</Toast>
  <Toast variant="warning" title="Heads up"
    >This action cannot be undone easily.</Toast
  >
  <Toast variant="error" title="Error"
    >Something went wrong. Please try again.</Toast
  >
</template>
```

---

## Dismissible

Set `dismissible` to show a close button. Listen to the `dismiss` event to hide the toast.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Toast } from "clearvue";

const visible = ref(true);
</script>

<template>
  <Toast
    v-if="visible"
    variant="info"
    title="New update available"
    dismissible
    @dismiss="visible = false"
  >
    Reload the page to get the latest version.
  </Toast>
</template>
```

---

## Props

| Prop          | Type                                             | Default   | Description                             |
| ------------- | ------------------------------------------------ | --------- | --------------------------------------- |
| `variant`     | `default \| info \| warning \| error \| success` | `default` | Visual style of the toast               |
| `title`       | `string`                                         | —         | Optional bold heading above the message |
| `dismissible` | `boolean`                                        | `false`   | Shows a close (×) button                |

---

## Events

| Event     | Payload | Description                              |
| --------- | ------- | ---------------------------------------- |
| `dismiss` | —       | Emitted when the close button is clicked |

---

## Slots

| Slot      | Description           |
| --------- | --------------------- |
| `default` | The message body text |

---

## Variants

| Variant   | Use case                                  |
| --------- | ----------------------------------------- |
| `default` | Neutral / general information             |
| `info`    | Informational hints or tips               |
| `success` | Confirmation of a successful action       |
| `warning` | Non-critical warnings requiring attention |
| `error`   | Errors or failed operations               |
