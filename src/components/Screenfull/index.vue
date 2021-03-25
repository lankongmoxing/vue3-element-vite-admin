<template>
  <div id="screenfull">
    <svg-icon
      :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script lang="ts">
import * as screenfull from 'screenfull'
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

const sf: any = screenfull
export default defineComponent({
  setup() {
    const isFullscreen = ref(false)

    onMounted(() => {
      if (sf && sf.enabled) {
        sf.on('change', change)
      }
    })

    onBeforeUnmount(() => {
      if (sf && sf.enabled) {
        sf.off('change', change)
      }
    })

    const change = () => {
      if (sf && sf.enabled) {
        isFullscreen.value = sf.isFullscreen
      }
    }

    const click = () => {
      if (sf) {
        if (!sf.enabled) {
          // this.$message({
          //   message: 'you browser can not work',
          //   type: 'warning'
          // })
          return false
        }
        sf.toggle()
      }
    }

    return {
      isFullscreen,
      click
    }
  }
})
</script>
