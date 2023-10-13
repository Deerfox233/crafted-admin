import { useCallback, useEffect, useState } from "react";

import { useRoutePathKeyValue } from "@/components/router/hooks/router";
import { RouteKeyEnum, RoutePathEnum } from "@/constants/route-path";

export const useMenuKey = () => {
  const [selectedKey] = useRoutePathKeyValue();

  // openKeys 两处触发变化：1. 随“叶节点”点击变化；2. 左侧菜单点击展开；
  const [openKeys, setOpenKeys] = useState<RouteKeyEnum[]>([]);

  // 1.随“叶节点”点击变化
  useEffect(() => {
    const result: RouteKeyEnum[] = [];
    if (selectedKey == null) {
      return;
    }
    const recursive = (openKey: RouteKeyEnum) => {
      Object.entries(RoutePathEnum).forEach(([key, value]) => {
        if (
          (key as RouteKeyEnum) === openKey &&
          value.parentKey != null &&
          value.parentKey != RouteKeyEnum.ROOT
        ) {
          recursive(value.parentKey);
          result.push(value.parentKey);
        }
      });
    };
    recursive(selectedKey);
    setOpenKeys((prevOpenKeys: RouteKeyEnum[]) => {
      return [...new Set([...prevOpenKeys, ...result])];
    });
  }, [selectedKey]);

  // 2. 左侧菜单点击展开
  const onOpenChange = useCallback((keys: string[]) => {
    // keys 只包含“父节点”，不包含“叶子节点”
    setOpenKeys(keys as RouteKeyEnum[]);
  }, []);

  return {
    selectedKeys: selectedKey != null ? [selectedKey] : [],
    openKeys,
    onOpenChange,
  };
};
