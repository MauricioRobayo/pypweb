import { IHourData } from "@mauriciorobayo/pyptron";
import { ALL_DAY, isEmptyArray } from "lib/utils";
import styled from "styled-components";
import styles from "./hour.module.scss";
import { convert24toAMPM } from "./utils";

type HourProps = {
  hourData: IHourData;
  date: Date;
};

const Comment = styled.div`
  font-weight: bold;
  margin: 1rem 0 0;
`;

const Hours = styled.ul`
  list-style: none;
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
      <Hours>
        {hours.map((hour, index) => {
          /* eslint-disable react/no-array-index-key */
          if (isAllDay) {
            return (
              <li key={index} className={styles.hour}>
                {ALL_DAY}
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
            <li key={index} className={styles.hour}>
              <span>
                {hour.map((hour24) => convert24toAMPM(hour24)).join(" a ")}
              </span>
            </li>
          );
          /* eslint-enable */
        })}
      </Hours>
    </div>
  );
}
