import { ComponentNameEnum } from "../constants/component-name";
import { ComponentProps } from "./component";

export interface ObjectPreset {
  name: string;
  componentName: ComponentNameEnum;
  props: ComponentProps;
}
