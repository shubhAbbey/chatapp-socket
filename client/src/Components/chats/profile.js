import React, {useState} from "react";
import { FaRegUserCircle } from "react-icons/fa";
import UploadProfile from "./uploadProfile"
import { GrGroup } from "react-icons/gr"
function Profile({ decodedToken, modal, setModal }) {
  return (
    <div className="profile">
      {decodedToken && decodedToken.profile_pic ? (
        <img
          src={decodedToken.profile_pic}
          className="main_profile"
          alt="profile"
          onClick={() => setModal(true)}
        />
      ) : (
        <FaRegUserCircle
          size={50}
          style={{ padding: "10px", color: "rgb(154 163 160)" }}
          onClick={() => setModal(true)}
        />
      )}
      {/* <span className="addGroup">< GrGroup color="rgb(154, 163, 160)" size = {30}/></span> */}
    </div>
  );
}

export default Profile;
