import React, { useEffect, useState } from "react";
import { GrWorkshop } from "react-icons/gr";

import { useAppContext } from "../../context/appContext";
import LecturerCard from "../../components/LecturerCard/LecturerCard";
import Filters from "../../components/Filter/Filter";
import styles from "../Workshops/Workshops.module.scss";

interface FilterOption {
  id: string;
  name: string;
}

interface Filters {
  [key: string]: boolean;
}

const Lecturers: React.FC = () => {
  const { lecturers, showAdmin } = useAppContext();
  const [topicFiltersData, setTopicFiltersData] = useState<FilterOption[]>([]);
  const [organizationFiltersData, setOrganizationFiltersData] = useState<
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

    const fetchOrganizationFiltersData = async () => {
      try {
        const response = await fetch("http://localhost:3001/organizacije");
        const data = await response.json();
        setOrganizationFiltersData(data);
      } catch (error) {
        console.error("Error fetching difficulty filters: ", error);
      }
    };

    fetchTopicFiltersData();
    fetchOrganizationFiltersData();
  }, []);

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

  const filteredLecturers = lecturers
    ? lecturers.filter((lecturer) => {
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
    } else if (filterType === "organizacija") {
      setOrganizationFilters((prevFilters) => ({
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
            categories={organizationFiltersData}
            filterType="organizacija"
            filters={organizationFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
        {lecturers === undefined ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.list}>
            {filteredLecturers.map((lecture) => (
              <LecturerCard data={lecture} key={lecture.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lecturers;
