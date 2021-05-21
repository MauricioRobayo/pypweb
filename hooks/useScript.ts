import React, { useEffect } from "react";

const useScript = ({
  ref,
  src,
  id,
  innerHTML,
  async = false,
  prepend = false,
}: {
  ref: React.RefObject<HTMLDivElement>;
  src?: string;
  id: string;
  innerHTML?: string;
  async?: boolean;
  prepend?: boolean;
}) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const oldScript = document.getElementById(id) as HTMLScriptElement;
    if (oldScript) {
      if (src) {
        oldScript.src = src;
      } else if (innerHTML) {
        oldScript.innerHTML = innerHTML;
      }
      return;
    }

    const newScript = document.createElement("script");
    newScript.id = id;
    if (src) {
      newScript.src = src;
    } else if (innerHTML) {
      newScript.innerHTML = innerHTML;
    }
    newScript.async = async;

    if (prepend) {
      ref.current.prepend(newScript);
    } else {
      ref.current.append(newScript);
    }
  }, [src, innerHTML]);
};

export default useScript;
