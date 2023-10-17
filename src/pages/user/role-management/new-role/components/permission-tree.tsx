import { connect, mapProps } from "@formily/react";
import { Checkbox, Tree } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { BasicDataNode, DataNode, EventDataNode } from "antd/es/tree";
import { Key } from "antd/lib/table/interface";
import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";

export interface CheckInfo<TreeDataType extends BasicDataNode = DataNode> {
  event: "check";
  node: EventDataNode<TreeDataType>;
  checked: boolean;
  nativeEvent: MouseEvent;
  checkedNodes: TreeDataType[];
  checkedNodesPositions?: {
    node: TreeDataType;
    pos: string;
  }[];
  halfCheckedKeys?: Key[];
}

const Tooltips = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TreeContainer = styled.div`
  width: 46rem;
  border: 1px solid #f0f0f0;
  border-radius: 1rem;
  padding: 1rem;
`;

interface AugmentedTreeProps {
  treeData: DataNode[];
  value: Key[];
  onChange: (checkedKeys: Key[]) => void;
}

const AugmentedTree = (props: AugmentedTreeProps) => {
  const { treeData, onChange } = props;
  const [allChecked, setAllChecked] = useState(false);
  const [amount, setAmount] = useState(0);

  const getTotalLeafKeys = (): { amount: number; keys: Key[] } => {
    let amount = 0;
    const keys: Key[] = [];
    const recursion = (data: DataNode[]) => {
      data.forEach((item) => {
        if (item.children) {
          recursion(item.children);
        } else {
          amount++;
          keys.push(item.key);
        }
      });
    };
    recursion(treeData);
    return { amount, keys };
  };

  // TODO: 类型问题
  const reducer = (
    state: Key[],
    action: { type: string; value?: CheckInfo },
  ): Key[] => {
    const { type, value } = action;

    switch (type) {
      case "select parent":
        onChange([...state, ...value!.node.children!.map((item) => item.key)]);
        return [...state, ...value!.node.children!.map((item) => item.key)];
      case "deselect parent":
        onChange(
          state.filter((item) => {
            if (value!.node.children!.map((item) => item.key).includes(item)) {
              return false;
            }
            return true;
          }),
        );
        return state.filter((item) => {
          if (value!.node.children!.map((item) => item.key).includes(item)) {
            return false;
          }
          return true;
        });
      case "select child":
        onChange([...state, value!.node.key]);
        return [...state, value!.node.key];
      case "deselect child":
        onChange(
          state.filter((item) => {
            if (item === value!.node.key) {
              return false;
            }
            return true;
          }),
        );
        return state.filter((item) => {
          if (item === value!.node.key) {
            return false;
          }
          return true;
        });
      case "select all":
        onChange(getTotalLeafKeys().keys);
        return getTotalLeafKeys().keys;
      case "deselect all":
        onChange([]);
        return [];
      default:
        return state;
    }
  };

  const [checkedKeys, dispatch] = useReducer<
    (state: Key[], action: { type: string; value?: CheckInfo }) => Key[]
  >(reducer, []);

  useEffect(() => {
    if (amount === getTotalLeafKeys().amount) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [amount]);

  const selectAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setAmount(getTotalLeafKeys().amount);
      dispatch({ type: "select all" });
    } else {
      setAmount(0);
      dispatch({ type: "deselect all" });
    }
  };

  const onCheck = (_: unknown, e: CheckInfo) => {
    if (e.node.children) {
      if (!e.node.checked) {
        // 选中父节点
        setAmount(amount + e.node.children.length);
        dispatch({ type: "select parent", value: e });
      } else {
        // 取消选中父节点
        setAmount(amount - e.node.children.length);
        dispatch({ type: "deselect parent", value: e });
      }
    } else {
      if (!e.node.checked) {
        // 选中子节点
        setAmount(amount + 1);
        dispatch({ type: "select child", value: e });
      } else {
        // 取消选中子节点
        setAmount(amount - 1);
        dispatch({ type: "deselect child", value: e });
      }
    }
  };

  return (
    <>
      <Tooltips>
        <span>已选择{amount}项</span>
        <Checkbox checked={allChecked} onChange={selectAll}>
          全选
        </Checkbox>
      </Tooltips>
      <TreeContainer>
        <Tree
          checkable
          defaultExpandAll
          treeData={treeData}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
        />
      </TreeContainer>
    </>
  );
};

export const PermissionTree = connect(
  AugmentedTree,
  mapProps({
    dataSource: "treeData",
  }),
);
