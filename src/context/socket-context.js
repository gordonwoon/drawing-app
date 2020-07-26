import React, { createContext, useEffect } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

const socket = io('http://localhost:5000');

export const withSocketProvider = WrappedComponent => props => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to socket');
    });
    return () => {
      socket.on('disconnect', () => {
        console.log('disconnect from socket');
      });
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      <WrappedComponent {...props} />
    </SocketContext.Provider>
  );
};

export const withSocketConsumer = WrappedComponent => props => {
  return (
    <SocketContext.Consumer>
      {socket => <WrappedComponent socket={socket} {...props} />}
    </SocketContext.Consumer>
  );
};
