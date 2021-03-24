<template>
  <a
    v-if="isExternal(to)"
    :href="to"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>
  <router-link
    v-else
    :to="to"
  >
    <slot />
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { isExternal } from '@/utils/validate.ts'

export default defineComponent({
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return {
      isExternal
    }
  }
})
</script>
