import React from "react";

function Selection(props) {
  return (
    <div className="flex max-md:mx-auto max-md:flex-col max-md:space-y-4 md:justify-between md:space-x-4 lg:space-x-6 ">
      <select
        onChange={props.handleOrderChange}
        disabled={props.searchGame}
        className="rounded-md px-2 py-2.5 md:px-6"
      >
        <option value="none">Order by: Rating</option>
        <option value="order-asc">Rating ASC</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
      <select
        className="rounded-md xl:hidden px-2 py-2.5 md:px-6"
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
