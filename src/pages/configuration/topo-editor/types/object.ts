import { ComponentNameEnum } from "../constants/component-name";
import { ComponentProps } from "../types/component";

/**
 * 单个组件数据
 */
export interface ObjectData {
  id: string;
  props: ComponentProps;
  name: ComponentNameEnum;
  position: Position;
}

export interface Position {
  x: number;
  y: number;
}
