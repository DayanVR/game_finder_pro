import React, { useEffect, useRef } from "react";
import axios from "axios";
import "../App.css";
import Pagination from "./functions/Pagination";
import Selection from "./functions/Selection";
import Header from "./Header";
import GameList from "./games_Info/GameList";
import { useAppContext } from "../AppContext";
import NavBar from "./Navbar";

const App = () => {
  const {
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
  } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const body = {
        fields:
          "name,cover.url,genres.name,platforms.name,platforms.category,platforms.platform_family.*,rating,rating_count,first_release_date,slug,version_title",
        where: `rating >= 40 ${gotyEditions ? `& (version_title ~ *"Game of the Year Edition"* | version_title ~ *"GOTY Edition"*)` : ""} ${platformId === "6" || platformId === "34" || platformId === "39" ? `& platforms = ${platformId}` : ""} ${platformId === "1" || platformId === "2" ? `& platforms.platform_family = ${platformId}` : ""} ${releasedGameDate && `& first_release_date >= ${releasedGameDate}`}`,
        sort: `${orderBy === "order-asc" ? "rating asc" : "" || orderBy === "name-asc" ? "name asc" : "" || orderBy === "name-desc" ? "name desc" : "" || orderBy === "none" ? "rating desc" : "" || orderBy === "top-50" ? "rating_count desc" : ""}`,
        search: `${searchGame}`,
        limit: `${orderBy === "top-50" ? "50" : "12"}`,
        offset: changeOffsets.toString(),
      };
      const headers = {
        Accept: "application/json",
        Authorization: "Bearer l8zckwd7hitohfpj4ni4tmjhq41go2",
        "Client-ID": "w3digq04cfa0r0n86enjwuwn3ci1hk",
      };
      try {
        const response = await axios.post("/api/games", body, {
          headers,
        });
        console.log(response.data);
        setGamesLibrary(response.data);
        setFilteredGames(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [
    changeOffsets,
    platformId,
    orderBy,
    searchGame,
    releasedGameDate,
    gotyEditions,
    titleChanged,
    setLoading,
    setGamesLibrary,
    setFilteredGames,
  ]);

  const handleOrderChange = (e) => {
    setPage(1);
    setChangeOffsets(0);
    setOrderBy(e.target.value);
  };

  const handlePlatformChange = (e) => {
    setTitleChanged(`${e.target.value}`);
    setPlatformId(e.target.value);
    if (platformId !== "0") {
      const filtered = gamesLibrary.filter((game) =>
        game.platforms.some(({ id, platform_family }) => {
          return (
            id === parseInt(platformId) ||
            platform_family?.id === parseInt(platformId)
          );
        }),
      );
      setFilteredGames(filtered);
    } else {
      setFilteredGames(gamesLibrary);
    }
  };

  const gamingConsole = useRef("All Platforms");
  const title = useRef("Popular Games");

  useEffect(() => {
    const titleChange = () => {
      if (titleChanged === "last-month") {
        return (title.current = "Last 30 Days");
      } else if (titleChanged === "last-week") {
        return (title.current = "This Week");
      } else if (titleChanged === "top-50") {
        return (title.current = "Top 50");
      } else if (titleChanged === "goty") {
        return (title.current = "Game of the Year");
      } else if (titleChanged === "6") {
        return (gamingConsole.current = "Pc Games");
      } else if (titleChanged === "2") {
        return (gamingConsole.current = "Xbox Games");
      } else if (titleChanged === "1") {
        return (gamingConsole.current = "PlayStation Games");
      } else if (titleChanged === "34") {
        return (gamingConsole.current = "Android Games");
      } else if (titleChanged === "39") {
        return (gamingConsole.current = "IOS Games");
      } else {
        return (gamingConsole.current = "All Platforms");
      }
    };

    titleChange();
  }, [titleChanged]);

  return (
    <div className="App relative mx-5 h-fit bg-black pb-10 sm:pt-2 md:mx-12 xl:mx-8 2xl:mx-32 min-[2560px]:mx-28 ">
      <NavBar
        setReleasedGameDate={setReleasedGameDate}
        setPage={setPage}
        setChangeOffsets={setChangeOffsets}
        setSearchGame={setSearchGame}
        setGotyEditions={setGotyEditions}
        setOrderBy={setOrderBy}
        handlePlatformChange={handlePlatformChange}
        setTitleChanged={setTitleChanged}
      />
      <h1 className="z-50 -mb-8 mt-2 text-right text-2xl font-medium text-red-500 sm:text-3xl md:ml-4 lg:mb-6 lg:mr-10 lg:text-4xl xl:ml-8 xl:mt-5 xl:hidden 2xl:ml-10">
        Game Finder PRO
      </h1>

      <div className="max-xl:lg:mx-16 xl:pl-[340px] 2xl:pl-72">
        <Header
          gamesLibrary={gamesLibrary}
          searchGame={searchGame}
          setSearchGame={setSearchGame}
          setReleasedGameDate={setReleasedGameDate}
          setPage={setPage}
          setChangeOffsets={setChangeOffsets}
          setGotyEditions={setGotyEditions}
          setFilteredGames={setFilteredGames}
        />

        <div>
          <div className="text-balance text-white">
            <div className="my-6 font-medium lg:flex lg:items-center lg:justify-between xl:my-8">
              <h1 className="text-4xl lg:text-left xl:text-5xl 2xl:text-6xl">
                {title.current}
              </h1>
              <h2 className="text-2xl max-xl:hidden xl:text-3xl 2xl:text-4xl">
                {gamingConsole.current}
              </h2>
            </div>
            <div className="my-5 flex justify-between text-xl font-bold text-black max-md:flex-col max-md:space-y-8 sm:mx-auto max-md:sm:w-7/12 [&_div]:max-md:w-10/12">
              <Selection
                handlePlatformChange={handlePlatformChange}
                handleOrderChange={handleOrderChange}
                searchGame={searchGame}
              />

              <div
                className={`${orderBy === "top-50" ? "hidden" : ""} w-full space-x-2.5 self-center rounded-md bg-gray-100 py-2.5 text-2xl max-lg:py-2.5 max-md:mx-auto md:w-3/12 lg:w-2/12`}
              >
                <Pagination
                  filteredGames={filteredGames}
                  page={page}
                  setPage={setPage}
                  setChangeOffsets={setChangeOffsets}
                />
              </div>
            </div>
          </div>

          <div>
            {loading ? (
              <div className="mx-auto mt-10 h-[101vh] text-6xl font-semibold text-red-500">
                Loading Games...
              </div>
            ) : (
              <GameList
                filteredGames={filteredGames}
                orderBy={orderBy}
                Pagination={Pagination}
                page={page}
                setPage={setPage}
                setChangeOffsets={setChangeOffsets}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
