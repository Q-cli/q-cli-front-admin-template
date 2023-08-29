// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录接口 POST /api/login */
export async function loginApi(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function logOutApi(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/logout', {
    method: 'GET',
    ...(options || {}),
  });
}
