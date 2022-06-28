import React from 'react'
import io  from "socket.io-client";
import "./ChatBox.css"
import Chat from './Chat';

const socket=io("http://localhost:8001/")
function ChatBox() {
  return (
    <div className='chat_comp'>
    <Chat socket={socket}/>
  </div>
  )
}

export default ChatBox