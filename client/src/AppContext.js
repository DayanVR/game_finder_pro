import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [gamesLibrary, setGamesLibrary] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [changeOffsets, setChangeOffsets] = useState(0);
  const [page, setPage] = useState(1);
  const [platformId, setPlatformId] = useState("");
  const [orderBy, setOrderBy] = useState("none");
  const [searchGame, setSearchGame] = useState("");
  const [loading, setLoading] = useState(false);
  const [releasedGameDate, setReleasedGameDate] = useState("");
  const [gotyEditions, setGotyEditions] = useState(false);
  const [titleChanged, setTitleChanged] = useState("");

  // Effect to save filteredGames to localStorage
  useEffect(() => {
    localStorage.setItem("filteredGames", JSON.stringify(filteredGames));
  }, [filteredGames]);

  // Effect to restore filteredGames from localStorage
  useEffect(() => {
    const savedFilteredGames = JSON.parse(
      localStorage.getItem("filteredGames"),
    );
    if (savedFilteredGames) {
      setFilteredGames(savedFilteredGames);
    }
  }, []);

  const contextValues = {
    gamesLibrary,
    setGamesLibrary,
    filteredGames,
    setFilteredGames,
    changeOffsets,
    setChangeOffsets,
    page,
    setPage,
    platformId,
    setPlatformId,
    orderBy,
    setOrderBy,
    searchGame,
    setSearchGame,
    loading,
    setLoading,
    releasedGameDate,
    setReleasedGameDate,
    gotyEditions,
    setGotyEditions,
    titleChanged,
    setTitleChanged,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};
