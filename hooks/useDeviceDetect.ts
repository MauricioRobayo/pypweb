import { useEffect, useState } from "react";

const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  const mobileRegExp = new RegExp(
    "Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop",
    "i"
  );

  useEffect(() => {
    const userAgent = window.navigator?.userAgent || "";
    setIsMobile(mobileRegExp.test(userAgent));
  }, []);

  return { isMobile };
};

export default useDeviceDetect;
