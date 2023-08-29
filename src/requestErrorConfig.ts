import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';

// 错误处理方案： 错误类型
// enum ErrorCode {
//   FAILED = 0,
//   SUCCESS = 1,
// }
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  code?: 0 | 1;
  message?: string;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    // errorThrower: (res) => {
    //   console.log('errorThrower', res);
    //   const { success, code, message } = res as ResponseStructure;
    //   if (!success) {
    //     const error: any = new Error(message);
    //     error.name = 'BizError';
    //     error.info = { code, message };
    //     throw error; // 抛出自制的错误
    //   }
    // },
    // 错误接收及处理
    // errorHandler: (error: any, opts: any) => {
    // if (opts?.skipErrorHandler) throw error;
    // // 我们的 errorThrower 抛出的错误。
    // if (error.name === 'BizError') {
    // const errorInfo: ResponseStructure | undefined = error.info;
    // if (errorInfo) {
    //   switch (errorInfo.code) {
    //     case ErrorCode.FAILED:
    //       message.error(errorInfo.message);
    //       break;
    //     default:
    //       break;
    //   }
    // }
    // }
    // else if (error.response) {
    //   // Axios 的错误
    //   // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    //   message.error(`Response status:${error.response.status}`);
    // } else if (error.request) {
    //   // 请求已经成功发起，但没有收到响应
    //   // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
    //   // 而在node.js中是 http.ClientRequest 的实例
    //   message.error('None response! Please retry.');
    // } else {
    //   // 发送请求时出了点问题
    //   message.error('Request error, please retry.');
    // }
    // },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url;
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as { data: ResponseStructure };
      if (data?.success === false) {
        // message.error(data.message ?? '请求失败！');
        throw new Error(data.message ?? '请求失败！');
      }
      return response;
    },
  ],
};
