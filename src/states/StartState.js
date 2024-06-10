import BaseState from "../main/BaseState.js";

import Entity from "../main/Entity.js";
import {canvas} from "../../index.js";
import Pipes from "../sprites/Pipes.js";
import Player from "../sprites/Player.js";
import {resource} from "../main/Resource.js";

export default class StartState extends BaseState {
  constructor(props) {
    super(props);

    this.grid = [];
    this.gap = Math.floor(Math.random() * 6);
    this.generatePipes();

    this.player = new Player({
      image: "player",
      id: "Player",
      x: 50,
      y: canvas.height / 2,
      width: 50,
      height: 50,
    });

    this.timer = 0;

    console.log(this.grid);
  }

  generatePipes() {
    const index = canvas.width;
    const cellSize = 64;
    const ran = Math.floor(Math.random() * 5);

    for (let y = 0; y < canvas?.height / cellSize; y++) {
      if (y === ran || y === ran + 1) {
      } else {
        this.grid.push(
          new Pipes({
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

  drawPipes(ctx) {
    this.grid.forEach((pipe) => {
      pipe.draw(ctx);
    });
  }

  updatePipes(dt) {
    this.timer += dt;
    if (this.timer > 6) {
      //   console.log(this.timer);
      this.generatePipes();
      this.timer = 0;
    }

    for (let i = this.grid.length - 1; i >= 0; i--) {
      const pipe = this.grid[i];

      this.player.collides(pipe);
      if (pipe.x + pipe.width < -160) {
        // Remove the element at index i

        this.grid.splice(i, 1);
        // console.log(this.grid);
      } else {
        pipe.x -= 50 * dt;
      }
    }
  }

  enter(params) {}
  update(dt) {
    this.updatePipes(dt);
    this.player.update(dt);
  }
  draw(ctx) {
    this.drawPipes(ctx);

    this.player.draw(ctx);
  }
}
