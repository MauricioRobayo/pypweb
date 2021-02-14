import { ICategoryData2 } from "@mauriciorobayo/pyptron";
import CategoryCard from "../category-card/category-card";
import styles from "./categories-list.module.scss";

type CategoryListProps = {
  categories: ICategoryData2[];
  date: Date;
};

export default function CategoriesList({
  categories,
  date,
}: CategoryListProps) {
  return (
    <div className={styles.list}>
      {categories.map(
        ({ path, group, name, data: [{ numbers, scheme, hours }] }) => (
          <CategoryCard
            key={path}
            date={date}
            group={group}
            hours={hours}
            name={name}
            numbers={numbers}
            path={path}
            scheme={scheme}
          />
        )
      )}
    </div>
  );
}
