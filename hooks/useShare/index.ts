import { useEffect, useState } from "react";

export default function useShare() {
  const [hasShare, setHasShare] = useState(false);

  useEffect(() => {
    if ("share" in navigator) {
      setHasShare(true);
    }
  }, []);

  return hasShare;
}
