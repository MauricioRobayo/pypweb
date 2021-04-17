import { useEffect, useState } from "react";
import { formatDistance } from "./utils";

type CountDownProps = {
  endTime: Date;
  className?: string;
};

const Countdown = ({ className = "", endTime }: CountDownProps) => {
  const [countdown, setCountdown] = useState(formatDistance(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(formatDistance(endTime));
    }, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className={className}>{countdown}</div>;
};

export default Countdown;
