import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Room = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState(['test', 'test2'])
  const handleSubmit = e => {
    e.preventDefault();
    console.log('e', e);
  }
  useEffect(() => {
    socket.on('connect', () => {
      socket.send('User has connected!');
    })
    socket.on('message', msg => {
      setMessages(messages.concat(msg))
    })
  }, [messages])
  console.log('messages', messages);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={e => setValue(e.target.value)} />
      </form>
      {messages.map((msg, i) => <p key={i}>{msg}</p>)}
    </div>
  )
}

export default Room;
