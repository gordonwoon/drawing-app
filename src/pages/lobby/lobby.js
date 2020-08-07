import React, { useState } from 'react';

import { sendEvent } from 'utilities/socket';

export const Lobby = ({ history }) => {
  const rooms = ['A', 'B', 'C'];
  const [name, setName] = useState('');

  const handleSetName = name => {
    sendEvent('set-name', name);
    setName(name);
  }

  const handleJoinRoom = room => {
    history.push(`/room/${room}`);
  }
  return (
    <div className="d-flex justify-content-center">
      <input value={name} onChange={e => handleSetName(e.target.value)} />
      {rooms.map((room, i) => <button disabled={!name} onClick={() => handleJoinRoom(room)} key={i}>{room}</button>)}
    </div>
  )
}

export default Lobby
