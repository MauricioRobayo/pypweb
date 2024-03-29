import type { IHourData } from "@mauriciorobayo/pyptron";
import { IconLeft } from "components/Icon";
import styled from "styled-components";
import { flexCenter } from "styles/mixins";
import Hour from "./Hour";

const HoursTitle = styled.div`
  ${flexCenter}

  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: bold;
  margin: 0;
`;

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
    <>
      {showTitle ? (
        <HoursTitle>
          <IconLeft name="⏰" />
          Horario
        </HoursTitle>
      ) : null}
      <div className={className}>
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
  );
}
