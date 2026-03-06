# DataTable

Generic, fully typed data table with column configuration, client-side sorting, loading overlay, empty state, and custom cell slots. Works with any object type via TypeScript generics.

---

## Basic Usage

```vue
<script setup lang="ts">
import { DataTable } from "clearvue";
import type { DataTableColumn } from "clearvue";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: DataTableColumn<User>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role" },
];

const rows: User[] = [
  { id: 1, name: "Alice Meyer", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Schmidt", email: "bob@example.com", role: "Editor" },
  { id: 3, name: "Clara Müller", email: "clara@example.com", role: "Viewer" },
];
</script>

<template>
  <DataTable :columns="columns" :rows="rows" row-key="id" />
</template>
```

---

## Striped Rows

```vue
<DataTable :columns="columns" :rows="rows" striped />
```

---

## Loading State

```vue
<script setup lang="ts">
import { ref } from "vue";
const loading = ref(false);
</script>

<template>
  <Button @click="loading = true">Simulate load</Button>
  <DataTable :columns="columns" :rows="rows" :loading="loading" />
</template>
```

---

## Custom Cell Rendering

Use the `#cell-{key}` slot to override how a specific column is rendered. The slot receives `value` (the formatted cell value) and `row` (the full row object).

```vue
<DataTable :columns="columns" :rows="rows">
  <template #cell-status="{ value, row }">
    <Badge :variant="value === 'Active' ? 'success' : 'neutral'">
      {{ value }}
    </Badge>
  </template>
</DataTable>
```

---

## `format` Column Callback

Transform a value before rendering without a slot.

```ts
const columns: DataTableColumn<User>[] = [
  {
    key: "joined",
    label: "Joined",
    sortable: true,
    format: (row) => new Date(row.joined).toLocaleDateString("de-DE"),
  },
];
```

---

## Row Click Event

```vue
<DataTable
  :columns="columns"
  :rows="rows"
  @row-click="(row) => console.log(row)"
/>
```

---

## Props

| Prop        | Type                   | Default                | Description                           |
| ----------- | ---------------------- | ---------------------- | ------------------------------------- |
| `columns`   | `DataTableColumn<T>[]` | —                      | **Required.** Column definitions      |
| `rows`      | `T[]`                  | —                      | **Required.** Array of data objects   |
| `rowKey`    | `string`               | `'id'`                 | Key used for `:key` binding on `<tr>` |
| `striped`   | `boolean`              | `false`                | Alternating row background            |
| `hoverable` | `boolean`              | `true`                 | Highlight row on hover                |
| `loading`   | `boolean`              | `false`                | Show a loading overlay with a spinner |
| `emptyText` | `string`               | `'No data available.'` | Message shown when `rows` is empty    |

---

## `DataTableColumn<T>` Type

```ts
interface DataTableColumn<T = object> {
  key: string; // property key to read from each row
  label: string; // column header text
  sortable?: boolean; // enable click-to-sort on this column
  width?: string; // CSS width, e.g. "120px" or "20%"
  align?: "left" | "center" | "right";
  format?: (row: T) => string | number; // custom value transform
}
```

---

## Events

| Event       | Payload | Description                           |
| ----------- | ------- | ------------------------------------- |
| `row-click` | `T`     | Emitted when the user clicks on a row |

---

## Slots

| Slot          | Slot Props       | Description                                     |
| ------------- | ---------------- | ----------------------------------------------- |
| `#cell-{key}` | `{ value, row }` | Override the cell content for a specific column |

---

## Customisation

```css
/* Striped row colour */
.cv-table tbody tr:nth-child(even) {
  background: #f8fafc;
}

/* Custom header background */
.cv-table thead tr {
  background: var(--cv-color-primary);
  color: #fff;
}
```
