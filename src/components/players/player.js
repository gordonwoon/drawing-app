import React from 'react';
import { Card } from 'react-bootstrap';

export const Player = ({ player }) => {
  return (
    <Card>
      <Card.Img variant="top" src="https://picsum.photos/200" />
      <Card.Body>
        <Card.Title>{player.username}</Card.Title>
      </Card.Body>
      {player.host &&
        <Card.Footer>
          <small className="text-muted">Host</small>
        </Card.Footer>
      }
    </Card>
  )
}

export default Player;
