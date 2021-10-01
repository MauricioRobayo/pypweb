import { cotFormatTime } from "lib/dateUtils";
import { useEffect, useState } from "react";

type ClockProps = {
  className?: string;
};
export function Clock({ className = "" }: ClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className={className}>{cotFormatTime(time)}</div>;
}
