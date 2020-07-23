import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import DrawBoard from './components/draw-board';
import Room from './components/chat-room/room';
import './styles/App.scss';

function App() {
  return (
    <Container className="app" fluid>
      <Row className="inherit">
        <Col xs={12} sm={9}>
          <DrawBoard />
        </Col>
        <Col xs={12} sm={3}>
          <Room />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
