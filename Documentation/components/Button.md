# Button

## Usage

```vue
<Button>Click me</Button>
```

## Props

| Prop         | Type                                                           | Default     | Description                       |
| ------------ | -------------------------------------------------------------- | ----------- | --------------------------------- |
| `variant`    | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style                      |
| `size`       | `'sm' \| 'md' \| 'lg'`                                         | `'md'`      | Size                              |
| `type`       | `'button' \| 'submit' \| 'reset'`                              | `'button'`  | Native button type                |
| `disabled`   | `boolean`                                                      | `false`     | Disables the button               |
| `loading`    | `boolean`                                                      | `false`     | Shows a spinner and blocks clicks |
| `isToggle`   | `boolean`                                                      | `false`     | Turns the button into a toggle    |
| `modelValue` | `boolean`                                                      | `false`     | Toggle state (use with `v-model`) |

## Events

| Event               | Payload      | Description                                         |
| ------------------- | ------------ | --------------------------------------------------- |
| `click`             | `MouseEvent` | Fired on click (not fired when disabled or loading) |
| `update:modelValue` | `boolean`    | Fired when toggle state changes                     |

## Examples

```vue
<!-- Variants -->
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

<!-- Sizes -->
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

<!-- States -->
<Button disabled>Disabled</Button>
<Button :loading="isLoading" @click="save">Save</Button>

<!-- Toggle -->
<Button is-toggle v-model="active">Toggle</Button>

<!-- Submit button inside a form -->
<Button type="submit" variant="primary">Submit</Button>
```

## Customisation

CSS custom properties can be overridden per variant. All component-level vars fall back to the global theme vars set by `setTheme()`, which in turn fall back to the built-in base values — so the button works with zero configuration.

### 1 · Global theme (recommended)

```ts
// main.ts
import { createApp } from "vue";
import { ClearVue, darkTheme } from "clearvue";
import App from "./App.vue";

createApp(App).use(ClearVue, { theme: darkTheme }).mount("#app");
```

### 2 · CSS variable override

```css
/* Change only the primary variant */
.cv-btn--primary {
  --cv-btn-bg: #f59e0b;
  --cv-btn-bg-hover: #d97706;
  --cv-btn-border: #f59e0b;
  --cv-btn-border-hover: #d97706;
  --cv-btn-color: #fff;
}
```

### 3 · Custom class

```vue
<Button class="my-btn">Custom</Button>
```

```css
.my-btn {
  border-radius: 999px;
  background: hotpink;
}
```

### Available CSS variables

| Variable                    | Controls                             |
| --------------------------- | ------------------------------------ |
| `--cv-btn-bg`               | Background                           |
| `--cv-btn-bg-hover`         | Background on hover                  |
| `--cv-btn-color`            | Text color                           |
| `--cv-btn-border`           | Border color                         |
| `--cv-btn-border-hover`     | Border color on hover                |
| `--cv-btn-radius`           | Border radius (base: `8px`)          |
| `--cv-btn-font-weight`      | Font weight (base: `600`)            |
| `--cv-btn-focus-ring`       | Focus outline color                  |
| `--cv-btn-disabled-opacity` | Opacity when disabled (base: `0.45`) |
