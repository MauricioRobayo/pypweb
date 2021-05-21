import React, { useEffect } from "react";

const useScript = ({
  ref,
  url,
  async = false,
  prepend = false,
}: {
  ref: React.RefObject<HTMLDivElement>;
  url: string;
  async?: boolean;
  prepend?: boolean;
}) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = async;

    if (ref.current) {
      if (prepend) {
        ref.current.prepend(script);
      } else {
        ref.current.append(script);
      }
    }

    return () => {
      if (ref.current) {
        ref.current.removeChild(script);
      }
    };
  }, [url]);
};

export default useScript;
