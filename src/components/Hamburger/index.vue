<template>
  <div
    :class="[{'is-active': isActive}]"
    @click="toggleClick"
  >
    <svg-icon
      :width="'20px'"
      :height="'20px'"
      class-name="hamburger-icon"
      name="hamburger"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const toggleClick = () => {
      context.emit('toggleClick')
    }

    return {
      toggleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
