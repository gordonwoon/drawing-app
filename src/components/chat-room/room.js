import React, { useState, useEffect } from 'react';
import { FormControl, Card } from 'react-bootstrap';

import { withSocketConsumer } from '../../context/socket-context';
import Display from './display';

const Room = ({ socket }) => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const handleSubmit = e => {
    e.preventDefault();
    socket.send(value);
    setMessages([].concat(messages, value));
    setValue('');
  };
  useEffect(() => {
    console.log(socket.rooms);
    socket.on('message', msg => {
      setMessages(messages.concat(msg));
    });
  }, [messages, socket]);
  return (
    <Card className="chat-room" border="secondary">
      <Display messages={messages} />
      <form onSubmit={handleSubmit}>
        <FormControl value={value} onChange={e => setValue(e.target.value)} />
      </form>
    </Card>
  );
};

export default withSocketConsumer(Room);
