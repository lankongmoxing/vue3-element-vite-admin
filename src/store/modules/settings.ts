type KeyValueType = {
  key: string,
  value: any
}

const state = {
  showSidebarLogo: true, // 是否展示logo
 };
 
 const mutations = {
  CHANGE_SETTING: (payload: KeyValueType) => {
   },
 };
 
 const actions = {
  ChangeSetting(payload: KeyValueType) {
    // commit('CHANGE_SETTING', payload)
   },
 };
 
 export default {
   namespaced: true,
   state,
   mutations,
   actions,
 };
 