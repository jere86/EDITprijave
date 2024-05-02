import React, { useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import { Workshop, useAppContext } from "../../context/appContext";
import SignupModal from "../SignupModal/SignupModal";

import styles from "./WorkshopCard.module.scss";
import axios from "axios";
import AddEditForm from "../AddEditForm/AddEditForm";
import { ThreeDots } from "react-loader-spinner";

interface WorkshopCardProps {
  data: Workshop;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ data }) => {
  const { showAdmin } = useAppContext();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showAddEditForm, setShowAddEditForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
  };

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
              <button className={styles.edit} onClick={toggleWorkshopAddForm}>
                <FiEdit3 />
              </button>
            )}
            <button
              className={styles.submit}
              onClick={() => setShowSignupModal(true)}
            >
              PRIJAVI SE
            </button>
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
      {showSignupModal && (
        <SignupModal
          onClose={() => {
            setShowSignupModal(false);
          }}
          onSignup={handleSignup}
          data={data}
        />
      )}
      {showAddEditForm && (
        <AddEditForm
          onClose={() => setShowAddEditForm(false)}
          item={data}
          mode="edit"
          itemType="radionice"
        />
      )}
    </>
  );
};

export default WorkshopCard;
