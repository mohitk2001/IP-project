import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./WelcomeChat.css"
function WelcomeChat() {
  const [name, setName] = useState("");
  
 
  return (
    <div className="join_chat">
      <div className="join_chat_container">
        <h1>Welcome to meditation chat room</h1>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
       
        <Link
          onClick={(e) => (!name? e.preventDefault() : null)}
          to={`/welcome-chat/chatroom?name=${name}&room=meditation`}
        >
          <button className="btn-join">JOIN</button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomeChat;