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

interface userInfoType {
  username: string;
  password: string;
}

interface stateType {
  token: string;
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
  emptyRole: Boolean;
}

const state: stateType = {
  token: getToken() || "", // token
  name: "", // 用户名
  avatar: "", // 头像
  introduction: "", // 简介
  roles: [], // 身份权限
  emptyRole: false, // 是否为空身份
};

interface mutationsType {
  SET_TOKEN: Function;
  SET_EMPTY_ROLE: Function;
  SET_ROLES: Function;
}

const mutations: mutationsType = {
  // 设置 token
  SET_TOKEN: (state: stateType, token: string) => {
    state.token = token;
  },

  // 设置 是否为空身份
  SET_EMPTY_ROLE(state: stateType, authorities: any) {
    if (authorities.length === 0) {
      state.emptyRole = true;
    }
  },

  // 设置 权限数组
  SET_ROLES(state: stateType, roles: string[]) {
    state.roles = roles;
  },
};

interface contextType {
  // TODO 范围太广了，需要完善
  commit: Function;
  dispatch: Function;
}

interface actionsType {
  Login: Function;
  ResetToken: Function;
  LogOut: Function;
}

const actions: actionsType = {
  // 登录
  Login: async (context: contextType, userInfo: userInfoType) => {
    console.log(context);
    let { username, password } = userInfo;
    username = username.trim();
    const params = {
      username,
      password,
    };
    const res: any = await loginAPI(params);
    setToken(res.token);
    setMenuList(res.list);

    context.commit("SET_TOKEN", res.token);
  },

  // 清除 token 菜单列表 空身份
  ResetToken(context: contextType) {
    removeToken();
    removeMenuList();
    removeEmptyRole();

    context.commit("SET_TOKEN", "");
    context.commit("SET_ROLES", []);
    context.commit("SET_EMPTY_ROLE", "");
  },

  // 登出
  LogOut(context: contextType) {
    removeToken();
    // resetRouter();
    removeMenuList();
    removeCurrentName();

    context.commit("SET_TOKEN", "");
    context.commit("SET_ROLES", []);

    context.dispatch("permission/removeBuildFlag", { root: true });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
