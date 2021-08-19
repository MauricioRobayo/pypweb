import { Semoji } from "switch-emoji";

type Props = {
  emoji: string;
  height?: string;
  className?: string;
};
export function Emoji(props: Props) {
  return <Semoji {...props} source="Twitter" />;
}
