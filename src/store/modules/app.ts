import { setSidebarStatus } from '@/utils/Cookies';

const state = {
  sidebar: { // 侧边栏控制
    opened: true,
    showTagsView: true,
    withoutAnimation: true // 是否有动画
  },
};

const mutations = {
  TOGGLE_SIDEBAR: (state: any) => {
    state.sidebar.opened = !state.sidebar.opened
  },
  CLOSE_SIDEBAR: (state: any, withoutAnimation: boolean) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  }
};

const actions = {
  ToggleSideBar(context: any) {
    context.commit('TOGGLE_SIDEBAR')
  },
  CloseSideBar(context: any, withoutAnimation: boolean) {
    context.commit('CLOSE_SIDEBAR', withoutAnimation)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
