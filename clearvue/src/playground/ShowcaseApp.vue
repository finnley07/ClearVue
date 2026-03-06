<script setup lang="ts">
import { ref } from "vue";
import Button from "../components/button/Button.vue";
import Checkbox from "../components/button/Checkbox.vue";
import Radio from "../components/button/Radio.vue";
import RadioGroup from "../components/button/RadioGroup.vue";
import Switch from "../components/button/Switch.vue";
import Input from "../components/form/Input.vue";
import Select from "../components/form/Select.vue";
import Badge from "../components/feedback/Badge.vue";
import Toast from "../components/feedback/Toast.vue";
import Avatar from "../components/feedback/Avatar.vue";
import Spinner from "../components/feedback/Spinner.vue";
import Card from "../components/layout/Card.vue";
import Modal from "../components/layout/Modal.vue";
import Tabs from "../components/layout/Tabs.vue";
import Tab from "../components/layout/Tab.vue";
import TabPanel from "../components/layout/TabPanel.vue";
import DataTable from "../components/data/DataTable.vue";
import { setTheme, baseTheme, darkTheme } from "../themes";
import type { ClearVueTheme } from "../themes";

const toggleActive = ref(false);
const loadingDemo = ref(false);
const inputValue = ref("");
const inputError = ref("");
const dismissibleVisible = ref(true);

// Checkbox
const checkA = ref(true);
const checkB = ref(false);
const checkC = ref(false);

// Radio
const radioVal = ref("vue");
const radioMulti = ref<(string | number | boolean)[]>(["vue"]);

// Select
const selectVal = ref("");
const selectRequired = ref("");
const selectOptions = [
  { label: "Vue 3", value: "vue" },
  { label: "React", value: "react" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular", disabled: true },
  { label: "Ember", value: "ember", disabled: true },
];
// Dynamically build helper text from all disabled options
const selectDisabledHint = (() => {
  const names = selectOptions.filter((o) => o.disabled).map((o) => o.label);
  if (!names.length) return undefined;
  return `${names.join(" & ")} ${names.length > 1 ? "are" : "is"} currently unavailable.`;
})();

// Switch
const switchA = ref(false);
const switchB = ref(true);
const switchC = ref(false);

// Modal
const modalOpen = ref(false);

// Tabs
const activeTab = ref("overview");
const activePillTab = ref("tab1");

// DataTable
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}
const tableColumns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", sortable: true },
  { key: "status", label: "Status" },
  { key: "joined", label: "Joined", sortable: true },
];
const tableRows: User[] = [
  {
    id: 1,
    name: "Alice Meyer",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
    joined: "2024-01-12",
  },
  {
    id: 2,
    name: "Bob Schmidt",
    email: "bob@example.com",
    role: "Editor",
    status: "Active",
    joined: "2024-02-28",
  },
  {
    id: 3,
    name: "Clara Müller",
    email: "clara@example.com",
    role: "Viewer",
    status: "Inactive",
    joined: "2024-03-15",
  },
  {
    id: 4,
    name: "David Bauer",
    email: "david@example.com",
    role: "Editor",
    status: "Active",
    joined: "2024-04-03",
  },
  {
    id: 5,
    name: "Eva Richter",
    email: "eva@example.com",
    role: "Viewer",
    status: "Active",
    joined: "2024-05-19",
  },
];
const tableLoading = ref(false);
function toggleTableLoading() {
  tableLoading.value = true;
  setTimeout(() => (tableLoading.value = false), 1500);
}

const themes: Record<string, ClearVueTheme> = {
  Base: baseTheme,
  Dark: darkTheme,
};
const currentTheme = ref("Base");

function onThemeChange(e: Event) {
  const name = (e.target as HTMLSelectElement).value;
  const theme = themes[name];
  if (!theme) return;
  currentTheme.value = name;
  setTheme(theme);
}

function startLoading() {
  loadingDemo.value = true;
  setTimeout(() => (loadingDemo.value = false), 2000);
}

function validateInput() {
  inputError.value =
    inputValue.value.trim() === "" ? "Dieses Feld ist erforderlich." : "";
}
</script>

<template>
  <div class="cv-showcase">
    <header class="cv-showcase__header">
      <span class="cv-showcase__logo">ClearVue Showcase</span>
      <div class="cv-showcase__theme-picker">
        <label for="theme-select">Theme</label>
        <select id="theme-select" :value="currentTheme" @change="onThemeChange">
          <option v-for="name in Object.keys(themes)" :key="name">
            {{ name }}
          </option>
        </select>
      </div>
    </header>

    <main class="cv-showcase__content">
      <!-- ─── Button ───────────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Button</h2>
          <span class="cv-card__tag">components/Button</span>
        </div>

        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">Variants</p>
            <div class="cv-row">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          <div class="cv-demo-group">
            <p class="cv-demo-label">Sizes</p>
            <div class="cv-row cv-row--center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div class="cv-demo-group">
            <p class="cv-demo-label">States</p>
            <div class="cv-row">
              <Button disabled>Disabled</Button>
              <Button :loading="loadingDemo" @click="startLoading">
                {{ loadingDemo ? "Loading…" : "Click to load" }}
              </Button>
              <Button variant="outline" is-toggle v-model="toggleActive">
                Toggle ({{ toggleActive ? "ON" : "OFF" }})
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── Input ──────────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Input</h2>
          <span class="cv-card__tag">components/Input</span>
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">Default</p>
            <Input
              v-model="inputValue"
              placeholder="Placeholder text"
              style="max-width: 320px"
            />
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">With label &amp; helper</p>
            <Input
              label="E-Mail"
              type="email"
              placeholder="name@example.com"
              helper-text="We'll never share your email."
              style="max-width: 320px"
            />
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Validation error</p>
            <Input
              v-model="inputValue"
              label="Username"
              placeholder="Enter username"
              :error-text="inputError"
              required
              style="max-width: 320px"
              @blur="validateInput"
            />
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Disabled</p>
            <Input
              placeholder="Not editable"
              disabled
              style="max-width: 320px"
            />
          </div>
        </div>
      </div>

      <!-- ─── Badge ─────────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Badge</h2>
          <span class="cv-card__tag">components/Badge</span>
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">Variants</p>
            <div class="cv-row cv-row--center">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </div>
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">With dot</p>
            <div class="cv-row cv-row--center">
              <Badge variant="success" dot>Online</Badge>
              <Badge variant="danger" dot>Offline</Badge>
              <Badge variant="warning" dot>Away</Badge>
            </div>
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Sizes</p>
            <div class="cv-row cv-row--center">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── Card ──────────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Card</h2>
          <span class="cv-card__tag">components/Card</span>
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">With header &amp; footer</p>
            <Card style="max-width: 340px">
              <template #header>Card Title</template>
              Card body content goes here.
              <template #footer>
                <div
                  style="display: flex; gap: 0.5rem; justify-content: flex-end"
                >
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button size="sm">Save</Button>
                </div>
              </template>
            </Card>
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Shadow, no border</p>
            <Card shadow :border="false" style="max-width: 340px">
              Just a raised card with a shadow.
            </Card>
          </div>
        </div>
      </div>

      <!-- ─── Toast ──────────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Toast</h2>
          <span class="cv-card__tag">components/Toast</span>
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">Variants</p>
            <div class="cv-col">
              <Toast variant="default">This is a default message.</Toast>
              <Toast variant="info" title="Info"
                >Your session will expire in 5 minutes.</Toast
              >
              <Toast variant="success" title="Saved"
                >Your changes have been saved successfully.</Toast
              >
              <Toast variant="warning" title="Warning"
                >This action may have unintended side effects.</Toast
              >
              <Toast variant="error" title="Error"
                >Something went wrong. Please try again.</Toast
              >
            </div>
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Dismissible</p>
            <div class="cv-col">
              <Toast
                v-if="dismissibleVisible"
                variant="info"
                title="New update available"
                dismissible
                @dismiss="dismissibleVisible = false"
              >
                Reload the page to get the latest version.
              </Toast>
              <Button
                v-if="!dismissibleVisible"
                variant="outline"
                size="sm"
                style="align-self: flex-start"
                @click="dismissibleVisible = true"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── Add more component cards below ───────────────── -->

      <!-- ─── Checkbox ──────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Checkbox</h2>
          <span class="cv-card__tag">components/Checkbox</span>
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">States</p>
            <div class="cv-col">
              <Checkbox v-model="checkA" label="Accept terms and conditions" />
              <Checkbox
                v-model="checkB"
                label="Subscribe to newsletter"
                helper-text="You can unsubscribe at any time."
              />
              <Checkbox
                :model-value="true"
                :indeterminate="true"
                label="Indeterminate state"
              />
              <Checkbox label="Disabled (unchecked)" disabled />
              <Checkbox
                :model-value="true"
                label="Disabled (checked)"
                disabled
              />
            </div>
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Error state</p>
            <Checkbox
              v-model="checkC"
              label="I agree to the privacy policy"
              error-text="You must accept this to continue."
            />
          </div>
        </div>
      </div>

      <!-- ─── Radio ─────────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Radio</h2>
          <span class="cv-card__tag">components/Radio · RadioGroup</span>
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">Group</p>
            <RadioGroup
              v-model="radioVal"
              label="Favourite framework"
              name="framework"
            >
              <Radio value="vue" label="Vue 3" />
              <Radio
                value="react"
                label="React"
                helper-text="A JavaScript library"
              />
              <Radio value="svelte" label="Svelte" />
            </RadioGroup>
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Disabled</p>
            <RadioGroup label="Locked choice" disabled name="locked">
              <Radio value="a" label="Option A" />
              <Radio value="b" label="Option B" />
            </RadioGroup>
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Multi-select (max 2)</p>
            <RadioGroup
              v-model="radioMulti"
              label="Pick up to 2 frameworks"
              :max="2"
            >
              <Radio value="vue" label="Vue 3" />
              <Radio value="react" label="React" />
              <Radio value="svelte" label="Svelte" />
              <Radio value="angular" label="Angular" />
            </RadioGroup>
            <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #6b7280">
              Selected: {{ radioMulti.join(", ") || "none" }}
            </p>
          </div>
        </div>
      </div>

      <!-- ─── Select ────────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Select</h2>
          <span class="cv-card__tag">components/Select</span>
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">Default</p>
            <Select
              v-model="selectVal"
              :options="selectOptions"
              label="Framework"
              placeholder="Choose an option…"
              :helper-text="selectDisabledHint"
              style="max-width: 320px"
            />
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Error</p>
            <Select
              v-model="selectRequired"
              :options="selectOptions"
              label="Framework"
              placeholder="Choose an option…"
              required
              :error-text="
                selectRequired ? undefined : 'Please select a framework.'
              "
              style="max-width: 320px"
            />
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Disabled</p>
            <Select
              :options="selectOptions"
              label="Framework"
              placeholder="Choose an option…"
              disabled
              style="max-width: 320px"
            />
          </div>
        </div>
      </div>

      <!-- ─── Switch ────────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Switch</h2>
          <span class="cv-card__tag">components/Switch</span>
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">Sizes</p>
            <div class="cv-col">
              <Switch v-model="switchA" size="sm" label="Small switch" />
              <Switch
                v-model="switchB"
                size="md"
                label="Medium switch (default)"
              />
            </div>
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">With helper text</p>
            <div class="cv-col">
              <Switch
                v-model="switchC"
                label="Enable notifications"
                helper-text="Receive alerts for important updates."
              />
            </div>
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Disabled</p>
            <div class="cv-col">
              <Switch :model-value="false" label="Disabled off" disabled />
              <Switch :model-value="true" label="Disabled on" disabled />
            </div>
          </div>
        </div>
      </div>

      <!-- ─── Avatar ────────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Avatar</h2>
          <span class="cv-card__tag">components/feedback/Avatar</span>
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">Sizes</p>
            <div class="cv-row cv-row--center">
              <Avatar size="xs" initials="AB" />
              <Avatar size="sm" initials="AB" />
              <Avatar size="md" initials="AB" />
              <Avatar size="lg" initials="AB" />
              <Avatar size="xl" initials="AB" />
            </div>
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Shapes</p>
            <div class="cv-row cv-row--center">
              <Avatar variant="circle" size="lg" initials="CI" />
              <Avatar variant="rounded" size="lg" initials="RO" />
              <Avatar variant="square" size="lg" initials="SQ" />
            </div>
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">States (image / initials / placeholder)</p>
            <div class="cv-row cv-row--center">
              <Avatar
                size="lg"
                src="https://i.pravatar.cc/80?img=3"
                alt="User"
              />
              <Avatar
                size="lg"
                initials="JD"
                color="#d1fae5"
                style="color: #065f46"
              />
              <Avatar size="lg" />
            </div>
          </div>
        </div>
      </div>

      <!-- ─── Spinner ───────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Spinner</h2>
          <span class="cv-card__tag">components/feedback/Spinner</span>
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">Sizes</p>
            <div class="cv-row cv-row--center">
              <Spinner size="xs" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </div>
          </div>
        </div>
      </div>

      <!-- ─── Modal ─────────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Modal</h2>
          <span class="cv-card__tag">components/layout/Modal</span>
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">Demo</p>
            <Button variant="outline" @click="modalOpen = true"
              >Open modal</Button
            >
          </div>
          <Modal v-model="modalOpen" title="Confirm action" size="md">
            <p>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <template #footer>
              <Button variant="ghost" @click="modalOpen = false">Cancel</Button>
              <Button variant="danger" @click="modalOpen = false"
                >Delete</Button
              >
            </template>
          </Modal>
        </div>
      </div>

      <!-- ─── Tabs ──────────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">Tabs</h2>
          <span class="cv-card__tag"
            >components/layout/Tabs · Tab · TabPanel</span
          >
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">Line variant</p>
            <Tabs v-model="activeTab">
              <template #tabs>
                <Tab id="overview" label="Overview" />
                <Tab id="settings" label="Settings" />
                <Tab id="logs" label="Logs" />
                <Tab id="disabled" label="Disabled" disabled />
              </template>
              <TabPanel id="overview"
                >This is the <strong>Overview</strong> panel.</TabPanel
              >
              <TabPanel id="settings"
                >Manage your <strong>Settings</strong> here.</TabPanel
              >
              <TabPanel id="logs">No logs to display at this time.</TabPanel>
            </Tabs>
          </div>
          <div class="cv-demo-group">
            <p class="cv-demo-label">Pill variant</p>
            <Tabs v-model="activePillTab" variant="pill">
              <template #tabs>
                <Tab id="tab1" label="Tab 1" />
                <Tab id="tab2" label="Tab 2" />
                <Tab id="tab3" label="Tab 3" />
              </template>
              <TabPanel id="tab1">Content for Tab 1.</TabPanel>
              <TabPanel id="tab2">Content for Tab 2.</TabPanel>
              <TabPanel id="tab3">Content for Tab 3.</TabPanel>
            </Tabs>
          </div>
        </div>
      </div>

      <!-- ─── DataTable ─────────────────────────────────────── -->
      <div class="cv-card">
        <div class="cv-card__header">
          <h2 class="cv-card__title">DataTable</h2>
          <span class="cv-card__tag">components/data/DataTable</span>
        </div>
        <div class="cv-card__body">
          <div class="cv-demo-group">
            <p class="cv-demo-label">Sortable · Striped · Row click</p>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem">
              <Button size="sm" variant="outline" @click="toggleTableLoading"
                >Simulate loading</Button
              >
            </div>
            <DataTable
              :columns="tableColumns"
              :rows="tableRows"
              row-key="id"
              striped
              :loading="tableLoading"
            >
              <template #cell-status="{ value }">
                <Badge :variant="value === 'Active' ? 'success' : 'neutral'">{{
                  value
                }}</Badge>
              </template>
            </DataTable>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  background: #f1f5f9;
  color: #0f172a;
  line-height: 1.5;
}
</style>

<style scoped>
/* ── Layout ─────────────────────────────────────────────────── */
.cv-showcase {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Header ─────────────────────────────────────────────────── */
.cv-showcase__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.75rem;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.cv-showcase__logo {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: var(--cv-color-primary, #6366f1);
}

.cv-showcase__theme-picker {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #64748b;
}

.cv-showcase__theme-picker select {
  font-family: inherit;
  font-size: 0.85rem;
  padding: 0.25rem 0.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #f8fafc;
  color: #0f172a;
  cursor: pointer;
  outline: none;
}

.cv-showcase__theme-picker select:focus {
  border-color: var(--cv-color-primary, #6366f1);
}

/* ── Content ────────────────────────────────────────────────── */
.cv-showcase__content {
  padding: 2rem 1.75rem;
  columns: 2;
  column-gap: 1.5rem;
}

/* ── Card ───────────────────────────────────────────────────── */
.cv-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  break-inside: avoid;
  margin-bottom: 1.5rem;
}

.cv-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.cv-card__title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
}

.cv-card__tag {
  font-size: 0.72rem;
  font-family: ui-monospace, monospace;
  color: #64748b;
  background: #e2e8f0;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.cv-card__body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ── Demo group ─────────────────────────────────────────────── */
.cv-demo-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cv-demo-label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #94a3b8;
}

/* ── Row ────────────────────────────────────────────────────── */
.cv-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cv-row--center {
  align-items: center;
}

/* ── Col ────────────────────────────────────────────────────── */
.cv-col {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}
</style>
