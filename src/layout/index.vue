<template>
  <div class="app-wrapper" :class="classObj">
    <!-- <div
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />

    <!-- 顶部header + main -->
    <div class="main-container" :class="{ hasTagsView: showTagsView }">
      <!-- 顶部 -->
      <div :class="{'fixed-header': fixedHeader}">
        <navbar />
        <tags-view v-if="showTagsView" />
      </div>

      <appMain />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Sidebar, Navbar, AppMain } from './components'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  setup() {
    const handleClickOutside = () => {
      console.log(666)
    }

    const store = useStore()

    const sidebar: any = computed(() => {
      return store.state.app.sidebar
    })

    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation
        // mobile: this.device === DeviceType.Mobile
      }
    })

    const showTagsView = () => {
      return store.state.app.showTagsView
    }

    const fixedHeader = () => {
      return store.state.settings.fixedHeader
    }

    return {
      handleClickOutside,
      classObj,
      sidebar,
      showTagsView,
      fixedHeader
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/styles/_mixins.scss";
@import "src/styles/_variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px);
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
