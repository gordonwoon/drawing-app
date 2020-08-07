import React, { useState, useEffect } from 'react';
import { FormControl, Card } from 'react-bootstrap';

import { subscribeToEvent, sendEvent } from 'utilities/socket';

export const CardChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    sendEvent('chat', message);
    setMessages(oldMsg => [...oldMsg, { sender: 'Me', message }]);
    setMessage('');
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
        <FormControl value={message} onChange={e => setMessage(e.target.value)} />
      </form>
    </Card>
  );
};

export default CardChat;

export const Chat = ({ messages }) => {
  return (
    <div className="chat-display scroller">
      {messages.map((msg, i) => (
        <div key={i} className="chat-message">
          {`${msg.sender}: ${msg.message}`}
        </div>
      ))}
      <div className="anchor" />
    </div>
  );
};
