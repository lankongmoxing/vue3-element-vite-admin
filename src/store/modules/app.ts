
const state = {
  sidebar: { // 侧边栏控制
    opened: true,
    showTagsView: true,
    withoutAnimation: true // 是否有动画
  },
};

const mutations = {
  TEST: () => {
    console.log('test')
  },
  TOGGLE_SIDEBAR: (state: any) => {
    state.sidebar.opened = !state.sidebar.opened
  }
};

const actions = {
  test() {
    console.log('test')
  },
  ToggleSideBar(context: any) {
    context.commit('TOGGLE_SIDEBAR')
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
