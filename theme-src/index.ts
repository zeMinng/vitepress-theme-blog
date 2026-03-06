import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './styles/index.scss'
import Layout from './layouts/MyLayout.vue'
import PostList from './components/PostList/PostList.vue'

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    if (typeof DefaultTheme.enhanceApp === 'function') {
      DefaultTheme.enhanceApp(ctx)
    }

    ctx.app.component('PostList', PostList)
  },
}

export default theme
