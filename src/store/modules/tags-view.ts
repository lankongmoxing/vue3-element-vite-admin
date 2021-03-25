/**
 * 标签栏
 */

const state = {
  visitedViews: [],
  cachedViews: <(string | undefined)[]>[],
};

const mutations = {
  ADD_VISITED_VIEW: (state: any, view: any) => {
    if (state.visitedViews.some((v: any) => v.path === view.path)) return;
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name",
      })
    );
  },
  ADD_CACHED_VIEW: (state: any, view: any) => {
    if (state.cachedViews.includes(view.name || "")) return;
    if (!view.meta.isDetail) {
      state.cachedViews.push(view.name || "");
    }
  },
  DEL_VISITED_VIEW: (state: any, view: any) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state: any, view: any) => {
    for (const [i, v] of state.cachedViews.entries()) {
      if (v === view.name) {
        state.cachedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_OTHERS_VISITED_VIEWS(state: any, view: any) {
    state.visitedViews = state.visitedViews.filter((v: any) => {
      return v.meta.affix || v.path === view.path
    })
  },

  DEL_OTHERS_CACHED_VIEWS(state: any, view: any) {
    for (const [i, v] of state.cachedViews.entries()) {
      if (v === view.name) {
        state.cachedViews = state.cachedViews.slice(i, i + 1)
        break
      }
    }
  },
  DEL_ALL_VISITED_VIEWS(state: any, view: any) {
    const affixTags = state.visitedViews.filter((tag: any) => tag.meta.affix)
    state.visitedViews = affixTags
  },

  DEL_ALL_CACHED_VIEWS(state: any, view: any) {
    state.cachedViews = []
  },

  UPDATE_VISITED_VIEW(state: any, view: any) {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
};

const actions = {
  addView(context: any, view: any) {
    context('ADD_VISITED_VIEW', view)
    context('ADD_CACHED_VIEW', view)
  },
  
  addVisitedView(context: any, view: any) {
    context('ADD_VISITED_VIEW', view)
  },
  
  delView(context: any, view: any) {
    context('DEL_VISITED_VIEW', view)
    context('DEL_CACHED_VIEW', view)
  },
  
  delCachedView(context: any, view: any) {
    context('DEL_CACHED_VIEW', view)
  },
  
  delOthersViews(context: any, view: any) {
    context('DEL_OTHERS_VISITED_VIEWS', view)
    context('DEL_OTHERS_CACHED_VIEWS', view)
  },
  
  delAllViews(context: any, view: any) {
    context('DEL_ALL_VISITED_VIEWS', view)
    context('DEL_ALL_CACHED_VIEWS', view)
  },
  
  delAllCachedViews(context: any, view: any) {
    context('DEL_ALL_CACHED_VIEWS', view)
  },
  
  updateVisitedView(context: any, view: any) {
    context('UPDATE_VISITED_VIEW', view)
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
