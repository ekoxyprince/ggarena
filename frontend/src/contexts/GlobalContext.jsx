import { useContext, createContext, useState } from "react";

const GlobalContext = createContext({
  isNavOpen: false,
  setNavOpen: () => {},
  isCommunityModalOpen: false,
  controlCommunityModal: () => {},
  controlTournamentModal: () => {},
});

export const GlobalProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isTournamentModalOpen, setIsTournamentModalOpen] = useState(false);
  const setNavOpen = () => {
    setIsNavOpen((prev) => !prev);
  };
  const controlCommunityModal = () => {
    setIsCommunityModalOpen((prev) => !prev);
  };
  const controlTournamentModal = () => {
    setIsTournamentModalOpen((prev) => !prev);
  };
  const value = {
    isNavOpen,
    setNavOpen,
    isCommunityModalOpen,
    controlCommunityModal,
    isTournamentModalOpen,
    controlTournamentModal,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
