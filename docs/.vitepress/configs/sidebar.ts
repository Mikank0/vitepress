import type { DefaultTheme } from 'vitepress'
import { slugify } from '@mdit-vue/shared'
// 注意路径：从 configs 目录往上跳两级才能找到 docs/nav
import { NAV_DATA } from '../../nav/data'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/nav/': [
    {
      text: '导航目录', // 这里是侧边栏顶部的标题
      items: NAV_DATA.map((category) => ({
        text: category.title,
        link: `/nav/#${slugify(category.title)}`
      }))
    }
  ]
}
