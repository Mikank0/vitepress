export interface NavLink {
  icon?: string | { svg: string }
  title: string
  desc?: string
  link: string
}

// 修改这里：支持三级嵌套
export interface NavData {
  title: string
  items: {
    title: string
    items: NavLink[]
  }[]
}
