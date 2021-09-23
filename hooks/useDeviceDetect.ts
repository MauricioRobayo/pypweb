import { useEffect, useState } from "react";

const userAgent = window.navigator?.userAgent || "";
const mobileRegExp = new RegExp(
  "Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop",
  "i"
);

const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(() =>
    window === undefined ? null : mobileRegExp.test(userAgent)
  );

  useEffect(() => {
    setIsMobile(mobileRegExp.test(userAgent));
  }, []);

  return { isMobile };
};

export default useDeviceDetect;
