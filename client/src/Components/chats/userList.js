import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

function UserList({ users, setSelectedUserData }) {
  const [activeSelectedUser, setActiveSelectedUser] = useState("");
  const setSelected = (item, index) => {
    setSelectedUserData(item);
    setActiveSelectedUser(index);
  };
  return (
    <ul className="userList">
      {users.map((item, index) => {
        return (
          <li
            key={index}
            style={{
              backgroundColor:
                activeSelectedUser === index ? "rgb(203 243 235)" : "",
            }}
            onClick={(e) => setSelected(item, index)}
          >
              {
                  item.profile_pic ? 
                  <img src = {item.profile_pic} className="profile_pic" alt=""/> 
                  : <FaRegUserCircle size={60} color="rgb(154 163 160)"/>
              }
            <span style={{ height: "100%", marginLeft:"10px" }}>
              <div>{item.userName}</div>
              <div style={{ overflow: "hidden", fontSize: "17px", marginTop: "10px"}}>This is the last Message...</div>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default UserList;
