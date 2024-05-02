import React, { useState } from "react";

import styles from "./SignupModal.module.scss";
import { Workshop, useAppContext } from "../../context/appContext";
import { FaTimes } from "react-icons/fa";

interface SignupModalProps {
  onClose: () => void;
  onSignup: (formData: {
    fullName: string;
    email: string;
    reason: string;
  }) => void;
  data: Workshop;
}

const SignupModal: React.FC<SignupModalProps> = ({
  onClose,
  onSignup,
  data,
}) => {
  const { fetchWorkshops } = useAppContext();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [showThx, setShowThx] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !reason) {
      setError(true);
      return;
    }

    setError(false);
    setShowThx(true);
    onSignup({ fullName, email, reason });
    fetchWorkshops();
  };

  return (
    <div className={styles.modal}>
      <div className={showThx ? styles.thx : styles.application}>
        {showThx ? (
          <>
            <h1>Hvala na prijavi</h1>
            <p>
              Prijavili ste se na radionicu "{data.title}" koja će se održati{" "}
              {data.date}
            </p>
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
                value={fullName}
                placeholder="puno_ime"
                onChange={(e) => setFullName(e.target.value)}
              />
              <p className={styles.error}>
                {error && !fullName && "*unesite puno ime"}
              </p>
              <input
                type="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className={styles.error}>
                {error &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
                  "*unesite valjanu email adresu"}
              </p>
              <textarea
                value={reason}
                placeholder="razlog_prijave"
                onChange={(e) => setReason(e.target.value)}
              />
              <p className={styles.error}>
                {error && !reason && "*unesite razlog prijave"}
              </p>
              <button type="submit">PRIJAVI SE</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
