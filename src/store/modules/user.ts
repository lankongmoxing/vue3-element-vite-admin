/**
 * 用户模块
 */

import { loginAPI } from "@/api/user";
import {
  getToken,
  removeCurrentName,
  removeEmptyRole,
  removeMenuList,
  removeToken,
  setMenuList,
  setToken
} from "@/utils/cookies";
import permission from "./permission";

interface userInfoType {
  username: string;
  password: string;
}

const state = {
  token: getToken() || "666", // token
  name: <string>"",
  avatar: <string>"",
  introduction: <string>"",
  storeList: <any[]>[],
  roles: <string[]>[],
  emptyRole: false,
};

const mutations = {
  SET_TOKEN: (token: string) => {
    state.token = token;
  },
  SET_EMPTY_ROLE(authorities: any) {
    if (authorities.length === 0) {
      state.emptyRole = true;
    }
  },
  SET_ROLES(roles: string[]) {
    state.roles = roles;
  },
  SET_STORE_LIST(data: any) {
    state.storeList = data;
  },
};

const actions = {
  // 登录
  Login: async (context: any, userInfo: userInfoType) => {
    let { username, password } = userInfo;
    username = username.trim();
    const params = {
      username,
      password,
    };
    const res: any = await loginAPI(params);
    setToken(res.token);
    setMenuList(res.list);
  },

  ResetToken() {
    removeToken();
    removeMenuList();
    removeEmptyRole();
    mutations.SET_TOKEN("");
    mutations.SET_ROLES([]);
    mutations.SET_EMPTY_ROLE("");
  },

  // 登出
  LogOut() {
    if (state.token === "") {
      throw Error("LogOut: token is undefined!");
    }
    removeToken();
    // resetRouter();
    removeMenuList();
    removeCurrentName();

    mutations.SET_TOKEN("");
    mutations.SET_ROLES([]);

    permission.actions.removeBuildFlag();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
