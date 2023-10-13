import { useCallback, useMemo } from "react";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouteObject,
  useLocation,
} from "react-router-dom";

import { LocalKeyEnum } from "@/constants/local-key";
import { RouteKeyEnum, RoutePath, RoutePathEnum } from "@/constants/route-path";
import { LoginResult } from "@/types/base";
import { LocalStorageUtils } from "@/utils/local-storage";
import { checkPermission } from "@/utils/permission";

export const useRouter = () => {
  const generateRoutes = useCallback(
    (parentKey?: RouteKeyEnum): RouteObject[] => {
      const result: RouteObject[] = [];
      Object.entries(RoutePathEnum).forEach(([key, value]) => {
        if (value?.parentKey === parentKey) {
          // 初始 route，赋值各个字段
          const route: RouteObject = { path: value.path };
          // route 加默认权限拦截（处理“用户直接复制链接跳转”的情况）
          if (value.permissionCodes != null) {
            route.loader = () => {
              console.debug("now route.loader is", key);
              // 401 判断
              const loginResult = LocalStorageUtils.getItem<LoginResult>(
                LocalKeyEnum.LOGIN_RESULT,
              );
              if (loginResult?.token == null) {
                return redirect(RoutePathEnum.LOGIN.path);
              }
              // 403 判断
              if (
                value.permissionCodes?.some((code) => !checkPermission(code))
              ) {
                return redirect(RoutePathEnum.PAGE_403.path);
              }
              return null;
            };
          }
          if (value.element != null) {
            route.lazy = async () => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              const Component = (await value.element).default;
              return {
                element: <Component />,
              };
            };
          }
          // 递归构建 children
          route.children = generateRoutes(key as RouteKeyEnum);
          if (route.children?.length === 0) {
            delete route.children;
          }
          // 没有 element 的 route （或者根路由）默认指向 children[0]
          if (
            ([RouteKeyEnum.ROOT].includes(key as RouteKeyEnum) ||
              route.lazy == null) &&
            route.children != null
          ) {
            route.children.unshift({
              index: true,
              element: <Navigate to={route.children[0].path!} replace />,
            });
          }
          result.push(route);
        }
        // }
      });
      return result;
    },
    [],
  );

  const router = useMemo(() => {
    const routes = generateRoutes();
    return createBrowserRouter(routes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return router;
};

/**
 * 返回路由的 key 和 routePath
 * 如果外部没有指定 pathname，则使用当前路由
 * @param pathname
 * @returns
 */
export const useRoutePathKeyValue = (pathname?: string) => {
  const { pathname: currentPathname } = useLocation();
  const finalPathname = pathname ?? currentPathname;
  const routePathKeyValue: [RouteKeyEnum, RoutePath] | undefined =
    useMemo(() => {
      return Object.entries(RoutePathEnum).find(([, value]) => {
        // TODO 优化
        if (finalPathname === value.path) {
          return true;
        }
      }) as [RouteKeyEnum, RoutePath];
    }, [finalPathname]);
  return routePathKeyValue ?? [undefined, undefined];
};
