import React, { useEffect, useState } from "react";
import { GrWorkshop } from "react-icons/gr";

import { useAppContext } from "../../context/appContext";
import styles from "./WorkshopsPage.module.scss";
import WorkshopCard from "../../components/WorkshopCard/WorkshopCard";
import Filters from "../../components/Filter/Filter";

interface FilterOption {
  id: string;
  name: string;
}

interface Filters {
  [key: string]: boolean;
}

const WorkshopPage: React.FC = () => {
  const { workshops, showAdmin } = useAppContext();
  const [topicFiltersData, setTopicFiltersData] = useState<FilterOption[]>([]);
  const [difficultyFiltersData, setDifficultyFiltersData] = useState<
    FilterOption[]
  >([]);

  useEffect(() => {
    const fetchTopicFiltersData = async () => {
      try {
        const response = await fetch("http://localhost:3001/teme");
        const data = await response.json();
        setTopicFiltersData(data);
      } catch (error) {
        console.error("Error fetching topic filters: ", error);
      }
    };

    const fetchDifficultyFiltersData = async () => {
      try {
        const response = await fetch("http://localhost:3001/tezine");
        const data = await response.json();
        setDifficultyFiltersData(data);
      } catch (error) {
        console.error("Error fetching difficulty filters: ", error);
      }
    };

    fetchTopicFiltersData();
    fetchDifficultyFiltersData();
  }, []);

  const [topicFilters, setTopicFilters] = useState<Filters>({
    React: false,
    Express: false,
    NextJS: false,
    PHP: false,
    WordPress: false,
  });

  const [difficultyFilters, setDifficultyFilters] = useState<Filters>({
    Junior: false,
    Mid: false,
    Senior: false,
  });

  const filteredWorkshops = workshops
    ? workshops.filter((workshop) => {
        const topicFiltersSelected = Object.keys(topicFilters).filter(
          (topic) => topicFilters[topic]
        );
        const topicMatch =
          topicFiltersSelected.length === 0 ||
          topicFiltersSelected.some((topic) => workshop.topic.includes(topic));

        const difficultyFiltersSelected = Object.keys(difficultyFilters).filter(
          (difficulty) => difficultyFilters[difficulty]
        );
        const difficultyMatch =
          difficultyFiltersSelected.length === 0 ||
          difficultyFiltersSelected.includes(workshop.difficulty);

        return topicMatch && difficultyMatch;
      })
    : [];

  const handleFilterChange = (
    filterType: keyof Filters,
    filterName: string
  ) => {
    if (filterType === "tema") {
      setTopicFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: !prevFilters[filterName],
      }));
    } else if (filterType === "težina") {
      setDifficultyFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: !prevFilters[filterName],
      }));
    }
  };

  return (
    <div className={styles.workshop}>
      {showAdmin && (
        <div className={styles.add}>
          <button className={styles.admin_btn}>
            +
            <GrWorkshop />
          </button>
        </div>
      )}
      <div className={styles.view}>
        <div className={styles.filters}>
          <Filters
            categories={topicFiltersData}
            filterType="tema"
            filters={topicFilters}
            onFilterChange={handleFilterChange}
          />
          <Filters
            categories={difficultyFiltersData}
            filterType="težina"
            filters={difficultyFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
        {workshops === undefined ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.list}>
            {filteredWorkshops.map((workshop) => (
              <WorkshopCard data={workshop} key={workshop.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopPage;
