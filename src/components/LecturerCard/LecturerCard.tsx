import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { Lecturer, useAppContext } from "../../context/appContext";

import styles from "./LecturerCard.module.scss";
import { Link } from "react-router-dom";

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
          <b>
            <i>bio: </i>
          </b>
          {data.bio}
        </p>
        <p>
          <b>
            <i>organizacija: </i>
          </b>
          {data.organization}
        </p>
        <p>
          <b>
            <i>teme: </i>
          </b>
          {data.topics.map((topic, id) => (
            <span key={id}>{topic} </span>
          ))}
        </p>
        {showAdmin && (
          <button className={styles.edit}>
            <FiEdit3 />
          </button>
        )}
        <Link to={`/predavaci/${data.id}`} className={styles.view}>
          Pregledaj radionice
        </Link>
      </div>
    </div>
  );
};

export default LecturerCard;
