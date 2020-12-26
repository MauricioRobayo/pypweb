import { IHourData } from '@mauriciorobayo/pyptron';
import cn from 'classnames';
import Link from 'next/link';
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
    scheme === Scheme.FirstNumber ? 'terminadas' : 'iniciadas';

  return (
    <article key={name}>
      <Link href={path}>
        <a>
          <div
            className={cn(styles.card, {
              [styles.na]: !hasRestriction,
            })}
          >
            <h4 className={cn(styles.title, vehicleStyles[`vehicle-${group}`])}>
              {name}
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
            <LicensePlate
              publicLicense={isPublicLicense(name)}
              size={hasRestriction ? 'large' : 'medium'}
            >
              {numbersString}
            </LicensePlate>
          </div>
        </a>
      </Link>
    </article>
  );
}
