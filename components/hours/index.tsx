import { IHourData } from "@mauriciorobayo/pyptron";
import cn from "classnames";
import { FcAlarmClock } from "react-icons/fc";
import styled from "styled-components";
import { flexCenter, inlineIcon } from "styles/mixins";
import Hour from "./hour";

const HoursTitle = styled.h4`
  ${flexCenter}

  font-size: 1.25rem;
  margin: 0;
`;

const StyledAlarmClock = inlineIcon(FcAlarmClock);

type HoursProps = {
  className?: string;
  date: Date;
  hours: IHourData[];
  interactive?: boolean;
  showTitle?: boolean;
};

export default function Hours({
  className = "",
  date,
  hours,
  interactive = false,
  showTitle = true,
}: HoursProps) {
  return (
    /* eslint-disable react/no-array-index-key */
    <>
      {showTitle ? (
        <HoursTitle>
          <StyledAlarmClock />
          Horario
        </HoursTitle>
      ) : null}
      <div className={cn(className, { interactive })}>
        {hours.map((hourData, index) => (
          <Hour
            key={index}
            date={date}
            hourData={hourData}
            interactive={interactive}
          />
        ))}
      </div>
    </>
    /* eslint-enable */
  );
}
