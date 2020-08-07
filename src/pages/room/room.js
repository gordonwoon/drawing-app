import React from 'react';
import { Row, Col } from 'react-bootstrap';

import DrawBoard from 'components/draw-board/draw-board';
import CardChat from 'components/chat/chat';

const Room = ({ socket }) => {
  return (
    <div className="room">
      <Row>
        <Col sm={8} xs={12}>
          <DrawBoard />
        </Col>
        <Col sm={4} xs={12}>
          <CardChat />
        </Col>
      </Row>
    </div>
  );
};

export default Room;
