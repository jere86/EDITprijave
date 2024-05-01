import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { Workshop, useAppContext } from "../../context/appContext";
import SignupModal from "../SignupModal/SignupModal";

import styles from "./WorkshopCard.module.scss";
import axios from "axios";

interface WorkshopCardProps {
  data: Workshop;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ data }) => {
  const { showAdmin } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const handleSignup = async (formData: {
    fullName: string;
    email: string;
    reason: string;
  }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/radionice/${data.id}`,
        {
          applicants: [...data.applicants, formData],
        }
      );

      if (!response.status) {
        throw new Error("Neuspješno ažuriranje podataka na serveru.");
      }
    } catch (error) {
      console.error("Greška prilikom slanja podataka na server:", error);
    }
    console.log("Form data:", formData);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.image}>
          <img src={data.imageURL} alt="Digital Dalmacija" />
        </div>
        <div className={styles.data}>
          <h1>{data.title}</h1>
          <p>
            <b>
              <i>datum: </i>
            </b>
            {data.date}
          </p>
          <p>
            <b>
              <i>opis: </i>
            </b>
            {data.description}
          </p>
          <p>
            <b>
              <i>predavač: </i>
            </b>
            {data.lecturer}
          </p>
          <p>
            <b>
              <i>tema: </i>
            </b>
            {data.topic}
          </p>
          <p>
            <b>
              <i>težina: </i>
            </b>
            {data.difficulty}
          </p>
          <p>
            <b>
              <i>br. prijava: </i>
            </b>
            {data.applicants.length}
          </p>
          {showAdmin && (
            <button className={styles.edit}>
              <FiEdit3 />
            </button>
          )}
          <button className={styles.submit} onClick={() => setShowModal(true)}>
            PRIJAVI SE
          </button>
        </div>
      </div>
      {showModal && (
        <SignupModal
          onClose={() => {
            setShowModal(false);
          }}
          onSignup={handleSignup}
          data={data}
        />
      )}
    </>
  );
};

export default WorkshopCard;
