export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  text: string;
}
