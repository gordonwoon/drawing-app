import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { initiateSocket, disconnectSocket } from 'utilities/socket';

import Lobby from 'pages/lobby/lobby';
import Room from 'pages/room/room';
import 'styles/app.scss';

function App() {
  useEffect(() => {
    initiateSocket();
    return () => {
      disconnectSocket();
    }
  }, []);
  return (
    <Router>
      <Container className="app" fluid>
        <Switch>
          <Route path="/lobby" component={Lobby} />
          <Route path="/room/:id" component={Room} />
          <Redirect from="/" exact to="/lobby" />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
