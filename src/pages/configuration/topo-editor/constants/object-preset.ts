import { ObjectPreset } from "../types/object-preset";
import { ComponentNameEnum } from "./component-name";

/**
 * 组件预设，用于左侧边栏渲染
 */
export const ObjectPresetEnum: Record<string, ObjectPreset> = {
  NORMAL_TEXT: {
    name: "标准文本",
    componentName: ComponentNameEnum.Text,
    props: {
      text: "标准文本",
      style: {
        fontSize: "20px",
        color: "#000000",
        lineHeight: "1",
      },
    },
  },
  ERROR_TEXT: {
    name: "错误文本",
    componentName: ComponentNameEnum.Text,
    props: {
      text: "错误文本",
      style: {
        fontSize: "20px",
        color: "red",
        lineHeight: "1",
      },
    },
  },
  BAIDU_IMAGE: {
    name: "百度测试图片",
    componentName: ComponentNameEnum.Image,
    props: {
      src: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
      style: {
        width: 100,
      },
    },
  },
};
