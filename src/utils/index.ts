import { RcFile } from "antd/es/upload";

/**
 * 摘自 formily
 * @param props
 * @returns
 */
export const pickDataProps = (props: Record<string, unknown> = {}) => {
  const results: Record<string, unknown> = {};

  for (const key in props) {
    if (key.indexOf("data-") > -1) {
      results[key] = props[key];
    }
  }

  return results;
};

/**
 * 根据文字生成颜色（用于头像背景等）
 * @param inputText 文字
 * @returns
 */
export const generateColorFromString = (inputText: string): string => {
  // 将输入文本的字符总和映射到0到16777215的整数范围
  let hash = 0;
  for (let i = 0; i < inputText.length; i++) {
    const char = inputText.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }

  // 通过位操作和掩码来生成RGB颜色值
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  // 将RGB值格式化为十六进制颜色字符串
  const color = `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)}`;

  return color;
};

const isMac = () => {
  if (/macintosh|mac os x/i.test(navigator.userAgent)) {
    return true;
  }
  return false;
};

/**
 * 判断文件大小是否符合要求，单位为 MB
 * @param files
 * @param size
 * @returns
 */
export const isLimitSize = (files: RcFile, size = 100) => {
  if (isMac()) {
    return files.size / 1000 / 1000 < size;
  }
  return files.size / 1024 / 1024 < size;
};

/**
 * 获取公共资源路径
 * @param url
 * @returns
 */
export const getResourceUrl = (url: string) => {
  // http
  if (url && url.startsWith("http")) {
    return url;
  }
  return `/download/static/${url}`;
};
