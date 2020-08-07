import io from 'socket.io-client';
let socket;

export const initiateSocket = () => {
  socket = io('http://localhost:5000');
  global.socket = socket;
};

export const disconnectSocket = () => {
  if (!socket) return;
  console.log('Disconnecting socket...');
  socket.disconnect();
};

export const subscribeToEvent = (event, callback, tries = 5) => {
  if (!socket && tries > 0) return setTimeout(subscribeToEvent, 50, event, callback, tries-1);
  if (!socket) return;

  console.log('subscribe', event);

  socket.on(event, msg => {
    console.log('callback received', msg);
    return callback(msg);
  });
}

export const sendEvent = (event, data, tries = 5) => {
  if (!socket && tries > 0) return setTimeout(sendEvent, 50, event, data, tries-1);
  if (!socket) return;
  socket.emit(event, data);
}

export const getSocket = () => {
  return socket;
}
