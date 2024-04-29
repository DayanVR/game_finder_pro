import {
  faArrowLeft,
  faHouse,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "./Card";

function GamesLibrary() {
  const navigate = useNavigate();
  const handleClear = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleClick = () => {
    navigate(-1);
  };
  const handleClickTwo = () => {
    navigate("/");
  };

  const [savedGames, setSavedGames] = useState([]);

  useEffect(() => {
    const savedGamesData = JSON.parse(localStorage.getItem("savedGames")) || [];
    setSavedGames(savedGamesData);
  }, []);

  return (
    <div className="my-6 lg:my-10">
      <div className="justify-around max-md:space-y-4 md:flex [&_button]:bg-gray-100 [&_button]:px-5 [&_button]:py-2 [&_button]:lg:px-8 [&_button]:lg:py-3">
        <div className="flex justify-evenly md:space-x-6 xl:space-x-8">
          <button
            onClick={handleClick}
            className="rounded-md text-2xl font-bold hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {""} Back
          </button>

          <button
            onClick={handleClickTwo}
            className=" rounded-md text-2xl font-bold hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faHouse} />
            {""} Home
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleClear}
            className="rounded-md text-2xl font-bold hover:bg-gray-300"
          >
            <FontAwesomeIcon icon={faTrash} />
            {""} Reset Library
          </button>
        </div>
      </div>

      <div>
        {savedGames && savedGames.length > 0 ? (
          <div className="my-6 grid grid-flow-row grid-cols-1 h-full text-white md:grid-cols-2 xl:mx-32 xl:grid-cols-3 2xl:mx-60 min-[1700px]:grid-cols-4 min-[2560px]:grid-cols-5">
            {savedGames.map((game, index) => (
              <div key={game.id} className="mx-auto my-5 xl:my-8">
                <Link to={`/games/${game.slug}`}>
                  <Card game={game} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-8 text-center text-2xl font-semibold text-white md:text-4xl lg:text-6xl">
            No Game Added To Library
          </div>
        )}
      </div>
    </div>
  );
}

export default GamesLibrary;
