import { IHourData } from "@mauriciorobayo/pyptron";
import cn from "classnames";
import Hour from "./hour";

type HoursProps = {
  className?: string;
  date: Date;
  hours: IHourData[];
  interactive?: boolean;
};

export default function Hours({
  className = "",
  date,
  hours,
  interactive = false,
}: HoursProps) {
  return (
    /* eslint-disable react/no-array-index-key */
    <div className={cn(className, { interactive })}>
      {hours.map((hourData, index) => (
        <Hour key={index} date={date} hourData={hourData} />
      ))}
    </div>
    /* eslint-enable */
  );
}
