import type { IHourData } from "@mauriciorobayo/pyptron";
import { Emoji } from "components/Emoji";
import styled from "styled-components";
import { flexCenter, inlineIconLeft } from "styles/mixins";
import Hour from "./Hour";

const HoursTitle = styled.h4`
  ${flexCenter}

  font-size: 1.25rem;
  margin: 0;
`;

const EmojiLeft = inlineIconLeft(Emoji);

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
          <EmojiLeft emoji="⏰" />
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
    /* eslint-enable */
  );
}
