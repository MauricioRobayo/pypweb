import { useState } from "react";
import ObfuscatedEmail from "./ObfuscatedEmail";

type EmailProps = {
  className?: string;
  email: string;
};
export default function Email({ className, email }: EmailProps) {
  const [hovered, setHovered] = useState(false);

  function handleHover() {
    setHovered(true);
  }

  return (
    <span className={className} onFocus={handleHover} onMouseOver={handleHover}>
      {hovered ? email : <ObfuscatedEmail email={email} />}
    </span>
  );
}
