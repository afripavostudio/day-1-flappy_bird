import BaseState from "../main/BaseState.js";

import Entity from "../main/Entity.js";
import {canvas, soundEffects} from "../../index.js";
import Pipes from "../sprites/Pipes.js";
import Player from "../sprites/Player.js";
import Text from "../main/Text.js";
import {resource} from "../main/Resource.js";

export default class GameOverState extends BaseState {
  constructor(props) {
    super(props);

    this.text = [];

    this.timer = 0;
  }

  enter(params) {
    this.player = params?.player;

    this.generateText(this.player);

    soundEffects.play("death");
  }

  generateText(player) {
    this.titleText = "Game";
    this.titleText2 = "Over!!";
    this.subtitleText = "score";
    this.scoreText = this.player?.score || "0";

    this.text.push(
      new Text({
        text: this.titleText,
        x: canvas.width / 2,
        y: canvas.height / 2 - 105,
        styles: {
          font: "bold 52px font-2d",
          fill: "tomato",
          // stroke: "#262626",
          lineWidth: 0.1,
        },
      }),
      new Text({
        text: this.titleText2,
        x: canvas.width / 2,
        y: canvas.height / 2 - 60,
        styles: {
          font: "bold 52px font-2d",
          fill: "tomato",
          // stroke: "#262626",
          lineWidth: 2,
        },
      }),
      new Text({
        text: this.subtitleText,
        x: canvas.width / 2,
        y: canvas.height / 2 - 20,
        styles: {
          font: "bold 26px font-2d",
          fill: "#fff",
        },
      }),

      new Text({
        text: this.scoreText,
        x: canvas.width / 2,
        y: canvas.height / 2 + 30,
        styles: {
          font: "bold 56px font-2d",
          fill: "orange",
          stroke: "black",
        },
      }),
      new Text({
        text: "Tap to continue",
        x: canvas.width / 2,
        y: canvas.height / 2 + 60,
        styles: {
          font: "bold 26px font-2d",
          fill: "#fff",

          stroke: "#262626",
        },
      })
    );
  }

  updateText(dt) {
    this.text.forEach((text) => {
      // console.log(text);
      text.update(dt);
    });
  }

  update(dt) {
    if (
      resource.keyPressed["r"] &&
      resource.gameState.stateName === "game-over"
    ) {
      resource.gameState.change("ready", {player: this.player});
    }

    this.updateText(dt);
    // this.updatePipes(dt);
  }
  draw(ctx) {
    this.text.forEach((text) => {
      text.draw(ctx);
    });

    // this.drawPipes(ctx);

    // this.player.draw(ctx);
  }
}
