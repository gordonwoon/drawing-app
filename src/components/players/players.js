import React, { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';

import Player from './player';

import { sendEvent, subscribeToEvent, getSocket } from 'utilities/socket';

export const Players = () => {
  const [players, setPlayers] = useState([]);
  const [isHost, setHost] = useState(false);

  const handleStartGame = () => {
    sendEvent('start-game');
  }

  useEffect(() => {
    subscribeToEvent('update-players', data => {
      setPlayers(() => data);
      const host = data.find(player => player.host);
      if (host.id === getSocket().id) {
        setHost(() => true);
      }
    });
    sendEvent('update-players');
  }, []);
  return (
    <div className="players-list">
      <CardGroup>
        {players.map(player => <Player key={player.id} player={player} />)}
      </CardGroup>
      {isHost && <button onClick={handleStartGame}>Start Game</button>}
    </div>
  )
}

export default Players;
