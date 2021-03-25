/**
 * 此处使用 js-cookie
 * 1. cnpm i js-cookie -S
 * 2. cnpm i @types/js-cookie -S -D
 */

import Cookies from "js-cookie";

// App
const sidebarStatusKey = "sidebar_status";
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey);
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus);

const languageKey = "language";
export const getLanguage = () => Cookies.get(languageKey);
export const setLanguage = (language: string) =>
  Cookies.set(languageKey, language);
export const getCurrentName = () => {
  return localStorage.getItem("mkyy_current_menu_name");
};

const sizeKey = "size";
export const getSize = () => Cookies.get(sizeKey);
export const setSize = (size: string) => Cookies.set(sizeKey, size);

// User
const tokenKey = "CAT_COFFEE_YY_TOKENv1.1.9";
export const getToken = () => Cookies.get(tokenKey);
export const getMenuList = () => {
  try {
    return JSON.parse(localStorage.getItem("mkyy_auth_menu") || "");
  } catch (err) {
    return [];
  }
};
export const getEmptyRole = () => {
  try {
    return localStorage.getItem("empty_role") || "";
  } catch (err) {
    return "";
  }
};
export const setToken = (token: string) => Cookies.set(tokenKey, token);
export const setMenuList = (list: string) =>
  localStorage.setItem("mkyy_auth_menu", JSON.stringify(list));
export const setEmptyRole = (params: string) =>
  localStorage.setItem("empty_role", params);
export const removeEmptyRole = () => localStorage.removeItem("empty_role");
export const removeToken = () => Cookies.remove(tokenKey);
export const removeMenuList = () => localStorage.removeItem("mkyy_auth_menu");
export const removeCurrentName = () =>
  localStorage.removeItem("mkyy_current_menu_name");
export const setCurrentName = (name: string) =>
  localStorage.setItem("mkyy_current_menu_name", name);
