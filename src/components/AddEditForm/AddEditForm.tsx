/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 } from "uuid";
import {
  Lecturer,
  Organization,
  Workshop,
  useAppContext,
} from "../../context/appContext";
import styles from "./AddEditForm.module.scss";
import { FaTimes } from "react-icons/fa";

interface AddEditFormProps {
  onClose: () => void;
  mode: "add" | "edit";
  itemType: "radionice" | "organizacije" | "predavaci";
  item?: Workshop | Lecturer | Organization;
}

const AddEditForm: React.FC<AddEditFormProps> = ({
  onClose,
  mode,
  itemType,
  item,
}) => {
  const {
    fetchWorkshops,
    lecturers,
    fetchLecturers,
    organizations,
    fetchOrganizations,
    topicsData,
    difficultysData,
  } = useAppContext();
  const initializeErrors = (type: string) => {
    let errors: any = {};
    if (type === "radionice") {
      errors = {
        title: "",
        date: "",
        lecturer: "",
        description: "",
        topic: "",
        difficulty: "",
        imageURL: "",
      };
    } else if (type === "predavaci") {
      errors = {
        name: "",
        bio: "",
        organization: "",
        topics: "",
        imageURL: "",
      };
    } else if (type === "organizacije") {
      errors = {
        name: "",
        description: "",
      };
    }
    return errors;
  };
  const initializeFormData = (type: string) => {
    if (type === "radionice") {
      return {
        id: v4(),
        title: "",
        date: "",
        lecturer: "",
        description: "",
        applicants: [],
        topic: "",
        difficulty: "",
        imageURL: "",
      } as Workshop;
    } else if (type === "predavaci") {
      return {
        id: v4(),
        name: "",
        bio: "",
        organization: "",
        topics: [],
        imageURL: "",
      } as Lecturer;
    } else if (type === "organizacije") {
      return {
        id: v4(),
        name: "",
        description: "",
      } as Organization;
    }
    return undefined;
  };
  const [formData, setFormData] = useState<any>(() => {
    return initializeFormData(itemType);
  });
  const [errors, setErrors] = useState<any>(() => {
    return initializeErrors(itemType);
  });
  const errorMessages: { [key: string]: string } = {
    title: "*unesite naslov",
    date: "*unesite datum",
    lecturer: "*odaberite predavača",
    description: "*unesite opis",
    topic: "*odaberite temu",
    topics: "*odaberite teme",
    difficulty: "*odaberite težinu",
    imageURL: "*unesite URL slike",
    name: "*unesite puno ime predavača",
    bio: "*unesite kratku biografiju",
    organization: "*odaberite organizaciju",
  };

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData(item);
    }
  }, [mode, item]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "topics") {
      const target = e.target as HTMLSelectElement;
      const selectedOptions = Array.from(
        target.selectedOptions,
        (option) => (option as HTMLOptionElement).value
      );
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: selectedOptions || [],
      }));
    } else {
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: value || "",
      }));
    }
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = initializeErrors(itemType);

    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = errorMessages[key];
        setErrors(newErrors);
        formValid = false;
      }
    }

    if (itemType === "predavaci" && formData.topics.length === 0) {
      newErrors["topics"] = errorMessages["topics"];
      setErrors(newErrors);
      formValid = false;
    }

    setErrors(newErrors);

    if (!formValid) return;

    try {
      if (mode === "edit") {
        await axios.patch(
          `http://localhost:3001/${itemType}/${item?.id}`,
          formData
        );
      } else {
        await axios.post(`http://localhost:3001/${itemType}`, formData);
      }
      setFormData(initializeFormData(itemType));
      fetchWorkshops();
      fetchLecturers();
      fetchOrganizations();
      onClose();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.form}>
        <button onClick={onClose} className={styles.close_btn}>
          <FaTimes />
        </button>
        <h1>
          {mode === "edit"
            ? `Uredi ${
                itemType === "radionice"
                  ? "radionicu"
                  : itemType === "predavaci"
                  ? "predavača"
                  : "organizaciju"
              }`
            : `Dodaj ${
                itemType === "radionice"
                  ? "novu radionicu"
                  : itemType === "predavaci"
                  ? "novog predavača"
                  : "novu organizaciju"
              }`}
        </h1>
        <form onSubmit={handleSubmit}>
          {itemType === "radionice" && (
            <div className={styles.workshopForm}>
              <div>
                <div>
                  <input
                    type="text"
                    name="title"
                    placeholder="naziv"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  <p className={styles.error}>{errors.title}</p>
                  <input
                    type="date"
                    name="date"
                    placeholder="datum"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  <p className={styles.error}>{errors.date}</p>
                  <input
                    type="text"
                    name="imageURL"
                    placeholder="URL_slike"
                    value={formData.imageURL}
                    onChange={handleChange}
                  />
                  <p className={styles.error}>{errors.imageURL}</p>
                </div>
                <div>
                  <select
                    name="lecturer"
                    value={formData.lecturer}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      predavač
                    </option>
                    {lecturers?.map((lecturer) => (
                      <option key={lecturer.id} value={lecturer.name}>
                        {lecturer.name}
                      </option>
                    ))}
                  </select>
                  <p className={styles.error}>{errors.lecturer}</p>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      tema
                    </option>
                    {topicsData?.map((topic) => (
                      <option key={topic.id} value={topic.name}>
                        {topic.name}
                      </option>
                    ))}
                  </select>
                  <p className={styles.error}>{errors.topic}</p>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      težina
                    </option>
                    {difficultysData?.map((difficulty) => (
                      <option key={difficulty.id} value={difficulty.name}>
                        {difficulty.name}
                      </option>
                    ))}
                  </select>
                  <p className={styles.error}>{errors.difficulty}</p>
                </div>
              </div>
              <textarea
                name="description"
                placeholder="kratki_opis"
                value={formData.description}
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.description}</p>
            </div>
          )}
          {itemType === "predavaci" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="puno_ime_predavača"
                value={formData.name}
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.name}</p>
              <textarea
                name="bio"
                placeholder="kratka_biografija"
                value={formData.bio}
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.bio}</p>
              <select
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  organizacija
                </option>
                {organizations?.map((organization) => (
                  <option key={organization.id} value={organization.name}>
                    {organization.name}
                  </option>
                ))}
              </select>
              <p className={styles.error}>{errors.organization}</p>
              <select
                name="topics"
                className={styles.multiple}
                value={formData.topics}
                onChange={handleChange}
                multiple
              >
                <option value="" disabled hidden>
                  teme
                </option>
                {topicsData?.map((topic) => (
                  <option key={topic.id} value={topic.name}>
                    {topic.name}
                  </option>
                ))}
              </select>
              <p className={styles.error}>
                {errors.topics} <span>*Ctrl+Click za odabir više tema</span>
              </p>
              <input
                type="text"
                name="imageURL"
                placeholder="URL_slike"
                value={formData.imageURL}
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.imageURL}</p>
            </>
          )}
          {itemType === "organizacije" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="ime_organizacije"
                value={formData.name}
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.name}</p>
              <textarea
                name="description"
                placeholder="kratki_opis"
                value={formData.description}
                onChange={handleChange}
              />
              <p className={styles.error}>{errors.description}</p>
            </>
          )}
          <button type="submit">{mode === "edit" ? "Uredi" : "Dodaj"}</button>
        </form>
      </div>
    </div>
  );
};

export default AddEditForm;
