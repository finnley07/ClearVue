<script setup lang="ts" generic="T extends object">
import { ref, computed } from "vue";

export interface DataTableColumn<T = object> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  /** Custom cell renderer – receives the row object, returns a display value */
  format?: (row: T) => string | number;
}

interface Props {
  columns: DataTableColumn<T>[];
  rows: T[];
  /** Row identifier key used for :key bindings */
  rowKey?: string;
  striped?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  emptyText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  rowKey: "id",
  striped: false,
  hoverable: true,
  loading: false,
  emptyText: "No data available.",
});

const emit = defineEmits<{
  "row-click": [row: T];
}>();

// ── Sorting ──────────────────────────────────────────────────
const sortKey = ref<string | null>(null);
const sortDir = ref<"asc" | "desc">("asc");

function toggleSort(col: DataTableColumn<T>) {
  if (!col.sortable) return;
  if (sortKey.value === col.key) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = col.key;
    sortDir.value = "asc";
  }
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows;
  const key = sortKey.value;
  return [...props.rows].sort((a, b) => {
    const av = (a as Record<string, unknown>)[key];
    const bv = (b as Record<string, unknown>)[key];
    let cmp = 0;
    if (typeof av === "number" && typeof bv === "number") {
      cmp = av - bv;
    } else {
      cmp = String(av ?? "").localeCompare(String(bv ?? ""));
    }
    return sortDir.value === "asc" ? cmp : -cmp;
  });
});

function ariaSort(col: DataTableColumn<T>) {
  if (!col.sortable) return undefined;
  if (sortKey.value !== col.key) return "none";
  return sortDir.value === "asc" ? "ascending" : "descending";
}

function cellValue(row: T, col: DataTableColumn<T>): string | number {
  if (col.format) return col.format(row);
  const val = (row as Record<string, unknown>)[col.key];
  return val == null ? "—" : (val as string | number);
}
</script>

<template>
  <div :class="['cv-table-wrap', { 'cv-table-wrap--loading': loading }]">
    <!-- Loading overlay -->
    <div v-if="loading" class="cv-table__overlay" role="status">
      <span class="cv-table__spinner" />
      <span class="cv-sr-only">Loading…</span>
    </div>

    <div class="cv-table-scroll">
      <table class="cv-table">
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              :class="[
                'cv-table__th',
                `cv-table__th--${col.align ?? 'left'}`,
                { 'cv-table__th--sortable': col.sortable },
                { 'cv-table__th--sorted': sortKey === col.key },
              ]"
              :style="col.width ? { width: col.width } : undefined"
              :aria-sort="ariaSort(col)"
              :tabindex="col.sortable ? 0 : undefined"
              @click="toggleSort(col)"
              @keydown.enter.prevent="toggleSort(col)"
              @keydown.space.prevent="toggleSort(col)"
            >
              <span class="cv-table__th-inner">
                <slot :name="`header-${col.key}`" :column="col">
                  {{ col.label }}
                </slot>
                <span
                  v-if="col.sortable"
                  class="cv-table__sort-icon"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <!-- Up arrow -->
                    <path
                      :opacity="
                        sortKey === col.key && sortDir === 'asc' ? 1 : 0.3
                      "
                      d="M8 3.5L5 7h6L8 3.5Z"
                    />
                    <!-- Down arrow -->
                    <path
                      :opacity="
                        sortKey === col.key && sortDir === 'desc' ? 1 : 0.3
                      "
                      d="M8 12.5L5 9h6L8 12.5Z"
                    />
                  </svg>
                </span>
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-if="sortedRows.length === 0 && !loading"
            class="cv-table__empty-row"
          >
            <td :colspan="columns.length" class="cv-table__empty-cell">
              <slot name="empty">{{ emptyText }}</slot>
            </td>
          </tr>

          <tr
            v-for="(row, rowIndex) in sortedRows"
            :key="
              rowKey in row
                ? String((row as Record<string, unknown>)[rowKey])
                : rowIndex
            "
            :class="[
              'cv-table__row',
              { 'cv-table__row--striped': striped && rowIndex % 2 !== 0 },
              { 'cv-table__row--hoverable': hoverable },
            ]"
            @click="emit('row-click', row)"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :class="['cv-table__td', `cv-table__td--${col.align ?? 'left'}`]"
            >
              <slot
                :name="`cell-${col.key}`"
                :row="row"
                :value="cellValue(row, col)"
              >
                {{ cellValue(row, col) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
/* ── Wrapper ─────────────────────────────────────────────────── */
.cv-table-wrap {
  position: relative;
  font-family: inherit;
  font-size: 0.875rem;
  border: 1px solid var(--cv-color-secondary, #e5e7eb);
  border-radius: var(--cv-radius-btn, 8px);
  overflow: hidden;
}

.cv-table-scroll {
  overflow-x: auto;
}

.cv-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* ── Table ───────────────────────────────────────────────────── */
.cv-table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

/* ── Header ──────────────────────────────────────────────────── */
.cv-table__th {
  padding: 0.65rem 1rem;
  background: var(--cv-color-surface-muted, #f8fafc);
  border-bottom: 1px solid var(--cv-color-secondary, #e5e7eb);
  font-weight: 600;
  color: var(--cv-color-text-muted, #6b7280);
  text-align: left;
  user-select: none;
}

.cv-table__th--center {
  text-align: center;
}
.cv-table__th--right {
  text-align: right;
}

.cv-table__th--sortable {
  cursor: pointer;
}

.cv-table__th--sortable:focus-visible {
  outline: 2px solid var(--cv-color-focus-ring, #6366f1);
  outline-offset: -2px;
}

.cv-table__th--sortable:hover {
  background: var(--cv-color-ghost-bg-hover, #f1f5f9);
  color: var(--cv-color-primary, #6366f1);
}

.cv-table__th--sorted {
  color: var(--cv-color-primary, #6366f1);
}

.cv-table__th-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.cv-table__sort-icon svg {
  width: 1rem;
  height: 1rem;
}

/* ── Body ────────────────────────────────────────────────────── */
.cv-table__td {
  padding: 0.65rem 1rem;
  border-bottom: 1px solid var(--cv-color-secondary, #e5e7eb);
  color: var(--cv-color-ghost-text, #374151);
  text-align: left;
  vertical-align: middle;
}

.cv-table__td--center {
  text-align: center;
}
.cv-table__td--right {
  text-align: right;
}

.cv-table__row:last-child .cv-table__td {
  border-bottom: none;
}

.cv-table__row--striped {
  background: var(--cv-color-surface-muted, #f8fafc);
}

.cv-table__row--hoverable:hover {
  background: color-mix(
    in srgb,
    var(--cv-color-primary, #6366f1) 5%,
    transparent
  );
  cursor: pointer;
}

/* ── Empty ───────────────────────────────────────────────────── */
.cv-table__empty-cell {
  padding: 2.5rem 1rem;
  text-align: center;
  color: var(--cv-color-text-muted, #6b7280);
}

/* ── Loading overlay ─────────────────────────────────────────── */
.cv-table__overlay {
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--cv-color-surface, #fff) 65%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.cv-table__spinner {
  width: 1.75rem;
  height: 1.75rem;
  border: 2.5px solid
    color-mix(in srgb, var(--cv-color-primary, #6366f1) 25%, transparent);
  border-top-color: var(--cv-color-primary, #6366f1);
  border-radius: 50%;
  animation: cv-table-spin 0.7s linear infinite;
}

@keyframes cv-table-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
