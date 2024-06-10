import BaseState from "../main/BaseState.js";

import Entity from "../main/Entity.js";
import {canvas} from "../../index.js";
import Pipes from "../states/Pipes.js";
import Player from "../states/Player.js";
import Text from "../main/Text.js";
import {resource} from "../main/Resource.js";

export default class ServeState extends BaseState {
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

    this.text = [];
    this.generateText();

    this.timer = 0;
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

  generateText() {
    this.titleText2 = "20";
    this.titleText = "Birdy";
    this.subtitleText = "Tap To Start";
    this.scoreText = "Ready!!";

    this.text.push(
      new Text({
        text: this.titleText2,
        x: canvas.width / 2,
        y: canvas.height / 2 - 110,
        styles: {
          font: "bold 64px font-2d",
          fill: "tomato",
          stroke: "#262627",
          lineWidth: 0.2,
        },
      }),
      new Text({
        text: this.titleText,
        x: canvas.width / 2,
        y: canvas.height / 2 - 60,
        styles: {
          font: "bold 80px font-2d",
          fill: "tomato",
          stroke: "black",
          lineWidth: 0.2,
        },
      }),
      new Text({
        text: this.subtitleText,
        x: canvas.width / 2,
        y: canvas.height / 2 - 15,
        styles: {
          font: "bold 26px font-2d",
          fill: "#fff",
        },
      })

      // new Text({
      //   text: this.scoreText,
      //   x: canvas.width / 2,
      //   y: canvas.height / 2 + 30,
      //   styles: {
      //     font: "bold 56px font-2d",
      //     fill: "orange",
      //     stroke: "gray",
      //     lineWidth: 0.3,
      //   },
      // })
    );
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
      if (pipe.x + pipe.width < -160) {
        // Remove the element at index i

        this.grid.splice(i, 1);
        // console.log(this.grid);
      } else {
        pipe.x -= 50 * dt;
      }
    }
  }

  updateText(dt) {
    this.text.forEach((text) => {
      // console.log(text);
      text.update(dt);
    });
  }

  enter(params) {}
  update(dt) {
    // console.log(resource.gameState.stateName);

    if (resource.keyPressed[" "] && resource.gameState.stateName === "serve") {
      resource.gameState.change("play", {
        player: this.player,
        pipes: this.grid,
        score: this.score,
      });
    }

    this.updateText(dt);
    // this.updatePipes(dt);
  }
  draw(ctx) {
    this.text.forEach((text) => {
      text.draw(ctx);
    });

    // this.score.draw(ctx);

    // this.drawPipes(ctx);

    this.player.x = canvas.width / 2 - this.player.width / 2;
    // this.player.y = this.player.y + 10;
    this.player.draw(ctx);
  }
}
