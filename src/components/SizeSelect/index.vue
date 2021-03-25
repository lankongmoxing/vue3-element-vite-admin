<template>
  <el-dropdown
    id="size-select"
    trigger="click"
    @command="handleSetSize"
  >
    <div>
      <svg-icon
        class="size-icon"
        name="size"
      />
    </div>
    <el-dropdown-menu>
      <el-dropdown-item
        v-for="item of sizeOptions"
        :key="item.value"
        :disabled="size===item.value"
        :command="item.value"
      >
        {{
          item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SizeSelect',
  setup() {
    const store = useStore()
    const sizeOptions = [
      { label: 'Default', value: 'default' },
      { label: 'Medium', value: 'medium' },
      { label: 'Small', value: 'small' },
      { label: 'Mini', value: 'mini' }
    ]

    const size = computed(() => {
      return store.state.app.size
    })

    const handleSetSize = (size: string) => {
      store.dispatch('app/SetSize', size)
      refreshView()
    }

    const refreshView = () => {

    }

    return {
      sizeOptions,
      size,
      handleSetSize
    }
  }
})
</script>
