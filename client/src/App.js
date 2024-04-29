import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import GameDetailsPage from "./components/games_Info/GameDetailsPage";
import GamesLibrary from "./components/games_Info/GamesLibrary";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ScrollToTop from "./components/functions/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/games/:slug" element={<GameDetailsPage />} />
        <Route path="/games-library" element={<GamesLibrary />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
