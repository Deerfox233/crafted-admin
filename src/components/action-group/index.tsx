import "./index.less";

import * as Icons from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import classNames from "classnames";
import React, { useMemo } from "react";

import { checkPermission } from "@/utils/permission";

interface ActionItem {
  text: string;
  onClick?: () => void;
  children?: Omit<ActionItem, "children">[]; // dropdown 使用
  permissionCode?: string;
  disabled?: boolean;
}

export interface ActionGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: ActionItem[];
}

const ActionGroup: React.FC<ActionGroupProps> = (props) => {
  const { items, ...restProps } = props;

  const actions = useMemo(() => {
    const actions = items.map(
      ({ text, onClick, permissionCode, disabled = false, children }) => {
        if (children == null) {
          return (
            checkPermission(permissionCode) && (
              <span
                key={permissionCode}
                className={classNames({
                  ["action-group__item"]: true,
                  ["action-group__item--disabled"]: disabled,
                })}
                onClick={disabled ? undefined : onClick}
              >
                {text}
              </span>
            )
          );
        } else {
          const dropdownActions = children
            .map(
              (child) =>
                checkPermission(child.permissionCode) && (
                  <span
                    key={child.text}
                    onClick={disabled ? undefined : child.onClick}
                  >
                    {child.text}
                  </span>
                ),
            )
            .filter((child) => child);

          return dropdownActions.length > 0 ? (
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  {dropdownActions.map((dropdownAction, index) => (
                    <Menu.Item key={index}>{dropdownAction}</Menu.Item>
                  ))}
                </Menu>
              }
              disabled={disabled}
            >
              <span
                key={permissionCode}
                className={classNames({
                  ["action-group__item"]: true,
                  ["action-group__item--disabled"]: disabled,
                })}
              >
                {text}
                <Icons.CaretDownOutlined style={{ verticalAlign: -5 }} />
              </span>
            </Dropdown>
          ) : null;
        }
      },
    );
    if (actions.every((action) => !action)) {
      return null;
    }
    return actions;
  }, [items]);

  return actions != null ? (
    <div
      className={classNames({
        ["action-group"]: true,
      })}
      {...restProps}
    >
      {actions}
    </div>
  ) : null;
};

export default ActionGroup;
