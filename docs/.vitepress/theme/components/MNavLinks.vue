<script setup lang="ts">
import { computed } from 'vue'
import { slugify } from '@mdit-vue/shared'
import { NAV_DATA } from '../../../nav/data'
import MNavLink from './MNavLink.vue'

// 处理数据，生成锚点 ID
const formattedData = computed(() => {
  return NAV_DATA.map((mainCategory) => ({
    ...mainCategory,
    // 为一级分类生成 ID (用于侧边栏跳转)
    slug: slugify(mainCategory.title), 
    // 处理二级分类
    items: mainCategory.items.map((subCategory) => ({
      ...subCategory,
      // 如果二级分类下有链接，就处理；如果是扁平结构，也兼容
      links: subCategory.items || [] 
    }))
  }))
})
</script>

<template>
  <div v-for="category in formattedData" :key="category.title" :id="category.slug" class="main-category">
    
    <h2 class="main-title" v-if="category.title">{{ category.title }}</h2>

    <div v-for="sub in category.items" :key="sub.title" class="sub-category-section">
      
      <h3 class="sub-title" v-if="sub.title" :id="slugify(sub.title)">
        {{ sub.title }}
      </h3>

      <div class="m-nav-links">
        <MNavLink
          v-for="link in sub.items" 
          :key="link.link" 
          v-bind="link"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.m-nav-links {
  --m-nav-gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-row-gap: var(--m-nav-gap);
  grid-column-gap: var(--m-nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px; /* 增加板块间距 */
}

/* 样式美化 */
.main-category {
  margin-bottom: 60px; /* 大分类之间拉开距离 */
}

.main-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.sub-category-section {
  margin-bottom: 30px;
}

.sub-title {
  font-size: 18px;
  font-weight: 600;
  margin: 15px 0 10px 0;
  opacity: 0.9;
}

@media (min-width: 500px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}
@media (min-width: 640px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
  }
}
@media (min-width: 768px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  }
}
@media (min-width: 960px) {
  .m-nav-links {
    --m-nav-gap: 20px;
  }
}
</style>
