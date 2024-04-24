import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextProps {
  showAdminPage: boolean;
  toggleAdminPage: () => void;
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
  const [showAdminPage, setShowAdminPage] = useState<boolean>(false);

  const toggleAdminPage = () => {
    setShowAdminPage((prevShowAdminPage) => !prevShowAdminPage);
  };

  const contextValue: ContextProps = {
    showAdminPage,
    toggleAdminPage,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
