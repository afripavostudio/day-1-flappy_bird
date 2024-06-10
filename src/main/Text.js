import Entity from "./Entity.js";

export default class Text extends Entity {
  constructor(props) {
    super(props);

    this.timer = 0;
  }

  center(ctx) {
    return this.x - ctx.measureText(this.text)?.width / 2;
  }

  update(dt) {
    this.timer += dt;

    if (this.timer < 2) {
      this.velocity.y = 10;
    }

    if (this.timer > 2) {
      this.velocity.y = -10;
    }

    if (this.timer > 4) {
      this.timer = 0;
    }

    this.y += this.velocity.y * dt;
  }

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = this.styles?.fill;
    ctx.strokeStyle = this.styles?.stroke;
    ctx.font = this.styles?.font;
    ctx.lineWidth = this.styles?.lineWidth;

    this.styles?.fill && ctx.fillText(this.text, this["center"](ctx), this.y);

    this.styles?.stroke &&
      ctx.strokeText(this.text, this["center"](ctx), this.y);

    ctx.restore();
  }
}
