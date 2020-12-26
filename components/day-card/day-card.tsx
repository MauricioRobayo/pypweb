import { IHourData } from '@mauriciorobayo/pyptron';
import cn from 'classnames';
import Link from 'next/link';
import { useContext } from 'react';
import DateContext from '../../contexts/date-context';
import vehicleStyles from '../../styles/vehicles.module.scss';
import { Scheme } from '../../utils/utils';
import Date from '../date/date';
import { areSameDate } from '../date/utils';
import Hours from '../hours/hours';
import LicensePlate from '../license-plate/license-plate';
import styles from './day-card.module.scss';

type DayCardProps = {
  scheme: Scheme;
  group: string;
  date: string;
  numbersString: string;
  hours: IHourData[];
  path: string;
  isPublicLicense?: boolean;
  hasRestriction?: boolean;
};

export default function DayCard({
  scheme,
  group,
  date,
  numbersString,
  hours,
  path,
  isPublicLicense,
  hasRestriction,
}: DayCardProps) {
  const currentDate = useContext(DateContext);
  const schemeString = scheme === Scheme.FirstNumber ? 'último' : 'primer';
  const isCurrentDate = areSameDate(date, currentDate);

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
          <>
            <h6>
              No circulan según el {schemeString} dígito de la placa en el
              siguiente horario:
            </h6>
            <div>
              <Hours hours={hours} interactive />
            </div>
          </>
        ) : null}
      </div>
      <div className={styles.license}>
        {hasRestriction && isCurrentDate ? (
          <span
            aria-label="No circulan"
            title="No circulan"
            className={styles.scheme}
          >
            🛑
          </span>
        ) : null}
        <LicensePlate
          publicLicense={isPublicLicense}
          size={isCurrentDate ? 'large' : 'medium'}
        >
          {numbersString}
        </LicensePlate>
      </div>
    </div>
  );
}

DayCard.defaultProps = {
  isPublicLicense: false,
  hasRestriction: true,
};
