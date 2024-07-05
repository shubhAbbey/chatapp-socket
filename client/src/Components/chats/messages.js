import React, { useState, useEffect, useRef } from "react";
import { BsCheck, BsCheckAll, BsClock } from "react-icons/bs";

function Messages({ data, decodedToken }) {
  const scrollRef = useRef();
  
  useEffect(() => {
    if (scrollRef) {
      if (scrollRef) {
        scrollRef.current.addEventListener("DOMNodeInserted", (event) => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight });
        });
      }
    }
  }, []);
  return (
    <div ref={scrollRef} style={{ overflow: "auto", height: "71.8%" }}>
      {/* <ScrollToBottom> */}

      {data?.map((i, k) => {
        let date = new Date(i.createdAt);
        let hours = date.getHours().toString().padStart(2, "0");
        let minutes = date.getMinutes().toString().padStart(2, "0");
        if (decodedToken.mobile === i.users.from) {
          return (
            <div style={{display:"flex", marginRight:"35px"}}>
            <div
              key={k}
              className="chat_bubble_right"
              style={{
                backgroundColor: "transparent",
                boxShadow: "rgb(143 249 229) -1px 0px 20px 11px inset, 0px 0px 2px 1px #eee",
                position: "relative",
                width: "fit-content",
                padding: "10px",
                marginTop: k === 0 ? "30px" : "",
                marginBottom: "10px",
                marginLeft: "auto",
                color: "rgb(114, 105, 105)",
                fontSize: "20px",
                borderRadius: "10px",
              }}
            >
              {i.message}
              <span style={{ fontSize: "12px", marginLeft: "35px" }}>
                {hours}:{minutes}
              </span>
            </div>
            <span style={{height:"fit-content", marginTop: k === 0 ? "30px" : ""}}>
            {/* <BsCheckAll size={20} style={{color:"grey"}}/> */}
            <BsCheckAll size={20} style={{color:"#25d9b8"}}/>
            {/* <BsCheck size={20} style={{color:"grey"}}/> */}
            {/* <BsClock size={12} style={{ color: "grey", marginLeft: "5px", marginBottom: "100%"}}/> */}
            </span>
            </div>
          );
        }
        if (decodedToken.mobile === i.users.to[0]) {
          return (
            <div
              key={k}
              className="chat_bubble_left"
              style={{
                backgroundColor: "transparent",
                boxShadow: "rgb(230 254 249) -1px 0px 20px 11px inset, 0px 0px 2px 1px #eee",
                width: "fit-content",
                padding: "10px",
                marginBottom: "10px",
                position: "relative",
                marginTop: k === 0 ? "30px" : "",
                color: "rgb(114, 105, 105)",
                marginLeft: "40px",
                fontSize: "20px",
                borderRadius: "10px",
              }}
            >
              {i.message}
              <span style={{ fontSize: "12px", marginLeft: "35px" }}>
                {hours}:{minutes}
              </span>
            </div>
          );
        }
      })}
      {/* </ScrollToBottom> */}
    </div>
  );
}

export default Messages;
