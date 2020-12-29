import { ICategoryData2 } from '@mauriciorobayo/pyptron';
import {
  isPublicLicense,
  listFormat,
  NA,
  pypNumbersToString,
  Scheme,
} from '../../utils/utils';
import DayCard from '../day-card/day-card';
import NumberLinks from '../number-links/number-links';
import styles from './days-list.module.scss';

type DaysTableProps = {
  cityName: string;
  categoryData: ICategoryData2;
};

export default function DaysList({ cityName, categoryData }: DaysTableProps) {
  const {
    name: categoryName,
    group: categoryGroup,
    path: categoryPath,
    data: [{ vehicleClasses, scheme }],
  } = categoryData;
  const vehicleClassesList = listFormat(vehicleClasses);
  const schemeMessage = scheme === Scheme.FirstNumber ? 'primer' : 'último';
  return (
    <article className={styles.list}>
      <h3 className={styles.title}>
        Se restringe la circulación de <strong>{vehicleClassesList}</strong>{' '}
        según el <strong>{schemeMessage} dígito del número de la placa</strong>
      </h3>
      <div>
        {categoryData.data.map(({ date, numbers, hours }) => {
          const numbersString = pypNumbersToString(numbers);
          return (
            <DayCard
              key={date}
              date={date}
              group={categoryGroup}
              hasRestriction={numbersString !== NA}
              hours={hours}
              isPublicLicense={isPublicLicense(categoryName)}
              numbersString={numbersString}
              path={categoryPath}
              scheme={scheme}
            />
          );
        })}
      </div>
      <footer>
        <NumberLinks
          categoryName={categoryName}
          cityName={cityName}
          path={categoryPath}
        />
      </footer>
    </article>
  );
}
