/**
 * 用户模块
 */
interface userInfoType {
   username: string,
   password: string
}

const state = {
  token: '', // token
 };
 
 const mutations = {
  SET_TOKEN: (state: any, token: string) => {
    state.token = token
  },
 };
 
 const actions = {
  Login(context: any, userInfo: userInfoType) {
    console.log(userInfo)
   },
 };
 
 export default {
   namespaced: true,
   state,
   mutations,
   actions,
 };
 