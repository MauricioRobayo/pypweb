import { IHourData } from "@mauriciorobayo/pyptron";
import { ALL_DAY, isEmptyArray } from "lib/utils";
import styled from "styled-components";
import { convert24toAMPM } from "./utils";

const Comment = styled.div`
  font-weight: bold;
  margin: 1rem 0 0;
`;
const StyledHour = styled.div`
  margin-top: 0.25rem;
`;
const HourList = styled.ul`
  list-style: none;
  margin: 0.5rem 0 0 0;
  padding: 0;
`;
const HourItem = styled.li``;

type HourProps = {
  hourData: IHourData;
  date: Date;
};
export default function Hour({
  date,
  hourData: { hours, comment, days },
}: HourProps) {
  const hasComment = Boolean(comment);

  return (
    <>
      {hasComment ? <Comment>{comment}</Comment> : null}
      <HourList>
        {hours.map((hour) => {
          const key = JSON.stringify({ comment, days, hour });
          const [start, end] = hour;
          const isAllDay = start === "00:00" && end === "24:00";

          if (isEmptyArray(hour)) {
            return null;
          }

          if (days && !days.includes(date.getDay())) {
            return null;
          }

          if (isAllDay) {
            return (
              <HourItem key={JSON.stringify({ comment, days, hour })}>
                <StyledHour>{ALL_DAY}</StyledHour>
              </HourItem>
            );
          }

          return (
            <HourItem key={key}>
              <StyledHour>
                {hour.map((hour24) => convert24toAMPM(hour24)).join(" a ")}
              </StyledHour>
            </HourItem>
          );
        })}
      </HourList>
    </>
  );
}
