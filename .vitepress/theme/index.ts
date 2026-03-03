import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './MyLayout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    void app
    // app.use()
  },
} satisfies Theme