<template>
  <div :class="{'has-logo': showLogo}">
    <sidebar-logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <SearchBar
      v-if="!isCollapse"
      id="header-search"
      class="right-menu-item"
    />
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
import SearchBar from '@/components/HeaderSearch/index.vue'

export default defineComponent({
  components: {
    SidebarLogo,
    SidebarItem,
    SearchBar
  },
  setup() {
    const showLogo = computed(() => {
      return store.state.setting.showSidebarLogo
    })

    const variables: any = variablesScss

    const store = useStore()
    const isCollapse = computed(() => {
      return !store.state.app.sidebar.opened
    })

    const activeMenu = ''
    const menuActiveTextColor = ''

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
