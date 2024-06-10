import BaseState from "../main/BaseState.js";

import Entity from "../main/Entity.js";
import {canvas} from "../../index.js";

import Text from "../main/Text.js";
import {resource} from "../main/Resource.js";
import Player from "../sprites/Player.js";

export default class ServeState extends BaseState {
  constructor(props) {
    super(props);

    this.player = new Player({
      image: "player",
      id: "Player",
      x: 50,
      y: canvas.height / 2,
      width: 64,
      height: 32 + 16,
    });

    this.text = [];
    this.generateText();

    this.timer = 0;
  }

  generateText() {
    this.titleText = "Birdy";
    this.titleText2 = "20";
    this.subtitleText = "Tap To Start";

    this.text.push(
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
        text: this.subtitleText,
        x: canvas.width / 2,
        y: canvas.height / 2 - 15,
        styles: {
          font: "bold 26px font-2d",
          fill: "#fff",
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

  enter(params) {}
  update(dt) {
    // console.log(resource.gameState.stateName);

    if (resource.keyPressed[" "] && resource.gameState.stateName === "serve") {
      resource.gameState.change("ready", {
        player: this.player,
      });
    }

    this.updateText(dt);
  }

  draw(ctx) {
    this.text.forEach((text) => {
      text.draw(ctx);
    });

    this.player.x = canvas.width / 2 - this.player.width / 2;

    this.player.draw(ctx);
  }
}
