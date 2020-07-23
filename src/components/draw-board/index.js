import React, { Component, createRef } from 'react';
import { Card } from 'react-bootstrap';
import PixiBoard from './pixi-board';

export default class DrawBoard extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }
  componentDidMount(prevProps) {
    this.chart = new PixiBoard({
      ...this.props,
      ref: this.ref.current
    });
  }
  render() {
    return (
      <Card ref={this.ref} className="draw-canvas" border="secondary" />
    )
  }
}
