import { IHourData } from "@mauriciorobayo/pyptron";
import Countdown from "components/countdown";
import { ALL_DAY } from "lib/utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { flexCenter } from "styles/mixins";
import { CalculatedHours, calculateHoursWithEndTime, NextType } from "./utils";

type StyledCountdownProps = {
  type: NextType;
};
const StyledCountdown = styled(Countdown)<StyledCountdownProps>`
  display: flex;
  font-size: 0.75rem;
  line-height: 1.5;
  margin-top: 0.25rem;
  .countdown {
    background-color: ${({ type, theme }) =>
      type === NextType.START ? theme.colors.success : theme.colors.danger};
    border-radius: 4px;
    color: white;
    margin-left: 0.25rem;
    padding: 0 0.5rem;
  }
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
const HourWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
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
  const [
    calculatedHoursWithEndTime,
    setCalculatedHoursWithEndTime,
  ] = useState<CalculatedHours>([]);

  const hasComment = Boolean(comment);

  useEffect(() => {
    const interval = setInterval(() => {
      setCalculatedHoursWithEndTime(calculateHoursWithEndTime(hours));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
                  <HourWrapper>
                    {formattedHour}
                    {interactive &&
                    endTime !== undefined &&
                    endType !== undefined ? (
                      <StyledCountdown
                        endTime={endTime}
                        message={
                          endType === NextType.START
                            ? "inicia en"
                            : "termina en"
                        }
                        type={endType}
                      />
                    ) : null}
                  </HourWrapper>
                )}
              </StyledHour>
            </HourItem>
          );
        })}
      </HourList>
    </>
  );
}
