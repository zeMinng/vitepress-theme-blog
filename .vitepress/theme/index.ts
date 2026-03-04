import type { Theme } from 'vitepress'
import BlogTheme from '../../theme-src' 
import Layout from './MyLayout.vue'

export default {
  extends: BlogTheme,
  Layout,
  enhanceApp({ app }) {
    void app
    // app.use()
  },
} satisfies Theme