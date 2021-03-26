import userVuex from "@/store/modules/user";
import axios, { AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

// 将 axios 实例化
const service = axios.create({
  baseURL: <string>import.meta.env.VITE_APP_BASE_API,
  timeout: 5 * 1000, // 超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // data params 转化
    const methods = config.method;
    if (methods === "post") {
      config.data = config.params;
      config.params = null;
    }

    // todo 需要处理 header 相关的信息
    config.headers["Authorization"] = userVuex.state.token || "";
    return config;
  },
  (error) => {
    console.log("reuqest.ts request error", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.data.code === 0) {
      return response.data;
    } else {
      ElMessage.error(response.data.msg || "请求失败");
      return Promise.reject();
    }
  },
  (error) => {
    console.log("reuqest.ts response error", error);
    return Promise.reject(error);
  }
);

export default service;
