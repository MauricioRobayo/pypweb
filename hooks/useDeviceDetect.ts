import { useEffect, useState } from "react";

const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mobileRegExp = new RegExp(
      "Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop",
      "i"
    );
    const userAgent = window.navigator?.userAgent || "";
    setIsMobile(mobileRegExp.test(userAgent));
  }, []);

  return { isMobile };
};

export default useDeviceDetect;
