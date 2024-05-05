import React, { useEffect, useState } from "react";
import { Workshop, useAppContext } from "../../context/appContext";
import styles from "./Signup.module.scss";
import { FaTimes } from "react-icons/fa";

interface SignupProps {
  onClose: () => void;
  onSignup: (formData: {
    fullName: string;
    email: string;
    reason: string;
  }) => void;
  data: Workshop;
}

const Signup: React.FC<SignupProps> = ({ onClose, onSignup, data }) => {
  const { fetchWorkshops } = useAppContext();
  const [showThx, setShowThx] = useState(false);
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({
    fullName: "",
    email: "",
    reason: "",
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({
    fullName: "",
    email: "",
    reason: "",
  });
  const errorMessages: { [key: string]: string } = {
    fullName: "*unesite puno ime",
    reason: "*unesite razlog prijave",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formValid = true;
    const newErrors: {
      [key: string]: string;
    } = {
      fullName: "",
      email: "",
      reason: "",
    };

    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = errorMessages[key];
        formValid = false;
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "*unesite valjanu email adresu";
      formValid = false;
    }

    setErrors(newErrors);

    if (!formValid) return;

    try {
      setShowThx(true);
      onSignup({
        fullName: formData.fullName,
        email: formData.email,
        reason: formData.reason,
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, [fetchWorkshops, showThx]);

  return (
    <div className={styles.modal}>
      <div className={showThx ? styles.thx : styles.application}>
        {showThx ? (
          <>
            <h1>Hvala na prijavi</h1>
            <div>
              <p>Prijavili ste se na radionicu</p>
              <span>"{data.title}"</span>
              <p>koja će se održati {data.date}.</p>
            </div>
            <button onClick={onClose} className={styles.return}>
              POVRATAK NA RADIONICE
            </button>
          </>
        ) : (
          <>
            <button onClick={onClose} className={styles.close_btn}>
              <FaTimes />
            </button>
            <p>
              prijavi se na radionicu <span>"{data.title}"</span>
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="puno_ime"
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.fullName}</p>
              <input
                type="text"
                name="email"
                value={formData.email}
                placeholder="email"
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.email}</p>
              <textarea
                name="reason"
                value={formData.reason}
                placeholder="razlog_prijave"
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.reason}</p>
              <button type="submit">PRIJAVI SE</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
