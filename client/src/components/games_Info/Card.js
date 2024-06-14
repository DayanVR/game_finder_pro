import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faAndroid,
  faApple,
  faPlaystation,
  faXbox,
} from "@fortawesome/free-brands-svg-icons";

const Card = ({ game }) => {
  const [platformIcons, setPlatformIcons] = useState(new Set());

  let fullRate = Math.round(game.rating);

  const rateBorder = () => {
    if (fullRate >= 90) {
      return "border-green-400 text-green-400";
    }
    if (fullRate >= 80) {
      return "border-green-300 text-green-300";
    }
    if (fullRate >= 70) {
      return "border-yellow-300 text-yellow-300";
    }
    if (fullRate >= 60) {
      return "border-orange-600 text-orange-600";
    } else {
      return "border-red-600 text-red-600";
    }
  };

  useEffect(() => {
    if (!game.platforms) return;

    const icons = new Set();
    game.platforms.forEach(({ id, platform_family }) => {
      if (id === 6 && !icons.has("windows")) {
        icons.add("windows");
      } else if (platform_family?.id === 1 && !icons.has("playstation")) {
        icons.add("playstation");
      } else if (platform_family?.id === 2 && !icons.has("xbox")) {
        icons.add("xbox");
      } else if (id === 34 && !icons.has("android")) {
        icons.add("android");
      } else if (id === 39 && !icons.has("apple")) {
        icons.add("apple");
      } else {
        return null;
      }
    });
    setPlatformIcons(icons);
  }, [game.platforms]);

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
  const formattedDate = formatDate(game.first_release_date);

  return (
    <div className="mx-auto w-[274px] h-[410px] transform cursor-pointer rounded-b-xl rounded-t-xl bg-slate-800/[0.6] pb-4 text-left duration-300 ease-in xl:hover:scale-105 2xl:hover:scale-110">
      <img
        src={
          game.cover?.url.replace("t_thumb", "t_logo_med") ??
          "img-not-found.jpg"
        }
        className="h-[284px] w-[160px] rounded-t-xl aspect-video "
        alt=""
      />

      <div className="mx-4 space-y-3">
        <div className="mt-3 flex items-center justify-between last:bg-red-200">
          <div className="flex space-x-3">
            {[...platformIcons].map((icon, index) => (
              <div key={index}>
                {icon === "windows" && (
                  <FontAwesomeIcon
                    icon={faWindows}
                    size="xl"
                    className="text-sky-500"
                  />
                )}
                {icon === "playstation" && (
                  <FontAwesomeIcon
                    icon={faPlaystation}
                    size="xl"
                    className="text-blue-500"
                  />
                )}
                {icon === "xbox" && (
                  <FontAwesomeIcon
                    icon={faXbox}
                    size="xl"
                    className="text-green-700"
                  />
                )}
                {icon === "android" && (
                  <FontAwesomeIcon
                    icon={faAndroid}
                    size="xl"
                    className="text-lime-500"
                  />
                )}
                {icon === "apple" && (
                  <FontAwesomeIcon
                    icon={faApple}
                    size="xl"
                    className="text-slate-300"
                  />
                )}
              </div>
            ))}
          </div>
          <div>
            <p
              className={`${rateBorder()} flex items-center justify-center rounded-sm border-2 p-1 text-xl`}
            >
              {fullRate}
            </p>
          </div>
        </div>
        <div>
          <h1 className="mt-2 text-balance line-clamp-2 text-2xl font-medium h-16">{game?.name}</h1>
        </div>
        <div className="flex justify-between">
          <p>{game?.rating_count} Votes</p>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
