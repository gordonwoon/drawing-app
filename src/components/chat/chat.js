import React, { useState, useEffect } from 'react';
import { FormControl, Card } from 'react-bootstrap';

import { subscribeToEvent, sendEvent } from 'utilities/socket';

export const CardChat = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    sendEvent('chat', value);
    setMessages(oldMsg => [...oldMsg, value]);
    setValue('');
  };

  useEffect(() => {
    subscribeToEvent('chat', (err, msg) => {
      if (err) return;
      setMessages(oldMsg => [].concat(oldMsg, msg));
    });

    sendEvent('chat-history');
  }, []);

  return (
    <Card className="card-chat" border="secondary">
      <Chat messages={messages} />
      <form onSubmit={handleSubmit}>
        <FormControl value={value} onChange={e => setValue(e.target.value)} />
      </form>
    </Card>
  );
};

export default CardChat;

export const Chat = ({ messages }) => {
  return (
    <div className="chat-display">
      {messages.map((msg, i) => (
        <span key={i} className="chat-message">
          {msg}
        </span>
      ))}
    </div>
  );
};
