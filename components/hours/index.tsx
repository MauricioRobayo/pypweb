import { IHourData } from "@mauriciorobayo/pyptron";
import Hour from "../hour";

type HoursProps = {
  date: Date;
  hours: IHourData[];
  interactive?: boolean;
};

export default function Hours({ date, hours, interactive }: HoursProps) {
  return (
    /* eslint-disable react/no-array-index-key */
    <div className={`${interactive ? "interactive" : ""}`}>
      {hours.map((hourData, index) => (
        <Hour key={index} date={date} hourData={hourData} />
      ))}
    </div>
    /* eslint-enable */
  );
}

Hours.defaultProps = {
  interactive: false,
};
