import { ICategoryData2 } from '@mauriciorobayo/pyptron';
import CategoryCard from '../category-card/category-card';
import styles from './categories-list.module.scss';

type CategoryListProps = {
  categories: ICategoryData2[];
};

export default function CategoriesList({ categories }: CategoryListProps) {
  return (
    <div className={styles.list}>
      {categories.map(
        ({ path, group, name, data: [{ numbers, scheme, hours }] }) => {
          return (
            <CategoryCard
              key={path}
              path={path}
              name={name}
              group={group}
              hours={hours}
              numbers={numbers}
              scheme={scheme}
            />
          );
        }
      )}
    </div>
  );
}
