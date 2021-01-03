import React, { useEffect } from "react";

const useScript = (
  url: string,
  async: boolean = false,
  ref: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = async;

    if (ref.current) {
      ref.current.append(script);
    }

    return () => {
      if (ref.current) {
        ref.current.removeChild(script);
      }
    };
  }, [url]);
};

export default useScript;
