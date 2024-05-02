import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { Lecturer, useAppContext } from "../../context/appContext";
import styles from "./LecturerCard.module.scss";
import { Link } from "react-router-dom";
import AddEditForm from "../AddEditForm/AddEditForm";
import { ThreeDots } from "react-loader-spinner";

interface LecturerCardProps {
  data: Lecturer;
}

const LecturerCard: React.FC<LecturerCardProps> = ({ data }) => {
  const { showAdmin } = useAppContext();
  const [showAddEditForm, setShowAddEditForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleWorkshopAddForm = () => {
    setShowAddEditForm((prevShowAddEditForm) => !prevShowAddEditForm);
  };

  return (
    <>
      {!loading ? (
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
              <button className={styles.edit} onClick={toggleWorkshopAddForm}>
                <FiEdit3 />
              </button>
            )}
            <Link to={`/predavaci/${data.id}`} className={styles.view}>
              Pregledaj radionice
            </Link>
          </div>
        </div>
      ) : (
        <ThreeDots
          wrapperClass={styles.loading}
          color="#0087ad"
          height={150}
          width={150}
        />
      )}
      {showAddEditForm && (
        <AddEditForm
          onClose={() => setShowAddEditForm(false)}
          item={data}
          mode="edit"
          itemType="predavaci"
        />
      )}
    </>
  );
};

export default LecturerCard;
