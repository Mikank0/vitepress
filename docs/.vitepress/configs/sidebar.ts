import type { DefaultTheme } from 'vitepress'
import { slugify } from '@mdit-vue/shared'
import { NAV_DATA } from '../../nav/data'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/nav/': [
    {
      text: '导航目录',
      items: NAV_DATA.map(c => ({
        text: c.title,
        link: `/nav/#${slugify(c.title)}`
      }))
    }
  ]
}
