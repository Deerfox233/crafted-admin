import { ActionTypeEnum } from "../constants/action-type";
import { ComponentProps } from "./component";
import { ObjectData, Position } from "./object";

export interface PageState {
  // 供 main 渲染的数组
  objects: ObjectData[];
  // 当前编辑的是元素
  currentId?: string;
}

export type Action =
  | {
      type: ActionTypeEnum.ADD_OBJECT;
      payload: { object: Omit<ObjectData, "id"> };
    }
  | {
      type: ActionTypeEnum.SELECT_OBJECT;
      payload: { id: string };
    }
  | {
      type: ActionTypeEnum.UNSELECT_OBJECT;
    }
  | {
      type: ActionTypeEnum.REMOVE_OBJECT;
      payload: { id: string };
    }
  | {
      type: ActionTypeEnum.MODIFY_OBJECT;
      payload: {
        props?: ComponentProps;
        position?: Position;
      };
    };
