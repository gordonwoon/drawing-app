import React, { createContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const withSocketProvider = WrappedComponent => props => {
  const socket = useRef(io('http://localhost:5000')).current;
  console.log('socket', socket);
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
