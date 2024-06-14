import { useState, useRef, useEffect } from "react";
import { Flowbite, Sidebar } from "flowbite-react";
import { HiHome, HiPlusCircle, HiViewGridAdd, HiFire } from "react-icons/hi";
import {
  faWindows,
  faAndroid,
  faApple,
  faPlaystation,
  faXbox,
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faDiceD6, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBar({
  setReleasedGameDate,
  setPage,
  setChangeOffsets,
  setSearchGame,
  setGotyEditions,
  setOrderBy,
  handlePlatformChange,
  setTitleChanged,
}) {
  const [isOpen, setIsOpen] = useState(false);
  let sidebarRef = useRef();

  const customTheme = {
    sidebar: {
      root: {
        inner:
          "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 px-3 py-4 dark:bg-black/[0.9]",
      },
    },
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let handler = (e) => {
      if (!sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleDateClick = (e) => {
    const currentDate = new Date();
    let days = 1;
    if (e.target.name === "last-month") {
      setTitleChanged("last-month");
      days = 30;
    } else if (e.target.name === "last-week") {
      setTitleChanged("last-week");
      days = 7;
    }
    const thirtyDaysAgo = new Date(
      currentDate.getTime() - days * 24 * 60 * 60 * 1000,
    );
    const thirtyDaysAgoTimestamp = Math.floor(thirtyDaysAgo.getTime() / 1000);
    setPage(1);
    setChangeOffsets(0);
    setGotyEditions(false);
    setSearchGame("");
    setOrderBy("none");
    setReleasedGameDate(thirtyDaysAgoTimestamp);
  };

  const handleTopClick = (e) => {
    if (e.target.name === "goty") {
      setTitleChanged("goty");
      setOrderBy("none");
      setGotyEditions(true);
    } else if (e.target.name === "top-50") {
      setOrderBy(e.target.name);
      setTitleChanged("top-50");
      setGotyEditions(false);
    }
    setPage(1);
    setReleasedGameDate("");
    setChangeOffsets(0);
    setSearchGame("");
  };

  return (
    <div
      ref={sidebarRef}
      className="fixed top-0 z-50 -mx-5 w-full md:-mx-12 lg:w-60 xl:-mx-8 xl:w-72 2xl:-mx-32 min-[2560px]:-mx-8"
    >
      <button
        className="absolute left-0 top-0 z-50 p-4 text-[#ee4444] focus:outline-none md:left-6 md:top-1 lg:left-10 lg:top-2 xl:hidden"
        onClick={handleToggleMenu}
      >
        {isOpen ? (
          <FontAwesomeIcon icon={faX} className="size-6 sm:size-8" />
        ) : (
          <FontAwesomeIcon icon={faBars} className="size-6 sm:size-8" />
        )}
      </button>

      <Flowbite theme={{ theme: customTheme }}>
        <Sidebar
          className={`${
            isOpen ? "translate-x-0" : "max-xl:-translate-x-full"
          } dark fixed z-40 w-72 overflow-y-auto transition-transform duration-300 ease-in-out md:w-[350px] lg:w-[375px] xl:w-[365px] 2xl:w-[400px]`}
          aria-label="Sidebar with multi-level dropdown example"
        >
          <h1 className="z-50 -mb-6 mt-9 text-left text-2xl font-medium text-red-500 max-xl:hidden sm:text-3xl md:ml-4 lg:text-4xl xl:ml-8 xl:mt-5 2xl:ml-10">
            Game Finder PRO
          </h1>

          <Sidebar.Items className="absolute sm:pt-2 md:pt-4 xl:pt-8">
            <Sidebar.ItemGroup className="-space-y-0 border-t-0 md:ml-4 md:space-y-6 lg:ml-8 max-2xl:xl:ml-3 [&_*]:font-medium [&_a]:w-fit [&_button]:text-2xl [&_button]:md:text-3xl [&_span]:text-2xl [&_span]:sm:text-3xl [&_span]:md:text-4xl [&_svg]:size-8 [&_svg]:xl:size-9">
              <Sidebar.Item
                icon={HiHome}
                
              >
                <button onClick={() => window.location.reload()}>Home</button>
              </Sidebar.Item>
              <Sidebar.Collapse icon={HiPlusCircle} label="New Releases">
                <Sidebar.Item>
                  <button onClick={handleDateClick} name="last-month">
                    Last 30 Days
                  </button>
                </Sidebar.Item>
                <Sidebar.Item>
                  <button onClick={handleDateClick} name="last-week">
                    This Week
                  </button>
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={HiFire} label="Top">
                <Sidebar.Item>
                  <button onClick={handleTopClick} name="goty">
                    Game of the Year
                  </button>
                </Sidebar.Item>
                <Sidebar.Item>
                  <button onClick={handleTopClick} name="top-50">
                    All time top 50
                  </button>
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse
                className="max-xl:hidden"
                icon={HiViewGridAdd}
                label="Platforms"
              >
                <Sidebar.Item className="max-xl:hidden">
                  <button onClick={handlePlatformChange} value="0">
                    <FontAwesomeIcon
                      icon={faDiceD6}
                      className="size-6 pr-3 text-yellow-500 2xl:size-10"
                    />
                    All
                  </button>
                </Sidebar.Item>
                <Sidebar.Item className="max-xl:hidden">
                  <button onClick={handlePlatformChange} value="6">
                    <FontAwesomeIcon
                      icon={faWindows}
                      className="size-6 pr-3 text-sky-500 2xl:size-10"
                    />
                    Pc
                  </button>
                </Sidebar.Item>
                <Sidebar.Item className="max-xl:hidden">
                  <button onClick={handlePlatformChange} value="2">
                    <FontAwesomeIcon
                      icon={faXbox}
                      className="size-6 pr-3 text-green-700 2xl:size-10"
                    />
                    Xbox
                  </button>
                </Sidebar.Item>
                <Sidebar.Item className="max-xl:hidden">
                  <button onClick={handlePlatformChange} value="1">
                    <FontAwesomeIcon
                      icon={faPlaystation}
                      className="size-6 pr-3 text-blue-500 2xl:size-10"
                    />
                    PlayStation
                  </button>
                </Sidebar.Item>
                <Sidebar.Item className="max-xl:hidden">
                  <button onClick={handlePlatformChange} value="34">
                    <FontAwesomeIcon
                      icon={faAndroid}
                      className="size-6 pr-3 text-lime-500 2xl:size-10"
                    />
                    Android
                  </button>
                </Sidebar.Item>
                <Sidebar.Item className="max-xl:hidden">
                  <button onClick={handlePlatformChange} value="39">
                    <FontAwesomeIcon
                      icon={faApple}
                      className="size-6 pr-3 text-slate-300 2xl:size-10"
                    />
                    IOS
                  </button>
                </Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </Flowbite>
    </div>
  );
}
