import { TextProps } from "../../types/c-text";

export const Text = (props: TextProps) => {
  const { text, ...restProps } = props;
  return <div {...restProps}>{text}</div>;
};
