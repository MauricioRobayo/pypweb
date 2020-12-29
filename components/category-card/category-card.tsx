import { IHourData } from '@mauriciorobayo/pyptron';
import cn from 'classnames';
import Link from 'next/link';
import utilStyles from '../../styles/utils.module.scss';
import vehicleStyles from '../../styles/vehicles.module.scss';
import { Scheme } from '../../types';
import { ALL_DIGITS, NA, pypNumbersToString } from '../../utils/utils';
import Hours from '../hours/hours';
import LicensePlate from '../license-plate/license-plate';
import styles from './category-card.module.scss';

type CategoryCardProps = {
  path: string;
  numbers: number[];
  hours: IHourData[];
  name: string;
  group: string;
  scheme: Scheme;
};

const isPublicLicense = (group: string) => ['taxis', 'tpc'].includes(group);

export default function CategoryCard({
  numbers,
  path,
  name,
  group,
  hours,
  scheme,
}: CategoryCardProps) {
  const numbersString = pypNumbersToString(numbers);
  const isAllDigits = numbersString === ALL_DIGITS;
  const hasRestriction = numbersString !== NA;
  const schemeString =
    scheme === Scheme.FirstNumber ? 'iniciadas' : 'terminadas';

  return (
    <article key={name}>
      <div
        className={cn(styles.card, {
          [styles.na]: !hasRestriction,
        })}
      >
        <h4 className={cn(styles.title, vehicleStyles[`vehicle-${group}`])}>
          <Link href={path}>
            <a>{name}</a>
          </Link>
        </h4>
        {hasRestriction ? (
          <div>
            <div>No circulan en el siguiente horario</div>
            <Hours hours={hours} interactive />
          </div>
        ) : null}

        {isAllDigits || !hasRestriction ? null : (
          <div>Placas {schemeString} en</div>
        )}
        <div className={styles.licenseNumbers}>
          <LicensePlate
            publicLicense={isPublicLicense(group)}
            size={hasRestriction ? 'large' : 'medium'}
          >
            {numbersString}
          </LicensePlate>
        </div>
        <footer className={styles.footer}>
          <Link href={path}>
            <a className={utilStyles.button}>Ver próximos 7 días →</a>
          </Link>
        </footer>
      </div>
    </article>
  );
}
