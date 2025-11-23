import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'

// 1. 注意：这里去掉了 'head'，因为我们要在下面直接配置它
import { nav, sidebar } from './configs'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

export default defineConfig({
  outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',

  lang: 'zh-CN',
  
  // ====================================================
  // 【修改点 1】：这里是浏览器标签栏显示的“网站名称”
  // ====================================================
  title: 'Mikanko的个人站点', 
  description: '还在持续更新',

  // ====================================================
  // 【修改点 2】：这里配置浏览器标签栏的“图标” (Favicon)
  // ====================================================
  head: [
    // href: '/favicon.ico' 对应的是 docs/public/favicon.ico 文件
    ['link', { rel: 'icon', href: 'favicon.ico' }],
    
    // 如果你的图标是 png 格式，就用下面这行（二选一）：
    // ['link', { rel: 'icon', href: '/logo.png' }],
    
    // 移动端优化（可选）
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    // 左上角的 Logo 图片
    logo: '/logo.png',

    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: false,

    socialLinks: [{ icon: 'github', link: 'https://github.com/Mikank0' }],

    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'Copyright © 2019-present maomao',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

  },

  vite: {
    plugins: [MarkdownPreview()],
  },
})
