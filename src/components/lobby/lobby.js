import React, { useState, useEffect } from 'react';
import { withSocketConsumer } from '../../context/socket-context';

export const Lobby = ({ socket }) => {
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    socket.emit('set-nickname', name);
  }, [name])
  useEffect(() => {
    socket.emit('enter-lobby');
    socket.on('enter-lobby' , players => {
      console.log('players', players);
      setPlayers(players);
    })
  }, [])
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      {players.forEach((player, i) => <p key={i}>{player}</p>)}
    </div>
  )
}

export default withSocketConsumer(Lobby)
