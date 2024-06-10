import Entity from "../main/Entity.js";
import {resource} from "../main/Resource.js";

export default class Pipes extends Entity {
  constructor(props) {
    super(props);

    this.isPassed = false;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.styles.fill;
    this.image
      ? ctx.drawImage(
          resource.imageManager.getImage(this.image),
          this?.x,
          this?.y,
          this?.width,
          this?.height
        )
      : ctx.fillRect(this?.x, this?.y, this?.width, this?.height);
    ctx.restore();
  }

  update(dt) {
    this.y += this.velocity.y * dt;
    this.x += this.velocity.x * dt;
  }
  collides(ball) {
    if (
      ball.x - ball.radius < this.x + this.width &&
      ball.x + ball.radius > this.x &&
      ball.y + ball.radius > this.y &&
      ball.y - ball.radius < this.y + this.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}
