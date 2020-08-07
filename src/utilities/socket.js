import io from 'socket.io-client';
let socket;

export const initiateSocket = () => {
  socket = io('http://localhost:5000');
};

export const disconnectSocket = () => {
  if (!socket) return;
  console.log('Disconnecting socket...');
  socket.disconnect();
};

export const subscribeToEvent = (event, callback) => {
  console.log('subscribe', event);
  if (!socket) return;
  socket.on(event, msg => {
    console.log('callback received', msg);
    return callback(null, msg);
  });
}

export const sendEvent = (event, data) => {
  if (!socket) return;
  socket.emit(event, data);
}
