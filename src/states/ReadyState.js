import BaseState from "../main/BaseState.js";

import Entity from "../main/Entity.js";
import {canvas} from "../../index.js";

import Player from "../sprites/Player.js";
import Text from "../main/Text.js";
import {resource} from "../main/Resource.js";
import Pipes from "../sprites/Pipes.js";
import ImgNumber from "../sprites/ImgNumber.js";

export default class ReadyState extends BaseState {
  constructor(props) {
    super(props);

    this.grid = [];
    this.gap = Math.floor(Math.random() * 6);

    this.generatePipes();

    this.timerImgs = [];
    this.generateTimerImg();

    this.player = new Player({
      image: "player",
      id: "Player",
      x: 50,
      y: canvas.height / 2,
      width: 64,
      height: 32 + 16,
    });

    this.score = new Text({
      text: "Score: 0",
      x: canvas.width / 2,
      y: 30,
      styles: {
        font: "bold 26px font-2d",
        fill: "cream",
      },
    });

    this.timer = 3;
    this.counter = 0;
  }

  generatePipes() {
    const index = canvas.width;
    const cellSize = 64;
    const gap = Math.floor(Math.random() * 5);

    for (let y = 0; y < canvas?.height / cellSize; y++) {
      if (y === gap || y === gap + 1) {
      } else {
        const img = y < gap ? "pipe-top" : "pipe-bottom";
        this.grid.push(
          new Pipes({
            image: img,
            x: index,
            y: y * cellSize,
            width: cellSize,
            height: cellSize,
            speed: 50,
          })
        );
      }
    }
  }

  generateTimerImg() {
    const width = 16 * 2;
    const height = 36 * 2;
    const imgs = ["timer-1", "timer-2", "timer-3"];

    for (let i = 0; i < imgs?.length; i++) {
      this.timerImgs.push(
        new ImgNumber({
          image: imgs[i],
          x: canvas.width / 2 - width / 2,
          y: canvas.height / 2 - height / 2 - 62,
          width,
          height,
          speed: 50,
        })
      );
    }
  }

  drawTimeImg(ctx) {
    this.timerImgs?.forEach((timeImg, i) => {
      if (`timer-${this.timer}` === timeImg?.image) {
        timeImg?.draw(ctx);
      }
    });
  }

  updateTextImg(dt) {
    if (this.timer > 0) {
      this.counter += dt;

      if (this.counter > 1) {
        this.timer--;
        this.counter = 0;
      }

      if (this.timer === 0) {
        resource.gameState.change("play", {
          player: this.player,
          pipes: this.grid,
          score: this.score,
        });
      }
    }
  }

  enter(params) {
    console.log(params);
  }

  update(dt) {
    if (
      resource.keyPressed["Enter"] &&
      resource.gameState.stateName === "ready"
    ) {
      resource.gameState.change("play", {
        player: this.player,
        pipes: this.grid,
        score: this.score,
      });
    }

    this.updateTextImg(dt);
  }

  draw(ctx) {
    this.drawTimeImg(ctx);

    this.player.x = canvas.width / 2 - this.player.width / 2;
    // this.player.y = this.player.y + 10;
    this.player.draw(ctx);
  }
}
