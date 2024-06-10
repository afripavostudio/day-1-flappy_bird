import Entity from "../main/Entity.js";

import {soundEffects} from "../../index.js";
import {resource} from "../main/Resource.js";

export default class Bg extends Entity {
  constructor(props) {
    super(props);
  }

  update(dt) {
    if (this.x + this.width < 0) {
      this.x = this.x + this.width;
    }

    this.velocity.x = -this.speed;
    this.x += this.velocity.x * dt;
  }

  draw(ctx) {
    ctx.save();
    ctx.lineWidth = this.styles.lineWidth;
    ctx.fillStyle = this.styles.fill;
    ctx.strokeStyle = this.styles.stroke;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(
      resource.imageManager.getImage(this.image),
      this.x,
      this.y,
      this.width,
      this.height
    );

    ctx.drawImage(
      resource.imageManager.getImage(this.image),
      this.x + this.width - 1,
      this.y,
      this.width,
      this.height
    );

    ctx.restore();
  }
}
