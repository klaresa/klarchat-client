import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import io from "socket.io-client";

// import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';


const ENDPOINT = 'https://klarchat.herokuapp.com/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const {name, room} = queryString.parse(location.search);

    // to avoid cors error must pass this setting object
    socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});

    setRoom(room);
    setName(name);

    // event - pass on data - trigger a callback after the event is emitted
    socket.emit('join', {name, room}, () => {
    });

    // this is used for unmounting so it ends the socket instance
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // function for sending messages
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage('')); // cb just clears the value
    }
  }

  console.log(message, messages)

  return (
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room}/>
          <Messages name={name} messages={messages}/>
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
        </div>
      </div>
  );
}

export default Chat;
