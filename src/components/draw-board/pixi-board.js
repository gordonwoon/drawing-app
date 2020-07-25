import * as PIXI from 'pixi.js';

export default class PixiBoard {
  constructor(props) {
    /* PIXI.js */
    // create an new instance of a pixi stage
    this.app = new PIXI.Application({
      width: props.ref.clientWidth,
      height: props.ref.clientHeight,
      antialias: true,
      backgroundColor: 0xffffff
    });
    this.stage = this.app.stage;
    this.interaction = this.app.renderer.plugins.interaction;
    this.socket = props.socket;

    // add the renderer view element to the DOM
    props.ref.appendChild(this.app.view);

    this.defaultState();
    this.initListener();

    requestAnimationFrame(this.animate);
  }
  animate = () => {
    requestAnimationFrame(this.animate);

    // render the stage
    this.app.render(this.stage);
  };
  defaultState = () => {
    this.ppts = [];
    this.mouse = { x: 0, y: 0 };
    this.previousG = null;
  };
  initListener = () => {
    this.socket.on('draw-event', data => {
      console.log('draw-event', data);
      this.ppts = data.ppts;
      this.onPaint();
      this.ppts = [];
    });
    this.interaction.on('mousedown', this.mouseDownEvent);
    this.interaction.on('mouseup', this.mouseUpEvent);
    this.interaction.on('touchstart', this.mouseDownEvent);
    this.interaction.on('touchend', this.mouseUpEvent);
  };
  mouseDownEvent = e => {
    this.interaction.on('mousemove', this.mousePaintEvent);
    this.interaction.on('touchmove', this.mousePaintEvent);
    this.mousePaintEvent(e);
  };
  mouseUpEvent = e => {
    this.interaction.off('mousemove', this.mousePaintEvent);
    this.interaction.off('touchmove', this.mousePaintEvent);
    this.mousePaintEvent(e);
    this.previousG = null;
    // Emptying up Pencil Points
    this.ppts = [];
  };
  mousePaintEvent = e => {
    if (!e.data) return;

    this.ppts.push(this.stage.toLocal(e.data.global));
    while(this.ppts.length < 2) {
      this.ppts.push(this.ppts[this.ppts.length - 1])
    }

    if (this.previousG !== null) {
      this.stage.removeChild(this.previousG);
    }
    const g = this.onPaint();
    this.previousG = g;

    this.socket.emit('draw-event', {
      ppts: JSON.parse(JSON.stringify(this.ppts))
    });
  };
  onPaint = () => {
    var g = new PIXI.Graphics();
    g.lineStyle(4, 0x000000, 1);
    //g.drawCircle(ppts[0].x, ppts[0].y, 1);
    g.moveTo(this.ppts[0].x, this.ppts[0].y);

    let i = 1;
    while (i < this.ppts.length - 2) {
      var c = (this.ppts[i].x + this.ppts[i + 1].x) / 2;
      var d = (this.ppts[i].y + this.ppts[i + 1].y) / 2;

      g.quadraticCurveTo(this.ppts[i].x, this.ppts[i].y, c, d);
      i++;
    }

    // For the last 2 points
    g.quadraticCurveTo(
      this.ppts[i].x,
      this.ppts[i].y,
      this.ppts[this.ppts.length - 1].x,
      this.ppts[this.ppts.length - 1].y
    );

    this.stage.addChild(g);
    return g;
  };
}
