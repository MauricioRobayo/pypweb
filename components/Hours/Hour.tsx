import type { IHourData } from "@mauriciorobayo/pyptron";
import { Countdown } from "components/Countdown";
import { ALL_DAY, AMERICA_BOGOTA } from "lib/utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { flexCenter } from "styles/mixins";
import { calculateHoursWithEndTime, NextType } from "./utils";

type StyledCountdownProps = {
  type: NextType;
};
const StyledCountdown = styled(Countdown)<StyledCountdownProps>`
  align-items: center;
  display: flex;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  .countdown {
    background-color: ${({ type, theme }) =>
      type === NextType.START ? theme.colors.success : theme.colors.danger};
    border-radius: 8px;
    color: white;
    margin-left: 0.25rem;
    padding: 0.1rem 0.5rem;
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
const Hour = ({
  date,
  hourData: { hours, comment, days },
  interactive = false,
}: HourProps) => {
  const [calculatedHoursWithEndTime, setCalculatedHoursWithEndTime] = useState(
    calculateHoursWithEndTime(hours)
  );

  const hasComment = Boolean(comment);

  const isColombiaTimezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone === AMERICA_BOGOTA;

  useEffect(() => {
    const interval = setInterval(() => {
      if (new Date().getSeconds() === 0) {
        setCalculatedHoursWithEndTime(calculateHoursWithEndTime(hours));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hours]);

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
                    isColombiaTimezone &&
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
};

export default Hour;
