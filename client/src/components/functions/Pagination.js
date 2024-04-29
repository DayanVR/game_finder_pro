import React from "react";

function Pagination(props) {
  const handlePageDown = (e) => {
    if (props.page === 1) {
      props.setPage(1);
    } else {
      props.setPage(props.page - 1);
      props.setChangeOffsets((prev) => prev - 11);
    }
  };
  const handlePageUp = (e) => {
    props.setPage(props.page + 1);
    props.setChangeOffsets((prev) => prev + 11);
  };

  return (
    <>
      {props.filteredGames.length < 12 ? (
        <>
          <button
            className={`${props.page === 1 ? "cursor-default text-black/[0.3]" : "text-black/[0.6] hover:text-black"}`}
            onClick={handlePageDown}
          >
            {"<"}
          </button>
          {props.page === 1 ? (
            ""
          ) : (
            <button
              className="text-black/[0.5] hover:text-black/[0.8]"
              onClick={handlePageDown}
            >
              {props.page - 1}
            </button>
          )}
          <button>{props.page}</button>
          {props.filteredGames.length < 12 ? (
            ""
          ) : (
            <button
              className={`${props.filteredGames.length < 12 ? "cursor-default text-black/[0.3]" : "text-black/[0.6] hover:text-black"}`}
              onClick={props.handlePageUp}
            >
              {">"}
            </button>
          )}
        </>
      ) : (
        <>
          <button
            className={`${props.page === 1 ? "hidden cursor-default text-black/[0.3]" : "text-black/[0.6] hover:text-black"}`}
            onClick={handlePageDown}
          >
            {"<"}
          </button>
          {props.page === 1 ? (
            ""
          ) : (
            <button
              className="text-black/[0.5] hover:text-black/[0.8]"
              onClick={handlePageDown}
            >
              {props.page - 1}
            </button>
          )}
          <button>{props.page}</button>
          <button
            className="text-black/[0.5] hover:text-black/[0.8]"
            onClick={handlePageUp}
          >
            {props.page + 1}
          </button>
          <button
            className="text-black/[0.6] hover:text-black"
            onClick={handlePageUp}
          >
            {">"}
          </button>
        </>
      )}
    </>
  );
}

export default Pagination;
