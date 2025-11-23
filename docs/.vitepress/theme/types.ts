/**
 * 链接卡片的数据接口
 * 对应最小的那个网站卡片
 */
export interface NavLink {
  /** 站点图标 */
  icon?: string | { svg: string }
  /** 站点名称 */
  title: string
  /** 站点描述 (可选) */
  desc?: string
  /** 站点链接 */
  link: string
}

/**
 * 导航数据接口 (修改为三级嵌套结构)
 * 结构：大分类 -> [ 小分类 -> [ 链接卡片 ] ]
 */
export interface NavData {
  /** 一级分类标题 (如：Shanghaitech) */
  title: string
  /** 二级分类列表 */
  items: {
    /** 二级分类标题 (如：课程网站) */
    title: string
    /** 该分类下的链接列表 */
    items: NavLink[]
  }[]
}
