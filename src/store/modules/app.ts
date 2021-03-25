import { getSize, setSidebarStatus, setSize } from '@/utils/cookies';

export enum DeviceType {
  Mobile,
  Desktop,
}

const state = {
  sidebar: { // 侧边栏控制
    opened: true,
    withoutAnimation: true, // 是否有动画
  },
  showTagsView: true,
  device: DeviceType.Desktop,
  size: getSize() || 'medium'
};

const mutations = {
  TOGGLE_SIDEBAR: (state: any) => {
    state.sidebar.opened = !state.sidebar.opened
  },
  CLOSE_SIDEBAR: (state: any, withoutAnimation: boolean) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  },
  SET_SIZE(state: any, size: string) {
    state.size = size
    setSize(state.size)
  }
};

const actions = {
  ToggleSideBar(context: any) {
    context.commit('TOGGLE_SIDEBAR')
  },
  CloseSideBar(context: any, withoutAnimation: boolean) {
    context.commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  SetSize(context: any, size: string) {
    context.commit('SET_SIZE', size)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
