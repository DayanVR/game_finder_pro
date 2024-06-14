import React from "react";

function Selection(props) {
  return (
    <div className="flex max-md:mx-auto max-md:flex-col max-md:space-y-4 md:justify-between md:space-x-4 lg:space-x-6 ">
      <label className="absolute text-transparent" htmlFor="sorting">Sort by:</label>
      <select
        onChange={props.handleOrderChange}
        disabled={props.searchGame}
        className="rounded-md px-2 py-2.5 md:px-6"
        id="sorting"
      >
        <optgroup label="Rating:">
          <option value="none">DESC</option>
          <option value="order-asc">ASC</option>
        </optgroup>
        <optgroup label="Name:">
          <option value="name-asc">A to Z</option>
          <option value="name-desc">Z to A</option>
        </optgroup>
      </select>
      <select
        className="rounded-md px-2 py-2.5 md:px-6 xl:hidden"
        onChange={props.handlePlatformChange}
      >
        <option value="0">All Platforms</option>
        <option value="6">PC</option>
        <option value="1">PlayStation</option>
        <option value="2">Xbox</option>
        <option value="34">Android</option>
        <option value="39">IOS</option>
      </select>
    </div>
  );
}

export default Selection;
