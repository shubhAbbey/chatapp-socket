import React, { useEffect, useState } from "react";
import "./chat.css";
import axios from "axios";
import jwt from "jwt-decode";
import { BsMic } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import io from "socket.io-client";
import Messages from "./messages";
import MessageHeader from "./messageHeader";
import UserList from "./userList";
import UserSearch from "./userSearch";
import Profile from "./profile";
import TypeMessage from "./typeMessage";
import UploadProfile from "./uploadProfile";

function Chat(props) {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [decodedToken, setDecodedToken] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});
  const [message, setMessage] = useState(null);
  const [flag, setFlag] = useState(false);
  const [messageData, setMessageData] = useState({});
  const [modal, setModal] = useState(false);
  let ENDPOINT = "http://localhost:5000";
  let socketIo = io(ENDPOINT);
  useEffect(() => {
    let token = localStorage.getItem("Authorization");
    if (token) {
      let decoded = jwt(token);
      setDecodedToken(decoded);
      axios
        .get(`http://localhost:5000/api/users/getAllUsers/${decoded.mobile}`)
        .then((res) => {
          setUsers(res.data.users);
          setMobile(decoded.mobile);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, []);

  useEffect(() => {
    // let socketIo = io(ENDPOINT)
    socketIo.on("messages", (message) => {
      setData([...data, message]);
    });
  }, [data]);

  useEffect(() => {
    if (messageData.message) {
      // let socketIo = io(ENDPOINT)
      socketIo.emit("message", { message: messageData }, () => setMessage(""));
      setFlag(false);
    }
  }, [messageData]);

  async function getUserBasedChats(item) {
    return axios
      .get(
        `http://localhost:5000/api/messages/getUserBasedChats/${decodedToken.mobile}/${item.mobile}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      )
      .then((res) => {
        // alert(JSON.stringify(res.data))
        return res.data;
      })
      .catch((err) => alert(err.message));
  }
  const setSelectedUserData = async (item) => {
    setSelectedUser(item);
    let response = await getUserBasedChats(item);
    // alert(JSON.stringify(response))
    setData(response || []);
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    let obj = {
      mobile,
      message,
      users: { from: mobile, to: [selectedUser.mobile] },
      createdAt: Date.now(),
    };
    setMessageData(obj);
    if (message) {
      axios
        .post(`http://localhost:5000/api/messages/createChats`, obj, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        })
        .then(async (res) => {
          // let response = await getUserBasedChats(selectedUser);
          setMessage("");
          // setData(response);
          setMessageData(obj);
          setFlag(true);
        })
        .catch((err) => alert(err.message));
    }
  };
  return (
    <div className="notice-board">
      <h1>Chat UP</h1>
      <div style={{ display: "flex" }}>
        {/* {modal ? ( */}
          <UploadProfile setModal={(e) => setModal(e)} modal={modal} />
        {/* ) : null} */}
        <div style={{ width: "30%" }}>
          <Profile
            decodedToken={decodedToken}
            modal={modal}
            setModal={setModal}
          />
          <UserSearch />
          <UserList
            users={users}
            setSelectedUserData={(e) => setSelectedUserData(e)}
          />
        </div>
        {selectedUser.userName ? (
          <div
            style={{
              width: "800px",
              height: "38.75em",
              backgroundColor: "white",
              position: "relative",
            }}
          >
            <MessageHeader selectedUser={selectedUser} />
            <Messages data={data} decodedToken={decodedToken} />
            <TypeMessage
              message={message}
              sendMessage={(e) => sendMessage(e)}
              setMessage={(e) => setMessage(e)}
            />
            {/* <div style={{ position: "absolute", top: "89.8%", width: "100%" }}>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                className="typeMessage"
                placeholder="Type a Message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyPress={(e)=>e.key === "Enter" ? sendMessage(e) : null}
              />
              <button className="send" onClick={(e) => sendMessage(e)}>
                {!message ? <BsMic size={30} /> : <AiOutlineSend size={30} />}
              </button>
            </div>
          </div> */}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Chat;
