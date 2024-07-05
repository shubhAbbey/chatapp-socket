import React from "react";
import { AiOutlineSearch, AiOutlineSend } from "react-icons/ai";
import { BsMic } from "react-icons/bs";
function TypeMessage({message, sendMessage, setMessage}) {
  return (
    <div className="messageBorder">
      <span style={{ width: "100%" }}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          className="messageType"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={(e)=>e.key === "Enter" ? sendMessage(e) : null}
        />
        <button className="send" onClick={(e) => sendMessage(e)}>
        {!message ? <BsMic size={30} /> : <AiOutlineSend size={30} />}
        </button>
        {/* <AiOutlineSearch
          style={{
            position: "absolute",
            height: "2.5em",
            width: "1.5em",
            color: "rgb(114, 105, 105)",
            left: "10%",
            top: "6%"
          }}
        /> */}
      </span>
    </div>
  );
}

export default TypeMessage;
