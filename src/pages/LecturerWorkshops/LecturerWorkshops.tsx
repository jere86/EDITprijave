import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Lecturer, useAppContext } from "../../context/appContext";
import WorkshopCard from "../../components/WorkshopCard/WorkshopCard";
import styles from "./LecturerWorkshops.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";

const LecturerWorkshops: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { workshops } = useAppContext();
  const [lecturerData, setLecturerData] = useState<Lecturer>();
  const [filteredWorkshops, setFilteredWorkshops] = useState(workshops);

  useEffect(() => {
    const fetchLecturerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/predavaci/${id}`
        );
        setLecturerData(response.data);
      } catch (error) {
        console.error("Error fetching lecturer data: ", error);
      }
    };

    fetchLecturerData();
  }, [id]);

  useEffect(() => {
    if (lecturerData && workshops) {
      const filtered = workshops.filter(
        (workshop) => workshop.lecturer === lecturerData.name
      );
      setFilteredWorkshops(filtered);
    }
  }, [lecturerData, workshops]);

  return (
    <div className={styles.lecturerWorkshops}>
      <Link to={`/predavaci`} className={styles.return_btn}>
        <IoMdArrowRoundBack />
      </Link>
      <p className={styles.subtitle}>radionice predavača </p>
      <p className={styles.title}>{lecturerData?.name}</p>
      <div className={styles.list}>
        {filteredWorkshops?.map((workshop) => (
          <WorkshopCard data={workshop} key={workshop.id} />
        ))}
      </div>
    </div>
  );
};

export default LecturerWorkshops;
