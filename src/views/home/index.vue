<template>
  <div>
    666 888
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-button @click="click">666</el-button>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { testAPI } from '@/api/test'

export default defineComponent({
  setup() {
    const options = {}

    const value = ''

    const click = () => {
      const params = {
        username: '',
        password: ''
      }
      testAPI(params).then((res: any) => {
        console.log(res)
      })
    }
    return {
      options,
      value,
      click
    }
  }
})
</script>
