import { useEffect, useState } from "react";
import { formatDistance } from "./utils";

type CountDownProps = {
  endTime: Date;
  className?: string;
};

const Countdown = ({ className = "", endTime }: CountDownProps) => {
  const [countdown, setCountdown] = useState(formatDistance(endTime));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCountdown(formatDistance(endTime));
    }, 1000);

    return () => clearInterval(timeout);
  }, [countdown]);

  if (countdown === "") {
    return null;
  }

  return <div className={className}>{countdown}</div>;
};

export default Countdown;
