import React, { useState, useEffect } from "react";
import { useAppContext, Workshop } from "../../context/appContext";
import Filters from "../../components/Filter/Filter";
import AddEditForm from "../../components/AddEditForm/AddEditForm";
import WorkshopCard from "../../components/WorkshopCard/WorkshopCard";
import styles from "./WorkshopsPage.module.scss";
import { GrWorkshop } from "react-icons/gr";

interface Filters {
  [key: string]: boolean;
}

const WorkshopPage: React.FC = () => {
  const { workshops, showAdmin, topicsData, difficultysData } = useAppContext();
  const [showAddEditForm, setShowAddEditForm] = useState(false);
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
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);

  useEffect(() => {
    const filtered = workshops?.filter((workshop) => {
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
    });
    setFilteredWorkshops(filtered || []);
  }, [workshops, topicFilters, difficultyFilters]);

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
    setFilteredWorkshops([]);
  };

  const toggleAddEditForm = () => {
    setShowAddEditForm((prevShowAddEditForm) => !prevShowAddEditForm);
  };

  return (
    <div className={styles.workshops}>
      {showAdmin && (
        <div className={styles.add}>
          <button className={styles.admin_btn} onClick={toggleAddEditForm}>
            +
            <GrWorkshop />
          </button>
        </div>
      )}
      <div className={styles.view}>
        <div className={styles.filters}>
          {topicsData && (
            <Filters
              categories={topicsData}
              filterType="tema"
              filters={topicFilters}
              onFilterChange={handleFilterChange}
            />
          )}
          {difficultysData && (
            <Filters
              categories={difficultysData}
              filterType="težina"
              filters={difficultyFilters}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>
        <div className={styles.list}>
          {filteredWorkshops.map((workshop) => (
            <WorkshopCard data={workshop} key={workshop.id} />
          ))}
        </div>
      </div>
      {showAddEditForm && (
        <AddEditForm
          onClose={() => setShowAddEditForm(false)}
          itemType="radionice"
          mode="add"
        />
      )}
    </div>
  );
};

export default WorkshopPage;
