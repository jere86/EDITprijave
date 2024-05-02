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
  const [formData, setFormData] = useState<any>(() => {
    if (itemType === "radionice") {
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
        organization: "",
      } as Workshop;
    } else if (itemType === "predavaci") {
      return {
        id: v4(),
        name: "",
        bio: "",
        organization: "",
        topics: [],
        imageURL: "",
      } as Lecturer;
    } else if (itemType === "organizacije") {
      return {
        id: v4(),
        name: "",
        description: "",
      } as Organization;
    }
    return undefined;
  });

  useEffect(() => {
    if (mode === "edit" && item) {
      if (itemType === "radionice") {
        setFormData(item as Workshop);
      }
      if (itemType === "organizacije") {
        setFormData(item as Organization);
      }
      if (itemType === "predavaci") {
        setFormData(item as Lecturer);
      }
    }
  }, [mode, item, itemType]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "edit") {
        await axios.patch(
          `http://localhost:3001/${itemType}/${item?.id}`,
          formData
        );
      } else {
        await axios.post(`http://localhost:3001/${itemType}`, formData);
      }

      if (itemType === "radionice") {
        setFormData({
          id: v4(),
          title: "",
          date: "",
          lecturer: "",
          description: "",
          applicants: [],
          topic: "",
          difficulty: "",
          imageURL: "",
          organization: "",
        });
      } else if (itemType === "predavaci") {
        setFormData({
          id: v4(),
          name: "",
          bio: "",
          organization: "",
          topics: [],
          imageURL: "",
        });
      } else if (itemType === "organizacije") {
        setFormData({
          id: v4(),
          name: "",
          description: "",
        });
      }
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
        <h2>{mode === "edit" ? `Edit ${itemType}` : `Add New ${itemType}`}</h2>
        <form onSubmit={handleSubmit}>
          {itemType === "radionice" && (
            <>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Lecturer:
                <select
                  name="lecturer"
                  value={formData.lecturer}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Lecturer</option>
                  {lecturers?.map((lecturer) => (
                    <option key={lecturer.id} value={lecturer.name}>
                      {lecturer.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Topic:
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Topic</option>
                  {topicsData?.map((topic) => (
                    <option key={topic.id} value={topic.name}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Difficulty:
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Difficulty</option>
                  {difficultysData?.map((difficulty) => (
                    <option key={difficulty.id} value={difficulty.name}>
                      {difficulty.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Image URL:
                <input
                  type="url"
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          )}
          {itemType === "predavaci" && (
            <>
              <label>
                Ime predavača:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Bio:
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Organization:
                <select
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Organization</option>
                  {organizations?.map((organization) => (
                    <option key={organization.id} value={organization.name}>
                      {organization.name}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
          {itemType === "organizacije" && (
            <>
              <label>
                Organization Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          )}

          <button type="submit">{mode === "edit" ? "Edit" : "Submit"}</button>
        </form>
      </div>
    </div>
  );
};

export default AddEditForm;
