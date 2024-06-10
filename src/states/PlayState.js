import BaseState from "../main/BaseState.js";

import Entity from "../main/Entity.js";
import {canvas} from "../../index.js";
Pipes;
import Player from "../sprites/Player.js";
import ImgNumber from "../sprites/ImgNumber.js";
import Text from "../main/Text.js";
import Pipes from "../sprites/Pipes.js";

export default class PlayState extends BaseState {
  constructor(props) {
    super(props);

    this.grid = [];

    this.gameSpeed = 100;
    this.pipeCounter = 0;

    this.timer = 0;
  }

  enter(params) {
    this.player = params?.player;
    this.pipes = params?.pipes;
    this.score = params?.score;

    this.grid.push(...this.pipes);
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
            speed: this.gameSpeed,
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
    if (this.timer > 3) {
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
        pipe.velocity.x = -this.gameSpeed;
        pipe.update(dt);
      }
    }
  }

  update(dt) {
    this.updatePipes(dt);
    // console.log()
    this.player.update(dt);

    this.score.text = `Score: ${this.player.score}`;

    this.pipeCounter += dt;

    if (this.pipeCounter > 20) {
      this.gameSpeed += 0;
      this.pipeCounter = 0;
    }
  }

  draw(ctx) {
    this.drawPipes(ctx);

    this.player.draw(ctx);

    this.score.draw(ctx);
  }
}
