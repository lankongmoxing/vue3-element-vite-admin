<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      'menu-wrapper',
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel },
    ]"
  >
    <template
      v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
    >
      <sidebar-item-link
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <svg-icon
            v-if="theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
          />
          <span
            v-if="theOnlyOneChild.meta.title && !isCollapse"
          >{{ theOnlyOneChild.meta.title }}
          </span>
        </el-menu-item>
      </sidebar-item-link>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :is-collapse="isCollapse"
        :is-first-level="false"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue'
import SidebarItemLink from './SidebarItemLink.vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  components: {
    SidebarItemLink
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    basePath: {
      type: String,
      default: ''
    },
    isFirstLevel: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    // 是否一直展示菜单，当一级菜单只有一个二级菜单的时候有用
    const alwaysShowRootMenu = computed(() => {
      if (item.value.meta && item.value.meta.alwaysShow) {
        return true
      }
      return false
    })

    const { basePath } = toRefs(props)

    const item: any = toRefs(props).item

    const showingChildNumber = () => {
      const itemValue = item.value
      if (itemValue.children) {
        const showingChildren = itemValue.children.filter((item: any) => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    }

    // 返回路由的索引
    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath
      }
      const basePathValue = basePath.value
      if (isExternal(basePathValue)) {
        return basePathValue
      }

      let path = ''
      if (basePathValue === '/') {
        path = basePathValue + routePath
      } else {
        if (routePath) {
          path = basePathValue + '/' + routePath
        } else {
          path = basePathValue
        }
      }

      return path
    }

    const theOnlyOneChild = computed(() => {
      const itemValue = item.value

      // 只要展示的 children 大于1，返回null，表示能展示的子菜单数量大于1
      if (showingChildNumber() > 1) {
        return null
      }
      if (itemValue.children) {
        for (const child of itemValue.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...itemValue, path: '' }
    })

    return {
      alwaysShowRootMenu,
      resolvePath,
      theOnlyOneChild
    }
  }
})
</script>

<style lang="scss">
@import "src/styles/_variables.scss";
.el-submenu.is-active > .el-submenu__title,
.submenu-title-noDropdown.is-active {
  color: $menuActiveText !important;
  font-weight: bold;
  border-bottom: 1px solid $menuActiveText;
}

.el-submenu.is-active > .el-submenu__title {
  &:hover {
    background-color: #ffffff !important;
  }
}

.el-submenu > .el-submenu__title,
.submenu-title-noDropdown {
  &:hover {
    color: $tiffany !important;
    background: #ffffff !important;
  }
}

.full-mode {
  .nest-menu .el-submenu > .el-submenu__title:not(.submenu-title-noDropdown),
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      color: $subMenuActiveText !important;
      background-color: $subMenuHover !important;
    }
  }
  .el-menu-item:not(.submenu-title-noDropdown).is-active {
    color: #ffffff !important;
    background: $tiffany !important;
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>
