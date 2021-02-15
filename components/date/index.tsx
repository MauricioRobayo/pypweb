import styled from "styled-components";
import {
  dateIsToday,
  getLocalLongDateString,
  getLocalShortDateString,
  getWeekdayName,
} from "./utils";

type DateProps = {
  date: Date | string;
  type?: "long" | "short";
};

const Small = styled.span`
  color: #b5b5b5;
  font-size: 0.85rem;
  text-transform: uppercase;
`;

export default function PypDate({ date: d, type = "long" }: DateProps) {
  const date = typeof d === "string" ? new Date(d) : d;

  const isToday = dateIsToday(date);

  if (type === "long") {
    const localLongDateString = getLocalLongDateString(date);
    return (
      <time dateTime={date.toISOString()}>
        {isToday ? `Hoy ${localLongDateString}` : localLongDateString}
      </time>
    );
  }

  const localShortDateString = getLocalShortDateString(date);
  const weekdayName = getWeekdayName(date);
  return (
    <time dateTime={date.toISOString()}>
      <span>{isToday ? `Hoy ${weekdayName}` : weekdayName}</span>{" "}
      <Small>{localShortDateString}</Small>
    </time>
  );
}

PypDate.defaultProps = {
  type: "long",
};
