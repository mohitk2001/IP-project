import React, { useState, useEffect } from 'react'
import './Chat.css'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ScrollToBottom from 'react-scroll-to-bottom'
function Chat({ socket }) {
  let [params] = useSearchParams()

  const [message, setmessageList] = useState([])
  const [Text, setText] = useState('')
  let navigate = useNavigate()

  useEffect(() => {
    socket.emit(
      'join-room',
      params.get('name'),
      params.get('room'),
      (error) => {
        if (error) {
          alert(error)
          navigate('/')
        }
      }
    )
  }, [])
  useEffect(() => {
    socket.on('user-joined', (data) => {
      console.log(data)
      setmessageList([...message, data])
    })
    socket.on('Welcome', (data) => {
      console.log(data)
      setmessageList([...message, data])
    })
    socket.on('left', (data) => {
      console.log(data)
      setmessageList([...message, data])
    })
    // socket.on("specificRoomData", (data) => {
    // console.log(data);
    //   setonlineUser(data.usersList);
    // });

    socket.on('receiveMsg', (data) => {
      console.log(data)
      setmessageList([...message, data])

    })
    return () => {
      socket.off()
    }
  }, [message])

  const sendMessage = () => {
    console.log(message);

    socket.emit('sendMessage', { sentMessage: Text })
    setmessageList([...message, { Text: Text, id: 'Me' }])

    setText('')
  }
  return (
    <div className="chat">
      <div className="chat_box">
        <div className="chat_box_header">
          <img
            src="https://png.pngtree.com/element_our/png_detail/20181229/vector-chat-icon-png_302635.jpg"
            alt=""
          />
          <div className="header_text">
          <h2>Meditation Chat Room</h2>
          <a href='/' className='exit_button'>X</a>
          </div>
        </div>
        <ScrollToBottom className="chat_msg_box">
        <div className="box_message_container">
            
            {message.map((msg, index) => {
              if(msg.id){
                return (
                  <div className="msg_right" key={index}>
                  <p>{msg.Text}</p>
                  </div>
                )
              }
              else
              return (
                <div className="msg_left" key={index}>
                <p>{msg.Text}</p>
                {!msg.User?"":<h5 className="user_name">~ {msg.User.name}</h5>}
                </div>
              )
            })}
         
         
        </div>
        </ScrollToBottom>
        <div className="chat_input">
          <input
            type="text"
            placeholder="Enter your text"
            onChange={(e) => setText(e.target.value)}
            value={Text}
            onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : '')}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat
