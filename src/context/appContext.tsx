import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface ContextProps {
  showAdmin: boolean;
  toggleAdmin: () => void;
  workshops?: Workshop[];
  fetchWorkshops: () => void;
  lecturers?: Lecturer[];
  fetchLecturers: () => void;
}
export interface Workshop {
  id: string;
  title: string;
  date: string;
  lecturer: string;
  description: string;
  applicants: [];
  topic: string;
  difficulty: string;
  imageURL: string;
}
export interface Lecturer {
  id: string;
  name: string;
  bio: string;
  organization: string;
  topics: string[];
  imageURL: string;
}

const AppContext = createContext<ContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  const [workshops, setWorkshops] = useState<Workshop[] | undefined>(undefined);
  const [lecturers, setLecturers] = useState<Lecturer[] | undefined>(undefined);

  useEffect(() => {
    fetchWorkshops();
    fetchLecturers();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const response = await axios.get("http://localhost:3001/radionice");
      setWorkshops(response.data);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  const fetchLecturers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/predavaci");
      setLecturers(response.data);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  const toggleAdmin = () => {
    setShowAdmin((prevShowAdmin) => !prevShowAdmin);
  };

  const contextValue: ContextProps = {
    showAdmin,
    toggleAdmin,
    workshops,
    fetchWorkshops,
    lecturers,
    fetchLecturers,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
