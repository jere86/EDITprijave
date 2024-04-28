import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { Lecturer, useAppContext } from "../../context/appContext";

import styles from "./LecturerCard.module.scss";

interface LecturerCardProps {
  data: Lecturer;
}

const LecturerCard: React.FC<LecturerCardProps> = ({ data }) => {
  const { showAdmin } = useAppContext();

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={data.imageURL} alt="Digital Dalmacija" />
      </div>
      <div className={styles.data}>
        <h1>{data.name}</h1>
        <p>
          <i>bio:</i> {data.bio}
        </p>
        <p>
          <i>organizacija:</i> {data.organization}
        </p>
        <p>
          <i>teme:</i>{" "}
          {data.topics.map((topic) => (
            <span>{topic} </span>
          ))}
        </p>
        {showAdmin && (
          <button className={styles.edit}>
            <FiEdit3 />
          </button>
        )}
        <button>Pregledaj radionice</button>
      </div>
    </div>
  );
};

export default LecturerCard;
