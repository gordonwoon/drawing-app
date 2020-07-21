import React from 'react';
import logo from './logo.svg';
import './App.css';
import DrawBoard from './components/draw-board';
import Room from './components/chat-room/room';

function App() {
  return (
    <div className="App">
      <Room />
      <DrawBoard />
    </div>
  );
}

export default App;
