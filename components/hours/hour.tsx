import { IHourData } from "@mauriciorobayo/pyptron";
import Countdown from "components/countdown";
import { ALL_DAY } from "lib/utils";
import styled from "styled-components";
import { flexCenter } from "styles/mixins";
import { calculateHoursWithEndTime, NextType } from "./utils";

type StyledCountdownProps = {
  type: NextType;
};
const StyledCountdown = styled(Countdown)<StyledCountdownProps>`
  background-color: ${({ type }) =>
    type === NextType.START ? "limegreen" : "red"};
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  margin-left: 0.5rem;
  padding: 0 0.25rem;
`;
const Comment = styled.div`
  font-weight: bold;
  margin: 1rem 0 0;
`;
const StyledHour = styled.div`
  ${flexCenter}

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
  interactive?: boolean;
};
export default function Hour({
  date,
  hourData: { hours, comment, days },
  interactive = false,
}: HourProps) {
  const hasComment = Boolean(comment);
  const calculatedHoursWithEndTime = calculateHoursWithEndTime(hours);

  return (
    <>
      {hasComment ? <Comment>{comment}</Comment> : null}
      <HourList>
        {calculatedHoursWithEndTime.map((hour) => {
          const key = JSON.stringify({ comment, days, hour });

          if (hour.length === 0) {
            return null;
          }

          if (days && !days.includes(date.getDay())) {
            return null;
          }

          const [formattedHour, endTime, endType] = hour;

          return (
            <HourItem key={key}>
              <StyledHour>
                {formattedHour === ALL_DAY ? (
                  <span>{ALL_DAY}</span>
                ) : (
                  <>
                    {formattedHour}
                    {interactive &&
                    endTime !== undefined &&
                    endType !== undefined ? (
                      <StyledCountdown endTime={endTime} type={endType} />
                    ) : null}
                  </>
                )}
              </StyledHour>
            </HourItem>
          );
        })}
      </HourList>
    </>
  );
}
