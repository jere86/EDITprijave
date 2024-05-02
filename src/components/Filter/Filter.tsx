import React from "react";
import styles from "./Filter.module.scss";

interface Options {
  id: string;
  name: string;
}

interface FilterProps {
  categories: Options[];
  filterType: string;
  filters: { [key: string]: boolean };
  onFilterChange: (filterType: string, filterName: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  categories,
  filterType,
  filters,
  onFilterChange,
}) => {
  return (
    <div className={styles.filter}>
      <p className={styles.title}>{filterType.toUpperCase()}:</p>
      <div className={styles.options}>
        {categories.map((filter) => (
          <label key={filter.id}>
            <input
              type="checkbox"
              checked={filters[filter.name]}
              onChange={() => onFilterChange(filterType, filter.name)}
            />
            {filter.name.toUpperCase()}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
