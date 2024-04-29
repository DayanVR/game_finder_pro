import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import ImageGallery from "../functions/ImageGallery";
import { faBook } from "@fortawesome/free-solid-svg-icons";

function GameDetailsPage() {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [gameInfo, setGameInfo] = useState("summary");
  const [imageIndex, setImageIndex] = useState(1);
  const [isGameSaved, setIsGameSaved] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchGame = async () => {
      const body = {
        fields:
          "name,slug,rating,rating_count,cover.url,genres.name,game_modes.name,involved_companies.company.name,involved_companies.*,first_release_date,storyline,summary,player_perspectives.name,screenshots.url,themes.name,videos.*,platforms.name,platforms.category,platforms.platform_family.*",
        where: `slug = "${slug}"`,
      };
      const headers = {
        Accept: "application/json",
        Authorization: "Bearer l8zckwd7hitohfpj4ni4tmjhq41go2",
        "Client-ID": "w3digq04cfa0r0n86enjwuwn3ci1hk",
      };

      try {
        const response = await axios.post(
          "/.netlify/functions/server/details",
          body,
          {
            headers,
          },
        );
        setGame(response.data[0]);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGame();
  }, [slug]);

  useEffect(() => {
    const savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];
    const isSaved = savedGames.some(
      (savedGame) => savedGame.slug === game?.slug,
    );
    setIsGameSaved(isSaved);
  }, [game]);

  const genresList = game?.genres?.map((genre) => genre.name);
  const platformsList = game?.platforms?.map((platform) => platform.name);
  const gameModesList = game?.game_modes?.map((gameMode) => gameMode.name);
  const player_perspectivesList = game?.player_perspectives?.map(
    (player) => player.name,
  );
  const screenshotsList = game?.screenshots?.map(
    (screenshot) => screenshot.url,
  );
  const themesList = game?.themes?.map((theme) => theme.name);

  let video_id = `https://www.youtube.com/embed/`;
  if (game?.videos) {
    video_id = video_id + game?.videos[0]?.video_id;
  } else {
    video_id = "https://www.youtube.com/embed/";
  }

  const developerCompany = game?.involved_companies?.find(
    (company) => company.developer,
  );
  const publisherCompany = game?.involved_companies?.find(
    (company) => company.publisher,
  );

  const formatDate = (timestamp) => {
    if (timestamp === undefined) {
      return "Date not provided";
    } else {
      const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (0 to 11)
      const day = date.getDate().toString().padStart(2, "0"); // Get day
      const year = date.getFullYear(); // Get year

      return `${month}/${day}/${year}`;
    }
  };
  const formattedDate = formatDate(game?.first_release_date);

  const handleAddToLibrary = () => {
    const savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];

    const isGameSaved = savedGames.some(
      (savedGame) => savedGame.slug === game.slug,
    );

    if (!isGameSaved) {
      savedGames.push(game);
      localStorage.setItem("savedGames", JSON.stringify(savedGames));
      setIsGameSaved(true);
    }
  };

  const handleRemoveFromLibrary = () => {
    const savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];

    const updatedGames = savedGames.filter(
      (savedGame) => savedGame.slug !== game.slug,
    );
    localStorage.setItem("savedGames", JSON.stringify(updatedGames));
    setIsGameSaved(false);
  };

  if (!game) {
    return (
      <div className="mt-10 h-[101vh] text-center text-6xl font-semibold text-red-500 md:mt-20">
        Loading Game...
      </div>
    );
  }

  return (
    <div>
      {game && (
        <div className="mx-5 my-6 space-y-8 text-white md:mx-12 md:space-y-6 xl:mx-8 2xl:mx-[400px]">
          <div className="items-center justify-between text-center text-black max-md:mx-auto max-md:space-y-2 md:flex ">
            <div>
              <button
                onClick={handleClick}
                className="w-full rounded-md bg-gray-100 px-4 py-2 text-2xl font-bold"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                {""} Back
              </button>
            </div>

            <div>
              {isGameSaved ? (
                <button
                  className="flex w-fit cursor-pointer items-center space-x-2 rounded-md px-3 py-2 hover:bg-slate-800/[0.8] max-lg:mx-auto"
                  onClick={handleRemoveFromLibrary}
                >
                  <FontAwesomeIcon
                    className="size-7 text-red-500 xl:size-8 2xl:size-9"
                    icon={faTrash}
                  />
                  <h2 className="text-2xl font-semibold text-white xl:text-4xl 2xl:text-5xl">
                    Remove from Library
                  </h2>
                </button>
              ) : (
                <button
                  className="flex w-fit cursor-pointer items-center space-x-2 rounded-md px-3 py-2 hover:bg-slate-800/[0.8] max-lg:mx-auto "
                  onClick={handleAddToLibrary}
                >
                  <FontAwesomeIcon
                    className="size-7 text-red-500 xl:size-8 2xl:size-9"
                    icon={faPlus}
                  />
                  <h2 className="text-2xl font-semibold text-white xl:text-4xl 2xl:text-5xl">
                    Add to Library
                  </h2>
                </button>
              )}
            </div>

            <div>
              <Link to="/games-library">
                <label className="flex w-fit cursor-pointer items-center space-x-2 rounded-md px-3 py-2 hover:bg-slate-800/[0.8] max-lg:mx-auto ">
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
          </div>

          <div className="relative mx-auto w-full space-y-5 rounded-md bg-slate-800/[0.6] pb-10">
            <div className="right-0 h-80 w-full max-lg:mx-auto md:h-[450px] lg:absolute lg:h-[425px] lg:w-[450px] xl:h-[485px] xl:w-[500px] 2xl:h-[450px] 2xl:w-6/12">
              <img
                src={
                  game.cover?.url.replace("t_thumb", "t_720p") ??
                  "img-not-found.jpg"
                }
                className="size-full rounded-md"
                alt=""
              />
            </div>

            <div className="mx-5 md:mx-8 xl:mx-12 [&_dd]:text-xl [&_dd]:md:text-2xl [&_dd]:2xl:text-3xl [&_strong]:text-2xl [&_strong]:italic [&_strong]:md:text-3xl [&_strong]:xl:text-4xl [&_summary]:text-2xl [&_summary]:font-semibold [&_summary]:italic [&_summary]:md:text-3xl [&_summary]:xl:text-4xl">
              <h1 className="my-6 text-balance text-4xl font-semibold text-white max-lg:mx-2 max-lg:text-center md:text-5xl lg:w-6/12 lg:pt-4 xl:w-7/12 xl:text-6xl 2xl:w-5/12">
                {game?.name}
              </h1>

              <div>
                <dl className="space-y-2 text-balance [&_dt]:pt-2">
                  {formatDate && (
                    <>
                      <dt>
                        <strong>Released Date:</strong>
                      </dt>
                      <dd>{formattedDate}</dd>
                    </>
                  )}
                  {player_perspectivesList && (
                    <>
                      <dt>
                        <strong>Player Perspectives: </strong>
                      </dt>
                      <dd>{player_perspectivesList?.join(", ")}</dd>
                    </>
                  )}

                  {gameModesList && (
                    <>
                      <dt>
                        <strong>Game modes: </strong>
                      </dt>
                      {gameModesList && <dd>{gameModesList?.join(", ")}</dd>}
                    </>
                  )}
                  {themesList && (
                    <>
                      <dt>
                        <strong>Themes: </strong>
                      </dt>
                      <dd>{themesList?.join(", ")}</dd>
                    </>
                  )}
                  {developerCompany && (
                    <>
                      <dt>
                        <strong>Developer: </strong>
                      </dt>
                      <dd>{developerCompany?.company.name}</dd>
                    </>
                  )}
                  {publisherCompany && (
                    <>
                      <dt>
                        <strong>Publisher: </strong>
                      </dt>
                      <dd>{publisherCompany?.company.name}</dd>
                    </>
                  )}
                  {genresList && (
                    <>
                      <dt>
                        <strong>Genres: </strong>
                      </dt>
                      <dd>{genresList?.join(", ")}</dd>
                    </>
                  )}
                  {platformsList && (
                    <>
                      <dt>
                        <strong>Platforms: </strong>
                      </dt>
                      <dd>{platformsList?.join(", ")}</dd>
                    </>
                  )}

                  <div className="mx-auto pb-2 xl:w-10/12 xl:text-center">
                    <div className="flex justify-around pb-6 sm:justify-center md:space-x-8 lg:pt-4 xl:pt-8">
                      {game?.summary && (
                        <>
                          <dt
                            className={`cursor-pointer ${gameInfo === "summary" ? "bg-slate-700" : "hover:bg-slate-600"} rounded-lg p-2 md:p-3`}
                            onClick={() => setGameInfo("summary")}
                          >
                            <strong>Summary</strong>
                          </dt>
                        </>
                      )}
                      {game?.summary && game?.storyline && (
                        <div className="border-x-2 "></div>
                      )}
                      {game?.storyline && (
                        <>
                          <dt
                            className={`cursor-pointer ${gameInfo === "storyline" ? "bg-slate-700" : "hover:bg-slate-600"} rounded-lg p-2 md:p-3`}
                            onClick={() => setGameInfo("storyline")}
                          >
                            <strong>Storyline</strong>
                          </dt>
                        </>
                      )}
                    </div>
                    {gameInfo === "summary" && (
                      <dd className="line-clamp-6">{game?.summary}</dd>
                    )}
                    {gameInfo === "storyline" && (
                      <dd className="line-clamp-6">{game?.storyline}</dd>
                    )}
                  </div>

                  <div className="justify-between md:flex lg:w-11/12 xl:w-10/12 2xl:w-10/12 [&_div]:space-y-2 [&_dt]:pt-2">
                    <div></div>

                    <div></div>
                  </div>
                </dl>
              </div>

              {game?.videos && (
                <div className="space-y-4 py-4 lg:space-y-8 lg:py-8">
                  <h2 className=" text-center text-2xl text-red-500 underline md:text-3xl xl:text-4xl">
                    GAMEPLAY TRAILER
                  </h2>
                  <iframe
                    className="mx-auto h-80 w-full md:w-[550px] xl:h-[400px] xl:w-[700px]"
                    src={video_id}
                    title={game?.videos[0].name}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
            {screenshotsList && (
              <div className="space-y-4 py-4 lg:space-y-8 lg:py-8">
                <h2 className=" text-center text-2xl text-red-500 underline md:text-3xl xl:text-4xl">
                  CAPTURES
                </h2>
                <ImageGallery
                  images={screenshotsList}
                  setImageIndex={setImageIndex}
                />
                <div className="text-center">
                  <span className="text-2xl font-semibold lg:text-3xl">
                    {imageIndex} of {screenshotsList?.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GameDetailsPage;
