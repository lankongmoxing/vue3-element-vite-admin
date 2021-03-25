/**
 * 设置文件
 */

type KeyValueType = {
  key: string,
  value: any
}

const state = {
  theme: '', // 主题色
  showSidebarLogo: true, // 是否展示logo
  fixedHeader: true, // 是否固定 header
  sidebarTextTheme: false, // sidebar 字体主题是否使用
 };
 
 const mutations = {
  CHANGE_SETTING: (state: any, payload: KeyValueType) => {
    state[payload.key] = payload.value
  },
 };
 
 const actions = {
  ChangeSetting(context: any, payload: KeyValueType) {
    context.commit('CHANGE_SETTING', payload)
   },
 };
 
 export default {
   namespaced: true,
   state,
   mutations,
   actions,
 };
 