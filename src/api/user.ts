import request from "@/utils/request";

const enum pathList {
  login = "/user/login", // 登录接口
  getMenuList = "/user/menus", // 获取菜单列表
}

interface loginType {
  username: string;
  password: string;
}

// 用户登录
export function loginAPI(params: loginType): Promise<any> {
  return request({
    url: pathList.login,
    method: "get",
    params,
  });
}

// 获取菜单列表
export function getMenuListAPI(): Promise<any> {
  return request({
    url: pathList.getMenuList,
    method: "get",
  });
}
