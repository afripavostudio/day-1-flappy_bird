import Entity from "../main/Entity.js";

import {soundEffects} from "../../index.js";
import {resource} from "../main/Resource.js";

export default class Player extends Entity {
  constructor(props) {
    super(props);

    this.gravity = 9.8;
    this.angle = 360;
    this.angleRate = 5;
  }

  update(dt) {
    if (resource.keyPressed[" "] && resource.gameState.stateName === "play") {
      soundEffects.play("wing");

      if (this.angle > 320) {
        this.angle -= this.angleRate * 2;
      }

      this.velocity.y = -200;
    } else {
      if (this.angle < 420 && this.velocity.y > 120) {
        this.angle += this.angleRate;
      }
    }

    // if (this.id === "Player 1") {
    //   if (resource.keyPressed["w"]) {
    //     this.velocity.y = -this.speed;
    //   } else if (resource.keyPressed["s"]) {
    //     this.velocity.y = this.speed;
    //   } else if (!resource.keyPressed["w"] && !resource.keyPressed["s"]) {
    //     this.velocity.y = 0;
    //   }
    // }

    if (this.y < 0) {
      soundEffects.play("hit");

      this.velocity.y = 0;
      this.y = this.velocity.y;

      resource.gameState.change("game-over", {player: this});

      return;
    } else if (this.y + this.height > canvas.height) {
      soundEffects.play("hit");

      this.velocity.y = 0;
      this.y = canvas.height - this.height;

      resource.gameState.change("game-over", {player: this});
      return;
    } else {
      if (this.velocity.y > 320) {
        soundEffects.play("swoosh");
      }

      this.velocity.y += this.gravity;

      this.y += this.velocity.y * dt;
    }

    // this.x += this.velocity.x * dt;
  }

  collides(target) {
    // Game Score

    if (
      this.x + this.width > target.x &&
      this.x < target.x + target.width &&
      this.y + this.height > target.y &&
      this.y < target.y + target.height
    ) {
      soundEffects.play("hit");

      resource.gameState.change("game-over", {player: this});
    } else {
      if (this.x > target.x + target.width && !target.isPassed) {
        soundEffects.play("point");
        target.isPassed = true;
        this.score += 2;
      }
    }
  }

  // collides2(ball) {
  //   if (
  //     ball.x - ball.radius < this.x + this.width &&
  //     ball.x + ball.radius > this.x &&
  //     ball.y + ball.radius > this.y &&
  //     ball.y - ball.radius < this.y + this.height
  //   ) {
  //     resource.gameState.change("game-over", {player: this});
  //   }
  // }

  draw(ctx) {
    ctx.save();

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    ctx.translate(centerX, centerY);

    // Rotate around the center
    ctx.rotate((this.angle * Math.PI) / 180); // Convert degrees to radians

    ctx.drawImage(
      resource.imageManager.getImage(this.image),
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    ctx.restore();
  }
}
