import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import DrawBoard from 'components/draw-board/draw-board';
import Players from 'components/players/players';
import CardChat from 'components/chat/chat';

import { subscribeToEvent, sendEvent } from 'utilities/socket';

const Room = ({ socket, match }) => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    sendEvent('join', match.params.id);
    subscribeToEvent('start-game', () => {
      setStart(() => true);
    });
  }, []);

  return (
    <Row className="room">
      <Col sm={8} xs={12}>
        {start ? <DrawBoard /> : <Players />}
      </Col>
      <Col sm={4} xs={12}>
        <CardChat />
      </Col>
    </Row>
  );
};

export default Room;
