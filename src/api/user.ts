import request from './../utils/request'

const enum pathList {
  login = '/'
}

interface loginType {
  username: string;
  password: string;
}

export function loginAPI (params: loginType) {
  return request({
    url: pathList.login,
    method: 'get',
    params
  })
}