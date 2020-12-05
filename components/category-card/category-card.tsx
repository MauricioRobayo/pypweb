import Link from 'next/link';
import { IHourData } from '@mauriciorobayo/pyptron';
import cn from 'classnames';

import { Scheme } from '../../types';
import Hours from '../hours/hours';
import LicensePlate from '../license-plate/license-plate';
import styles from './category-card.module.scss';
import { pypNumbersToString, ALL_DIGITS, NA } from '../../utils/utils';

type CategoryCardProps = {
  path: string;
  numbers: number[];
  hours: IHourData[];
  categoryName: string;
  scheme: Scheme;
};

function isPublicLicense(categoryName: string) {
  const lowerCaseName = categoryName.toLowerCase();
  return lowerCaseName === 'taxis' || lowerCaseName.includes('público');
}

export default function CategoryCard({
  numbers,
  path,
  categoryName,
  hours,
  scheme,
}: CategoryCardProps) {
  const numbersString = pypNumbersToString(numbers);
  const isAllDigits = numbersString === ALL_DIGITS;
  const hasRestriction = numbersString !== NA;
  const schemeString =
    scheme === Scheme.FirstNumber ? 'terminadas' : 'iniciadas';
  return (
    <article key={categoryName}>
      <Link href={path}>
        <a>
          <div
            className={cn(styles.card, {
              [styles.na]: !hasRestriction,
            })}
          >
            <h4 className={styles.title}>{categoryName}</h4>
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
              publicLicense={isPublicLicense(categoryName)}
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
