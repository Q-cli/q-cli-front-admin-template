// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function getCurrentUserApi() {
  return request<{ user: API.CurrentUser }>('/api/currentUser', { method: 'GET' });
}

export function getUserListApi(params: API.PageParams) {
  return request<API.ResponsePage<API.CurrentUser>>('/api/user', { method: 'GET', params });
}

export function saveUserApi(params: API.CurrentUser) {
  return request<API.ResponseBaseResult>('/api/user', { method: 'PUT', data: params });
}

export function updateUserAPi(params: API.CurrentUser) {
  return request<API.ResponseBaseResult>('/api/user', { method: 'POST', data: params });
}

export function deleteUserApi(_id: string) {
  return request<API.ResponseBaseResult>('/api/user/', { method: 'DELETE', params: { _id } });
}
