import React, { useState, useEffect } from 'react';
import { FormControl, Card } from 'react-bootstrap';
import io from 'socket.io-client';

import Display from './display';

const socket = io('http://localhost:5000');

const Room = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([])
  const handleSubmit = e => {
    e.preventDefault();
    socket.send(value);
    setValue('');
  }
  useEffect(() => {
    socket.on('connect', () => {
      socket.send('User has connected!');
    })
    socket.on('message', msg => {
      setMessages(messages.concat(msg))
    })
  }, [messages])
  return (
    <Card className="chat-room" border="secondary">
      <Display messages={messages} />
      <form onSubmit={handleSubmit}>
        <FormControl value={value} onChange={e => setValue(e.target.value)} />
      </form>
    </Card>
  )
}

export default Room;
