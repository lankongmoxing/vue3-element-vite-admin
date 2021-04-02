<template>
  <div class="app-wrapper" :class="classObj">
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />

    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />

    <!-- 顶部header + main -->
    <div class="main-container" :class="{ hasTagsView: showTagsView }">
      <!-- 顶部 -->
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- 导航 -->
        <navbar />

        <!-- 快捷标签 -->
        <!-- <tags-view v-if="showTagsView" /> -->
      </div>

      <!-- 页面内容 -->
      <appMain />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { Sidebar, Navbar, AppMain, TagsView } from "./components";
import { useStore } from "vuex";

export default defineComponent({
  name: "Layout",
  components: {
    Sidebar,
    Navbar,
    AppMain,
    TagsView
  },
  setup() {
    const store = useStore();

    // 隐藏
    const handleClickOutside = () => {
      store.dispatch("app/CloseSideBar", false);
    };

    // 获取 sidebar的配置
    const sidebar = computed(() => {
      return store.state.app.sidebar;
    });

    const device = computed(() => {
      return store.state.app.device;
    });

    enum DeviceType {
      Mobile,
      Desktop,
    }

    // 整个布局的class
    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened, // 隐藏侧边栏
        openSidebar: sidebar.value.opened, // 打开侧边栏
        withoutAnimation: sidebar.value.withoutAnimation, // 无动效
        mobile: device.value === DeviceType.Mobile, // 是否手机
      };
    });

    // 是否展示 tagsView
    const showTagsView = computed(() => {
      return store.state.app.showTagsView;
    });

    // 是否固定 header
    const fixedHeader = computed(() => {
      return store.state.settings.fixedHeader;
    });

    return {
      handleClickOutside,
      classObj,
      sidebar,
      showTagsView,
      fixedHeader,
    };
  },
});
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
