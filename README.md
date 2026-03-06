# ClearVue

> A lightweight, themeable Vue 3 component library — clean by design, flexible by nature.

ClearVue provides a small set of polished UI components built on a CSS custom property token system. Swap between built-in themes or supply your own in a single line of code.

**[Live Showcase →](https://finnley07.github.io/ClearVue/)**

---

## Components

| Component                   | Description                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `Button`                    | Versatile button with 5 variants, 3 sizes, loading state, and optional toggle mode        |
| `Input`                     | Labelled text field with helper/error text and full v-model support                       |
| `Badge`                     | Compact status indicator with 6 colour variants, 2 sizes, and an optional dot             |
| `Card`                      | Flexible container with optional header/footer slots, padding control, border, and shadow |
| `Toast`                     | Popup message with default, info, warning, error, and success variants                    |
| `Checkbox`                  | Checkbox with indeterminate state, helper/error text, and v-model support                 |
| `Radio` / `RadioGroup`      | Radio buttons with group wrapper, legend, and error/helper text                           |
| `Select`                    | Native dropdown with label, placeholder, error text, and disabled option support          |
| `Switch`                    | Toggle switch in two sizes with helper text and disabled state                            |
| `Avatar`                    | User avatar showing image, initials, or placeholder; 5 sizes and 3 shape variants         |
| `Spinner`                   | Animated loading indicator in 5 sizes                                                     |
| `Modal`                     | Accessible dialog overlay with header, body, footer slots and Escape/backdrop close       |
| `Tabs` / `Tab` / `TabPanel` | Tab navigation in line and pill variants with keyboard support                            |
| `DataTable`                 | Bind any data array; define columns, sortable columns, custom cell slots, and loading     |

---

## Getting Started

### Installation

```bash
npm install clearvue
```

### Plugin Setup

Register ClearVue once in your application entry point:

```ts
// main.ts
import { createApp } from "vue";
import { ClearVue } from "clearvue";
import App from "./App.vue";

createApp(App).use(ClearVue).mount("#app");
```

To use the dark theme, pass it as an option:

```ts
import { ClearVue, darkTheme } from "clearvue";

createApp(App).use(ClearVue, { theme: darkTheme }).mount("#app");
```

---

## Theming

ClearVue uses CSS custom properties for all visual tokens. The `setTheme()` call (invoked automatically by the plugin) writes every token onto `:root`.

### Built-in Themes

```ts
import { baseTheme, darkTheme } from "clearvue";
```

| Theme       | Description                                           |
| ----------- | ----------------------------------------------------- |
| `baseTheme` | Indigo/violet palette on a light background (default) |
| `darkTheme` | Lighter indigo shades optimised for dark surfaces     |

### Custom Theme

Implement the `ClearVueTheme` interface to create your own:

```ts
import type { ClearVueTheme } from "clearvue";

const brandTheme: ClearVueTheme = {
  colorPrimary: "#0ea5e9",
  colorPrimaryHover: "#0284c7",
  colorOnPrimary: "#ffffff",

  colorSecondary: "#f1f5f9",
  colorSecondaryHover: "#e2e8f0",
  colorOnSecondary: "#0f172a",

  colorDanger: "#ef4444",
  colorDangerHover: "#dc2626",
  colorOnDanger: "#ffffff",

  colorOutline: "#0ea5e9",
  colorOutlineBgHover: "#e0f2fe",

  colorGhostText: "#334155",
  colorGhostBgHover: "#f8fafc",

  colorFocusRing: "#0ea5e9",

  radiusBtn: "6px",
  fontWeightBtn: "500",
};
```

Then pass it to the plugin:

```ts
createApp(App).use(ClearVue, { theme: brandTheme }).mount("#app");
```

---

## Development

```bash
# Install dependencies
cd clearvue
npm install

# Start the component playground
npm run dev

# Type-check and build the library
npm run build
```

The dev server starts the component playground (`src/playground/ShowcaseApp.vue`) so you can preview all components live.

---

## Component Documentation

Detailed props, slots, events, and examples for each component:

| Component                   | Description                                                                              | Docs                                            |
| --------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `Button`                    | Versatile button with 5 variants, 3 sizes, loading state, and optional toggle mode       | [Button.md](Documentation/components/Button.md) |
| `Input`                     | Labelled text field with label, helper/error text, and full v-model support              | [Input.md](Documentation/components/Input.md)   |
| `Badge`                     | Compact status badge with 6 colour variants, 2 sizes, and an optional dot indicator      | [Badge.md](Documentation/components/Badge.md)   |
| `Card`                      | Flexible content container with header/footer slots, padding control, border, and shadow | [Card.md](Documentation/components/Card.md)     |
| `Toast`                     | Popup message with default, info, warning, error, and success variants                   | [Toast.md](Documentation/components/Toast.md)   |
| `Checkbox`                  | Checkbox with indeterminate state, helper/error text, and v-model support                | —                                               |
| `Radio` / `RadioGroup`      | Radio buttons with group wrapper, legend, and error/helper text                          | —                                               |
| `Select`                    | Native dropdown with label, placeholder, error/helper text, and disabled options         | —                                               |
| `Switch`                    | Toggle switch in two sizes with helper text and disabled state                           | —                                               |
| `Avatar`                    | User avatar with image, initials, or placeholder; 5 sizes and 3 shape variants           | —                                               |
| `Spinner`                   | Animated loading indicator in 5 sizes                                                    | —                                               |
| `Modal`                     | Accessible dialog with header/body/footer slots, Escape and backdrop-close support       | —                                               |
| `Tabs` / `Tab` / `TabPanel` | Tab navigation in line and pill variants                                                 | —                                               |
| `DataTable`                 | Bind data arrays; define columns, enable sorting, custom cell slots, and loading state   | —                                               |
| `Pagination`                | Page navigation with smart ellipsis, prev/next, and v-model binding                      | —                                               |

---

## License

[MIT](LICENSE)
