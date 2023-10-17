import * as Icons from "@ant-design/icons";

import { PermissionCodeEnum } from "@/constants/permission";

// eslint-disable-next-line react-refresh/only-export-components
export enum RouteKeyEnum {
  LOGIN = "LOGIN",

  ROOT = "ROOT",
  USER = "USER",
  PERSONAL_INFORMATION = "PERSONAL_INFORMATION",
  ROLE_MANAGEMENT = "ROLE_MANAGEMENT",
  NEW_ROLE = "NEW_ROLE",
  CONFIGURATION = "CONFIGURATION",
  TOPO_MANAGEMENT = "TOPO_MANAGEMENT",
  TOPO_EDITOR = "TOPO_EDITOR",
  PAGE_403 = "PAGE_403",
  PAGE_404 = "PAGE_404",

  TEST = "TEST",
}

export interface RoutePath {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element?: Promise<any>;
  // loader?: () => Promise<Response | null>;
  description: string;
  permissionCodes?: string[];
  parentKey?: RouteKeyEnum;
  // 作为菜单
  menu?: {
    // key 为对应的 RouteKeyEnum，不做显式声明
    icon?: React.ReactNode;
  };
}

export const RoutePathEnum: Record<RouteKeyEnum, RoutePath> = {
  [RouteKeyEnum.ROOT]: {
    path: "/",
    element: import("@/components/layout"),
    description: "根路由",
  },
  // ----------------------- 账户中心 -----------------------
  [RouteKeyEnum.USER]: {
    path: "/user",
    description: "账户中心",
    parentKey: RouteKeyEnum.ROOT,
    menu: {
      icon: <Icons.HomeOutlined />,
    },
  },
  [RouteKeyEnum.PERSONAL_INFORMATION]: {
    path: "/user/personal-information",
    element: import("@/pages/user/personal-information"),
    permissionCodes: [PermissionCodeEnum.USER.DETAIL],
    description: "个人信息",
    parentKey: RouteKeyEnum.USER,
    menu: {},
  },
  [RouteKeyEnum.ROLE_MANAGEMENT]: {
    path: "/user/role-management",
    element: import("@/pages/user/role-management"),
    permissionCodes: [PermissionCodeEnum.USER.ROLE_LIST],
    description: "角色管理",
    parentKey: RouteKeyEnum.USER,
    menu: {},
  },
  [RouteKeyEnum.NEW_ROLE]: {
    path: "/user/role-management/new-role",
    element: import("@/pages/user/role-management/new-role"),
    permissionCodes: [PermissionCodeEnum.USER.ROLE_LIST],
    description: "新增角色",
    parentKey: RouteKeyEnum.USER,
  },
  // ----------------------- 配置管理 -----------------------
  [RouteKeyEnum.CONFIGURATION]: {
    path: "/custom-management",
    description: "配置管理",
    parentKey: RouteKeyEnum.ROOT,
    menu: {
      icon: <Icons.HomeOutlined />,
    },
  },
  [RouteKeyEnum.TOPO_MANAGEMENT]: {
    path: "/custom-management/configuration-management",
    element: import("@/pages/configuration/topo-management"),
    permissionCodes: [], // TODO 超级管理员权限
    description: "组态管理",
    parentKey: RouteKeyEnum.CONFIGURATION,
    menu: {},
  },
  [RouteKeyEnum.TOPO_EDITOR]: {
    path: "/configuration",
    element: import("@/pages/configuration/topo-editor"),
    description: "组态编辑页", // TODO 超级管理员权限
    permissionCodes: [],
  },
  // ----------------------- 其他页面 -----------------------
  [RouteKeyEnum.LOGIN]: {
    path: "/login",
    element: import("@/pages/base/login"),
    description: "登录页",
  },
  [RouteKeyEnum.PAGE_403]: {
    path: "/forbidden",
    element: import("@/pages/base/403"),
    description: "未授权",
  },
  [RouteKeyEnum.PAGE_404]: {
    path: "*",
    element: import("@/pages/base/404"),
    description: "未认证",
  },
  [RouteKeyEnum.TEST]: {
    path: "/test",
    element: import("@/pages/base/test"),
    description: "测试页",
  },
};
