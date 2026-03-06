import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './styles/index.scss'
import Layout from './layouts/MyLayout.vue'
import PostList from './components/PostList/PostList.vue'
import TagList from './components/TagList/TagList.vue'
import ArchiveList from './components/ArchiveList/ArchiveList.vue'
import ResourceList from './components/ResourceList/ResourceList.vue'

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    if (typeof DefaultTheme.enhanceApp === 'function') {
      DefaultTheme.enhanceApp(ctx)
    }

    ctx.app.component('PostList', PostList)
    ctx.app.component('TagList', TagList)
    ctx.app.component('ArchiveList', ArchiveList)
    ctx.app.component('ResourceList', ResourceList)
  },
}

export default theme
