<template>
  <div
    class="sidebar-logo-container"
    :class="{'collapse': collapse}"
  >
    <transition name="sidebarLogoFade">
      <!-- sidebar 关闭的情况下只显示图片 -->
      <div
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
      >
        <img
          src="/favicon.ico"
          class="sidebar-logo"
        >
      </div>
      <div
        v-else
        key="expand"
        class="sidebar-logo-link"
      >
        <img
          src="/favicon.ico"
          class="sidebar-logo"
        >
        <h1 class="sidebar-title">
          {{ title }}
        </h1>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    collapse: { // sidebar 是否关闭
      type: Boolean,
      default: true
    }
  },
  setup() {
    const title: string = '运营后台' // logo 的标题

    return {
      title
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  background: #fff;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
