import type { DefaultTheme } from 'vitepress'
import { slugify } from '@mdit-vue/shared'
import { NAV_DATA } from '../../nav/data'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/nav/': [
    {
      text: '导航目录',
      items: NAV_DATA
        // 1. 过滤掉标题为空的分类 (防止脚本生成空数据)
        .filter(category => category.title && category.items.length > 0)
        // 2. 映射为侧边栏条目
        .map((category) => ({
          text: category.title,
          link: `/nav/#${slugify(category.title)}`
        }))
    }
  ]
}
