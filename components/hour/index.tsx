import { IHourData } from "@mauriciorobayo/pyptron";
import { ALL_DAY, isEmptyArray } from "lib/utils";
import styled from "styled-components";
import { convert24toAMPM } from "./utils";

type HourProps = {
  hourData: IHourData;
  date: Date;
};

const Comment = styled.div`
  font-weight: bold;
  margin: 1rem 0 0;
`;

const StyledHour = styled.div`
  margin-top: 0.25rem;
`;

export default function Hour({
  date,
  hourData: { hours, comment, days },
}: HourProps) {
  const hasComment = comment !== "";
  const isAllDay = comment === ALL_DAY;

  return (
    <div>
      {hasComment && !isAllDay ? <Comment>{comment}</Comment> : null}
      <ul>
        {hours.map((hour, index) => {
          /* eslint-disable react/no-array-index-key */
          if (isAllDay) {
            return (
              <li key={index}>
                <StyledHour>{ALL_DAY}</StyledHour>
              </li>
            );
          }

          if (isEmptyArray(hour)) {
            return null;
          }

          if (days.length > 0 && !days.includes(date.getDay())) {
            return null;
          }

          return (
            <li key={index}>
              <StyledHour>
                {hour.map((hour24) => convert24toAMPM(hour24)).join(" a ")}
              </StyledHour>
            </li>
          );
          /* eslint-enable */
        })}
      </ul>
    </div>
  );
}