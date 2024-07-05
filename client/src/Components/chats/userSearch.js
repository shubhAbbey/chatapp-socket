import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
function UserSearch(props) {
  return (
    <div className="search">
      <span style={{ width: "100%", position: "relative" }}>
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="searchBar"
        />
        <AiOutlineSearch
          style={{
            position: "absolute",
            height: "2.5em",
            width: "1.5em",
            color: "rgb(114, 105, 105)",
            left: "10%",
            top: "6%"
          }}
        />
      </span>
    </div>
  );
}

export default UserSearch;
