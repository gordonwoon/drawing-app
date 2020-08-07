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
    subscribeToEvent('chat', msg => {
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
  const renderMsg = message => {
    if (message.hasOwnProperty('sender')) {
      return `${message.sender}: ${message.message}`;
    } else {
      return message;
    }
  }
  return (
    <div className="chat-display scroller">
      {messages.map((message, index) => (
        <div key={index} className="chat-message">
          {renderMsg(message)}
        </div>
      ))}
      <div className="anchor" />
    </div>
  );
};
