import { EnhanceAppContext, inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// import Home from './views/Home.vue'
import './styles/index.scss'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }: EnhanceAppContext) {
    // app.component('Home', Home);
  },
}
