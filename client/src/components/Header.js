import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Header(props) {
  const [searchInput, setSearchInput] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (props.searchGame === searchInput) {
      return;
    }
    props.setSearchGame(searchInput);
    const filtered = props.gamesLibrary.filter((game) =>
      game.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
    props.setReleasedGameDate("");
    props.setPage(1);
    props.setChangeOffsets(0);
    props.setFilteredGames(filtered);
    props.setGotyEditions(false);
    props.setTitleChanged("search-game");
  };

  useEffect(() => {
    setSearchInput("");
  }, [props.title]);

  return (
    <header className="space-y-4 max-lg:mt-12">
      <div className="justify-between max-lg:space-y-5 lg:mt-6 lg:flex lg:flex-row-reverse">
        <div className="w-fit max-lg:mx-auto">
          <Link to="/games-library">
            <label className="flex w-fit cursor-pointer items-center space-x-2 rounded-md px-3 py-2 hover:bg-slate-800/[0.8] lg:max-2xl:px-1 ">
              <FontAwesomeIcon
                className="size-7 text-red-500 xl:size-8 2xl:size-9"
                icon={faBook}
              />
              <h2 className="text-3xl font-semibold text-white xl:text-4xl 2xl:text-5xl">
                Gamer Library
              </h2>
            </label>
          </Link>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="mx-lg:md:justify-center w- max-lg:mx-auto max-md:space-y-4 sm:w-7/12 md:flex md:w-8/12 md:items-center"
        >
          <div className="xl:w-9/12 2xl:w-8/12">
            <label className="relative block " htmlFor="search-input">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <FontAwesomeIcon
                  className="size-6 text-red-500"
                  icon={faMagnifyingGlass}
                />
              </span>
              <input
                name="searchInput"
                id="search-input"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                type="search"
                className=" w-full py-3 pl-12 text-2xl font-medium text-black max-md:rounded-md max-md:text-xl md:rounded-l-md"
                placeholder="Find your game..."
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-red-600 px-4 py-2 text-2xl font-semibold text-white hover:bg-red-700 max-md:rounded-md md:rounded-r-md md:py-3"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
