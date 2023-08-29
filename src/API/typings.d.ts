// @ts-ignore
/* eslint-disable */

declare namespace API {
  type LoginParams = {
    username?: string;
    password?: string;
  };

  type CurrentUser = {
    _id: string;
    username: string;
    password?: string;
    createTime: number;
    updateTime: number;
  };

  interface ResponsePage<T> extends ResponseBaseResult {
    data: {
      total: number;
      current: number;
      pageSize: number;
      list: T[];
    };
  }

  type ResponseBaseResult = {
    code: number;
    success: boolean;
    message?: string;
  };

  type LoginResult = ResponseBaseResult & {
    user: CurrentUser;
    token: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
