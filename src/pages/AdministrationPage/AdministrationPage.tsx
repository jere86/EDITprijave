import { useEffect, useState } from "react";
import axios from "axios";
import {
  Lecturer,
  Organization,
  Workshop,
  useAppContext,
} from "../../context/appContext";
import AddEditForm from "../../components/AddEditForm/AddEditForm";
import styles from "./AdministrationPage.module.scss";
import { GrWorkshop } from "react-icons/gr";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";

const AdministrationPage = () => {
  const {
    lecturers,
    organizations,
    workshops,
    fetchWorkshops,
    fetchLecturers,
    fetchOrganizations,
  } = useAppContext();
  const [displayData, setDisplayData] = useState<
    Workshop[] | Lecturer[] | Organization[]
  >([]);
  const [data, setData] = useState<Workshop | Lecturer | Organization>();
  const [type, setType] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [activeType, setActiveType] = useState("");

  const handleDataLoad = (type: string) => {
    setActiveType(type);
    type === "radionice" && setDisplayData(workshops as Workshop[]);
    type === "predavaci" && setDisplayData(lecturers as Lecturer[]);
    type === "organizacije" && setDisplayData(organizations as Organization[]);
    setType(type);
  };

  useEffect(() => {
    handleDataLoad(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workshops, lecturers, organizations]);

  const toggleAddForm = () => {
    setShowAddForm((prevShowAddForm) => !prevShowAddForm);
  };

  const toggleEditForm = async (id: string, type: string) => {
    setShowEditForm((prevShowEditForm) => !prevShowEditForm);
    try {
      const response = await axios.get(`http://localhost:3001/${type}/${id}`);
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  const toggleDelete = async (id: string, type: string) => {
    try {
      await axios.delete(`http://localhost:3001/${type}/${id}`);
      fetchWorkshops();
      fetchLecturers();
      fetchOrganizations();
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  return (
    <div className={styles.administration}>
      <div className={styles.nav}>
        <div className={styles.pages}>
          <button
            onClick={() => handleDataLoad("radionice")}
            className={activeType === "radionice" ? styles.active : ""}
          >
            Radionice
          </button>
          <button
            onClick={() => handleDataLoad("predavaci")}
            className={activeType === "predavaci" ? styles.active : ""}
          >
            Predavači
          </button>
          <button
            onClick={() => handleDataLoad("organizacije")}
            className={activeType === "organizacije" ? styles.active : ""}
          >
            Organizacije
          </button>
        </div>
        <button
          className={
            activeType
              ? `${styles.active_admin_btn} ${styles.admin_btn}`
              : styles.admin_btn
          }
          onClick={toggleAddForm}
          disabled={type === ""}
        >
          +
          <GrWorkshop />
        </button>
      </div>
      {showAddForm && (
        <AddEditForm
          onClose={() => {
            setShowAddForm(false);
          }}
          itemType={type as "radionice" | "predavaci" | "organizacije"}
          mode="add"
        />
      )}
      {showEditForm && (
        <AddEditForm
          onClose={() => {
            setShowEditForm(false);
          }}
          item={data}
          mode="edit"
          itemType={type as "radionice" | "predavaci" | "organizacije"}
        />
      )}
      {type === "radionice" && (
        <table>
          <thead>
            <tr>
              <th>Naziv</th>
              <th>Predavač</th>
              <th>Tema</th>
              <th>Br. prijava</th>
              <th>Opcije</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((item, index) => (
              <tr key={index}>
                <td>{(item as Workshop).title}</td>
                <td>{(item as Workshop).lecturer}</td>
                <td>{(item as Workshop).topic}</td>
                <td>{(item as Workshop).applicants.length}</td>
                <td>
                  <button
                    className={styles.edit}
                    onClick={() => toggleEditForm(item.id, type)}
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    className={styles.edit}
                    onClick={() => {
                      toggleDelete(item.id, type);
                    }}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {type === "predavaci" && (
        <table>
          <thead>
            <tr>
              <th>Ime</th>
              <th>Organizacija</th>
              <th>Tema</th>
              <th>Opcije</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((item, index) => (
              <tr key={index}>
                <td>{(item as Lecturer).name}</td>
                <td>{(item as Lecturer).organization}</td>
                <td>
                  {(item as Lecturer).topics.map((topic, index) =>
                    index === 0 ? topic : `, ${topic}`
                  )}
                </td>
                <td>
                  <button
                    className={styles.edit}
                    onClick={() => toggleEditForm(item.id, type)}
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    className={styles.edit}
                    onClick={() => {
                      toggleDelete(item.id, type);
                    }}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {type === "organizacije" && (
        <table>
          <thead>
            <tr>
              <th>Ime</th>
              <th>Opcije</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((item, index) => (
              <tr key={index}>
                <td>{(item as Organization).name}</td>
                <td>
                  <button
                    className={styles.edit}
                    onClick={() => toggleEditForm(item.id, type)}
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    className={styles.edit}
                    onClick={() => {
                      toggleDelete(item.id, type);
                    }}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdministrationPage;
