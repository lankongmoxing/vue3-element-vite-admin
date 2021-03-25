<template>
  <div :class="{'has-logo': showLogo}">
    <!-- 顶部的 logo -->
    <sidebar-logo
      v-if="showLogo"
      :collapse="isCollapse"
    />

    <!-- 搜索菜单 -->
    <SearchBar
      v-if="!isCollapse"
      id="header-search"
      class="right-menu-item"
    />

    <!-- 菜单列表，根据路由生成 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 权限菜单全部：reRoutes -->
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import variablesScss from '@/styles/_variables.scss'
import SidebarLogo from './SidebarLogo.vue'
import { defineComponent, computed } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import SearchBar from '@/components/HeaderSearch/index.vue'

export default defineComponent({
  components: {
    SidebarLogo,
    SidebarItem,
    SearchBar
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    // 是否展示顶部 logo
    const showLogo = computed(() => {
      return store.state.settings.showSidebarLogo
    })

    const variables: any = variablesScss

    // sidebar 是否关闭
    const isCollapse = computed(() => {
      return !store.state.app.sidebar.opened
    })

    // 获取当前路由path
    const activeMenu = computed(() => {
      return route.path
    })

    // 菜单活跃状态下的文字颜色
    const menuActiveTextColor = computed(() => {
      if (store.state.settings.sidebarTextTheme) {
        return store.state.settings.theme
      }
      return variables.menuActiveText
    })

    // 当前账号有用的路由
    const routes: any = computed(() => {
      return store.state.permission.routes
    })

    return {
      showLogo,
      variables,
      isCollapse,
      activeMenu,
      menuActiveTextColor,
      routes
    }
  }
})
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  padding-bottom: 64px !important;
  box-shadow: 3px 3px 3px rgba(0,0,0,.2);
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
