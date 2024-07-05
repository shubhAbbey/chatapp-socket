import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import axios from "../axiosConfig"
import { MdModeEdit } from "react-icons/md"
import { TiTick } from "react-icons/ti"
function UploadProfile({ modal, setModal }) {
  const [file, setFile] = useState({})
  const [display_name, setDisplayName] = useState("")
  const [about, setAbout] = useState("")
  const [edit, setEdit] = useState({
    about:false,
    display_name:false
  })
  const getProfilePic = (e) => {
    setFile({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    })
  };
  const updateProfile = () => {
    let obj = {
      display_name,
      about,
      profile_pic:file.raw
    }
    axios.post("/users/updateUserProfile",obj).then(res=>{
      console.log(res)
    })
    .then(err=>{
      console.log(err)
    })
  }
  // useEffect(()=>{
  //   updateProfile()
  // },[display_name])
  return (
    <div className={modal ? "modal" : "noModal"}>
      <div className="profileHeader">
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "4%",
            display: "flex",
          }}
        >
          <BiArrowBack
            color="rgb(114, 105, 105)"
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => setModal(false)}
          />
          <span style={{ color: "rgb(114, 105, 105)", fontSize: "22px" }}>
            Profile
          </span>
        </div>
      </div>
      <div style={{overflow:"auto", height:"75%"}}>
      <label
        className="custom-file-input"
      >
        <input type="file" onChange={(e) => getProfilePic(e)} />
        {
          file.preview ? 
          <img src = {file.preview} className="profileImage"/>
          : <FaRegUserCircle
          color="#25d9b8"
          className="profileImage"
        />
        }
      </label>
      <div className="desc_back">
          <div className="heading">
                Your Name
          </div>
          <input type = "text" className="input" onChange={(e)=>setDisplayName(e.target.value)}/>
      </div>
      <div style={{padding: "20px", color: "gray"}}>
          This is not a user name or pin. This will be visible to your contacts only.
      </div>
      <div className="desc_back">
          <div className="heading">
                About
          </div>
          <input type = "text" className="input" onClick = {(e)=>setAbout(e.target.value)}/>
      </div>
      </div>
    </div>
  );
}

export default UploadProfile;
