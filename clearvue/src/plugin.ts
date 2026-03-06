import type { App } from "vue";
import type { ClearVueTheme } from "./themes/types";
import { setTheme } from "./themes";
import { baseTheme } from "./themes/base";

export interface ClearVueOptions {
  /** Theme to apply globally. Defaults to baseTheme. */
  theme?: ClearVueTheme;
}

/**
 * Vue plugin – registers ClearVue and applies the chosen theme.
 *
 * @example
 * // main.ts
 * import { createApp } from 'vue'
 * import { ClearVue, darkTheme } from 'clearvue'
 * import App from './App.vue'
 *
 * createApp(App)
 *   .use(ClearVue, { theme: darkTheme })
 *   .mount('#app')
 */
export const ClearVue = {
  install(_app: App, options: ClearVueOptions = {}) {
    setTheme(options.theme ?? baseTheme);
  },
};
