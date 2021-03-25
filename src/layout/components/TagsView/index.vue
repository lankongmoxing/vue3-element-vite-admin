<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click="closeSelectedTag(tag)"
        @contextmenu="openMenu(tag, $event)"
      >
        {{ tag.meta.title }}
        <span
          v-if="!tag.meta.affix"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li
        v-if="!(selectedTag.meta && selectedTag.meta.affix)"
        @click="closeSelectedTag(selectedTag)"
      >
        关闭
      </li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { setCurrentName } from "@/utils/cookies";
import ScrollPane from './ScrollPane.vue'

export default defineComponent({
  components: {
    ScrollPane
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const visible = ref(false)

    const selectedTag = <any>reactive({});

    const left = ref(0)
    const top = ref(0)

    const closeOthersTags = () => {
      router.push(selectedTag.fullPath || "")

      // store.dispatch("tagsView/delOthersViews", selectedTag)
      // moveToCurrentTag()
    };

    const tagRef = <any>ref(null);
    const moveToCurrentTag = () => {
      // const tags = this.$refs.tag as any[] // TODO: better typescript support for router-link
      // this.$nextTick(() => {
      //   for (const tag of tags) {
      //     if ((tag.to as ITagView).path === this.$route.path) {
      //       (this.$refs.scrollPane as ScrollPane).moveToTarget(tag as any)
      //       // When query is different then update
      //       if ((tag.to as ITagView).fullPath !== this.$route.fullPath) {
      //         TagsViewModule.updateVisitedView(this.$route)
      //       }
      //       break
      //     }
      //   }
      // })
    };

    const visitedViews = computed(() => {
      return store.state.tagsView.visitedViews;
    });

    const isActive = (route2: any) => {
      if (route2.path === route.path) {
        setCurrentName(route2.name);
        return true;
      } else {
        return false;
      }
    };

    // 关闭当前页面 清空本地存储的搜索框值
    const closeSelectedTag = (view: any) => {
      // 关闭当前页面 清空本地存储的搜索框值
      const data = view.path || "";
      if (sessionStorage.getItem(data)) {
        sessionStorage.removeItem(data);
      }
      store.dispatch("tagsView/delView", view);
      if (isActive(view)) {
        toLastView(store.state.tagsView.visitedViews, view);
      }
    };

    const toLastView = (visitedViews: any[], view: any) => {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        router.push(latestView.fullPath || "");
      } else {
        // Default redirect to the home page if there is no tags-view, adjust it if you want
        if (view.name === "Dashboard") {
          // to reload home page
          router.replace({ path: "/redirect" + view.fullPath });
        } else {
          const redirect = store.state.permission.defaultRoute;
          router.push(redirect || "/");
        }
      }
    };

    return {
      visitedViews,
      closeSelectedTag,
      closeOthersTags,
      left,
      top,
      visible,
      selectedTag,
    };
  },
});
</script>

<style lang="scss">
// Reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import "src/styles/_variables.scss";
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: $tiffany;
        color: #fff;
        border-color: $tiffany;

        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
