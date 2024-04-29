import Card from "./Card";
import { Link } from "react-router-dom";

function GameList({
  filteredGames,
  setChangeOffsets,
  page,
  setPage,
  Pagination,
  orderBy,
}) {

  return (
    <>
      {filteredGames && filteredGames.length > 0 ? (
        <>
          <div className="grid grid-flow-row grid-cols-1 text-white md:grid-cols-2 xl:grid-cols-3 min-[1700px]:grid-cols-4 min-[2560px]:grid-cols-6">
            {filteredGames.map((game) => (
              <div key={game.id} className="mx-auto my-5 xl:my-8">
                <Link to={`/games/${game.slug}`}>
                  <Card game={game} />
                </Link>
              </div>
            ))}
          </div>
          <div
            className={`${orderBy === "top-50" ? "hidden" : ""} mx-auto space-x-2.5 rounded-md bg-gray-200 py-2.5 text-2xl font-bold max-md:w-10/12 max-md:sm:w-6/12 md:w-4/12 lg:w-3/12 2xl:w-2/12`}
          >
            <Pagination
              filteredGames={filteredGames}
              page={page}
              setPage={setPage}
              setChangeOffsets={setChangeOffsets}
            />
          </div>
        </>
      ) : (
        <div className="mt-10 text-4xl font-semibold text-white md:text-5xl xl:text-6xl">
          0 games with this criteria!
        </div>
      )}
    </>
  );
}

export default GameList;
