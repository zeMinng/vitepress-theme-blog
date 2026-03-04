import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './styles/index.scss'
import Layout from './layouts/MyLayout.vue'

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    if (typeof DefaultTheme.enhanceApp === 'function') {
      DefaultTheme.enhanceApp(ctx)
    }
  },
}

export default theme
