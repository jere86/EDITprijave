import React, { useEffect, useState } from "react";
import { GrWorkshop } from "react-icons/gr";
import { Lecturer, useAppContext } from "../../context/appContext";
import LecturerCard from "../../components/LecturerCard/LecturerCard";
import Filters from "../../components/Filter/Filter";
import styles from "../WorkshopsPage/WorkshopsPage.module.scss";
import AddEditForm from "../../components/AddEditForm/AddEditForm";

interface Filters {
  [key: string]: boolean;
}

const LecturersPage: React.FC = () => {
  const { lecturers, organizations, showAdmin, topicsData } = useAppContext();
  const [showAddEditForm, setShowAddEditForm] = useState(false);
  const [topicFilters, setTopicFilters] = useState<Filters>({
    React: false,
    Express: false,
    NextJS: false,
    PHP: false,
    WordPress: false,
  });
  const [organizationFilters, setOrganizationFilters] = useState<Filters>({
    "WebSolutions Inc.": false,
    WebInnovators: false,
    TechGenius: false,
    "WP Experts": false,
    "CodeCrafters Ltd.": false,
  });
  const [filteredLecturers, setFilteredLecturers] = useState<Lecturer[]>([]);

  useEffect(() => {
    const filtered = lecturers?.filter((lecturer) => {
      const topicFiltersSelected = Object.keys(topicFilters).filter(
        (topic) => topicFilters[topic]
      );
      const topicMatch =
        topicFiltersSelected.length === 0 ||
        topicFiltersSelected.some((topic) => lecturer.topics.includes(topic));

      const organizationFiltersSelected = Object.keys(
        organizationFilters
      ).filter((organization) => organizationFilters[organization]);
      const organizationMatch =
        organizationFiltersSelected.length === 0 ||
        organizationFiltersSelected.includes(lecturer.organization);

      return topicMatch && organizationMatch;
    });
    setFilteredLecturers(filtered || []);
  }, [lecturers, topicFilters, organizationFilters]);

  const handleFilterChange = (
    filterType: keyof Filters,
    filterName: string
  ) => {
    if (filterType === "tema") {
      setTopicFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: !prevFilters[filterName],
      }));
    } else if (filterType === "organizacija") {
      setOrganizationFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: !prevFilters[filterName],
      }));
    }
    setFilteredLecturers([]);
  };

  const toggleAddEditForm = () => {
    setShowAddEditForm((prevShowAddEditForm) => !prevShowAddEditForm);
  };

  return (
    <div className={styles.workshop}>
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
          {organizations && (
            <Filters
              categories={organizations}
              filterType="organizacija"
              filters={organizationFilters}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>
        <div className={styles.list}>
          {filteredLecturers.map((lecture) => (
            <LecturerCard data={lecture} key={lecture.id} />
          ))}
        </div>
      </div>
      {showAddEditForm && (
        <AddEditForm
          onClose={() => setShowAddEditForm(false)}
          itemType="predavaci"
          mode="add"
        />
      )}
    </div>
  );
};

export default LecturersPage;
