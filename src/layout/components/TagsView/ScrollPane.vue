<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// const tagSpacing = 4

export default defineComponent({
  name: 'ScrollPane',
  setup() {
    const handleScroll = (e: any) => {
      // const eventDelta = e.wheelDelta || -e.deltaY * 40
      // const scrollContainer = this.$refs.scrollContainer;
      // const scrollWrapper = scrollContainer.$refs.wrap as HTMLElement;
      // scrollWrapper.scrollLeft = scrollWrapper.scrollLeft + eventDelta / 4;
    }

    return {
      handleScroll
    }
  }
})
</script>

<style lang="scss">
.scroll-container {
  .el-scrollbar__bar {
    bottom: 0px;
  }

  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}
</style>
