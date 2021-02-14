import { IHourData } from "@mauriciorobayo/pyptron";
import cn from "classnames";
import Link from "next/link";
import vehicleStyles from "../../styles/vehicles.module.scss";
import { ALL_DIGITS, Scheme } from "../../utils/utils";
import Date from "../date/date";
import { isSameDate } from "../date/utils";
import Hours from "../hours/hours";
import LicensePlate from "../license-plate/license-plate";
import styles from "./day-card.module.scss";

type DayCardProps = {
  scheme: Scheme;
  group: string;
  date: string;
  currentDate: Date;
  numbersString: string;
  hours: IHourData[];
  path: string;
  isPublicLicense?: boolean;
  hasRestriction?: boolean;
};

export default function DayCard({
  scheme,
  group,
  currentDate,
  date,
  numbersString,
  hours,
  path,
  isPublicLicense,
  hasRestriction,
}: DayCardProps) {
  const schemeString = scheme === Scheme.FirstNumber ? "Primer" : "Último";
  const isCurrentDate = isSameDate(date, currentDate);
  const isAllDigits = numbersString === ALL_DIGITS;

  return (
    <div
      key={date}
      className={cn(styles.card, {
        [styles.current]: isCurrentDate,
        [styles.na]: !hasRestriction,
      })}
    >
      <div>
        <div
          className={cn(styles.title, {
            [vehicleStyles[`vehicle-${group}`]]: isCurrentDate,
            [styles.current]: isCurrentDate,
          })}
        >
          <Link href={`/${path}?d=${date.substr(0, 10)}`}>
            <a>
              <Date date={date} type="short" />
            </a>
          </Link>
        </div>
        {hasRestriction && isCurrentDate ? (
          <div>
            <Hours date={currentDate} hours={hours} interactive />
          </div>
        ) : null}
      </div>
      <div className={styles.license}>
        {hasRestriction && isCurrentDate ? <div>No circulan</div> : null}
        <LicensePlate
          publicLicense={isPublicLicense}
          size={isCurrentDate ? "large" : "medium"}
        >
          {numbersString}
        </LicensePlate>
        {hasRestriction && !isAllDigits && isCurrentDate ? (
          <div>{schemeString} dígito de la placa</div>
        ) : null}
      </div>
    </div>
  );
}

DayCard.defaultProps = {
  hasRestriction: true,
  isPublicLicense: false,
};
