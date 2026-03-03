import { EnhanceAppContext, inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// import '@bprogress/core/css';
// import './styles/index.less';
import './styles/index.scss'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }: EnhanceAppContext) {
    
  },
}
