<template>
  <div
    id="header-search"
    class="header-search show"
  >
    <el-cascader
      ref="headerSearchSelect"
      v-model="search"
      filterable
      placeholder="搜索"
      class="header-search-select"
      :options="options"
      @change="change"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const routes = store.state.permission.routes
    // 过滤
    const canRouters: any = []

    routes.map((v: any) => {
      if (!v.hidden) {
        v.label = v.meta.title
        v.value = v.path
        v.children.map((cv: any) => {
          cv.label = cv.meta.title
          cv.value = cv.path
        })
        canRouters.push(v)
      }
    })

    const options: any = canRouters

    const search = ref('')

    const change = (path: string[]) => {
      if (path[0] === '/') {
        router.push('/index')
      } else {
        router.push(path.join('/'))
      }
    }

    const props = {
      expandTrigger: 'hover',
      value: 'path',
      label: 'meta.title'
    }

    return {
      options,
      search,
      change,
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  background: #fff;
  padding-left: 10px;
  padding-right: 10px;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 180px;
      margin: 10px 0 0 10px;
    }
  }
}
</style>
