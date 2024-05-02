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
  organizations?: Organization[];
  fetchOrganizations: () => void;
  topicsData?: Options[];
  difficultysData?: Options[];
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
  organization: string;
}

export interface Lecturer {
  id: string;
  name: string;
  bio: string;
  organization: string;
  topics: string[];
  imageURL: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
}

export interface Options {
  id: string;
  name: string;
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
  const [organizations, setOrganizations] = useState<
    Organization[] | undefined
  >(undefined);
  const [topicsData, setTopicsData] = useState<Options[] | undefined>(
    undefined
  );
  const [difficultysData, setDifficultysData] = useState<Options[] | undefined>(
    undefined
  );

  useEffect(() => {
    fetchTopicsData();
    fetchDifficultysData();
    fetchWorkshops();
    fetchLecturers();
    fetchOrganizations();
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

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/organizacije");
      setOrganizations(response.data);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  const fetchTopicsData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/teme");
      setTopicsData(response.data);
    } catch (error) {
      console.error("Error fetching topics: ", error);
    }
  };

  const fetchDifficultysData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tezine");
      setDifficultysData(response.data);
    } catch (error) {
      console.error("Error fetching difficultys: ", error);
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
    organizations,
    fetchOrganizations,
    topicsData,
    difficultysData,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
