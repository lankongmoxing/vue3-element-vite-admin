<template>
  <svg :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true // 此处的svg名称是必须的
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, content) {
    const { name, className } = toRefs(props)
    const iconName = computed(() => {
      return `#icon-${name.value}`
    })
    const svgClass = computed(() => {
      if (className) {
        return 'svg-icon ' + className.value
      } else {
        return 'svg-icon'
      }
    })
    return {
      iconName,
      svgClass
    }
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
