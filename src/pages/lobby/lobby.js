import React, { useState } from 'react';

import { sendEvent } from 'utilities/socket';

export const Lobby = ({ history}) => {
  const rooms = ['A', 'B', 'C'];
  const [name, setName] = useState('');

  const handleSetName = name => {
    sendEvent('name', name);
    setName(name);
  }

  const handleJoinRoom = room => {
    sendEvent('room', room);
    history.push('/room');
  }
  return (
    <div>
      <input value={name} onChange={e => handleSetName(e.target.value)} />
      {rooms.map((room, i) => <button onClick={() => handleJoinRoom(room)} key={i}>{room}</button>)}
    </div>
  )
}

export default Lobby
