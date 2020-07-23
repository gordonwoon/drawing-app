import * as PIXI from 'pixi.js';

export default class PixiBoard {
  constructor(props) {
    /* PIXI.js */
    // create an new instance of a pixi stage
    this.app = new PIXI.Application({ width: props.ref.clientWidth, height: props.ref.clientHeight, antialias: true, backgroundColor: 0xffffff });
    this.stage = this.app.stage;

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
  }
  defaultState = () => {
    this.ppts = [];
    this.mouse = { x: 0, y: 0 };
    this.previousG = null;
  }
  initListener = () => {
    window.addEventListener(
      'mousemove',
      e => {
        this.mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        this.mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
      },
      false
    );
    window.addEventListener(
      'mousedown',
      e => {
        window.addEventListener('mousemove', this.onPaint, false);

        this.mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        this.mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

        this.ppts.push({ x: this.mouse.x, y: this.mouse.y });

        this.onPaint();
      },
      false
    );
    window.addEventListener(
      'mouseup',
      () => {
        window.removeEventListener('mousemove', this.onPaint, false);
        this.onPaint();
        this.previousG = null;
        // Emptying up Pencil Points
        this.ppts = [];
      },
      false
    );
    /* touch evts */
    window.addEventListener(
      'touchmove',
      e => {
        e.preventDefault();
        this.mouse.x = e.changedTouches[0].pageX;
        this.mouse.y = e.changedTouches[0].pageY;
      },
      false
    );
    window.addEventListener(
      'touchstart',
      e => {
        e.preventDefault();
        this.mouse.x = e.changedTouches[0].pageX;
        this.mouse.y = e.changedTouches[0].pageY;
        window.addEventListener('touchmove', this.onPaint, false);
      },
      false
    );
    window.addEventListener(
      'touchend',
      () => {
        window.removeEventListener('touchmove', this.onPaint, false);
        this.onPaint();
        this.previousG = null;
        // Emptying up Pencil Points
        this.ppts = [];
      },
      false
    );
  }
  onPaint = () => {
    if (this.previousG !== null) {
      this.stage.removeChild(this.previousG);
    }
    this.ppts.push({ x: this.mouse.x, y: this.mouse.y });

    var g = new PIXI.Graphics();
    g.lineStyle(4, 0x000000, 1);
    //g.drawCircle(ppts[0].x, ppts[0].y, 1);
    g.moveTo(this.ppts[0].x, this.ppts[0].y);

    let i = 1;
    while(i < this.ppts.length - 2) {
      var c = (this.ppts[i].x + this.ppts[i + 1].x) / 2;
      var d = (this.ppts[i].y + this.ppts[i + 1].y) / 2;

      g.quadraticCurveTo(this.ppts[i].x, this.ppts[i].y, c, d);
      i++;
    }

    // For the last 2 points
    g.quadraticCurveTo(this.ppts[i].x, this.ppts[i].y, this.ppts[this.ppts.length - 1].x, this.ppts[this.ppts.length - 1].y);

    this.stage.addChild(g);
    this.previousG = g;
  };
}

//draw a line
//var g = new PIXI.Graphics();
//g.lineStyle(5, 0xFFFFFF, 0.6);
//g.moveTo(0,0);
//g.lineTo(100,100);
//stage.addChild(g);
//draw a circle
// var c = new PIXI.Graphics();
// c.lineStyle(5, 0xffffff, 1);
//c.beginFill(0xFFFFFF, 1)
//c.endFill();


