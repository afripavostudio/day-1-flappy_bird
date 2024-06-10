import Entity from "../main/Entity.js";
import {resource} from "../main/Resource.js";

export default class ImgNumber extends Entity {
  constructor(props) {
    super(props);
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
}
