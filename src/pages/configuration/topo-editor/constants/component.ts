import { Image } from "../components/c-image";
import { Text } from "../components/c-text";
import { ComponentNameEnum } from "./component-name";

/**
 * 策略模式
 */
export const ComponentEnum = {
  [ComponentNameEnum.Text]: Text,
  [ComponentNameEnum.Image]: Image,
};
