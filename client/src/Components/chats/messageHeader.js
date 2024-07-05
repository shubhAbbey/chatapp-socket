import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
function MessageHeader({ selectedUser }) {
  return (
    <div
      style={{
        backgroundColor: "rgb(203, 243, 235)",
        boxShadow: "1px 1px 3px 1px rgb(194 208 205)",
      }}
    >
      <div style={{ padding: "10px" }}>
        <span style={{ verticalAlign: "middle" }}>
          {/* <GoPrimitiveDot size={25} style={{color:"#25d9b8"}}/> */}
          {selectedUser.profile_pic ? (
            <img
              src={selectedUser.profile_pic}
              className="profile_pic"
              alt=""
            />
          ) : (
            <FaRegUserCircle size={64} color="rgb(154 163 160)" />
          )}
        </span>
        <span
          style={{
            color: "#726969",
            fontSize: "35px",
            marginLeft: "15px",
          }}
        >
          {selectedUser.userName}
        </span>
      </div>
    </div>
  );
}

export default MessageHeader;
