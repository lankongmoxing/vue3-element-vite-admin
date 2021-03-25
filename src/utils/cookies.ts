/**
 * 此处使用 js-cookie
 * 1. cnpm i js-cookie -S
 * 2. cnpm i @types/js-cookie -S -D
 */

import Cookies from 'js-cookie'

const sidebarStatusKey = 'sidebar_status'

export const setSidebarStatus = (sidebarStatus: string) => {
  Cookies.set(sidebarStatusKey, sidebarStatus)
}
