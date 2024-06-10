export default class ImageManager {
  constructor() {
    this.images = [];
  }

  loadImages(list) {
    list?.forEach((imageObject) => {
      this.loadImage(imageObject);
    });
  }

  loadImage({name, url}) {
    const image = new Image();

    image.src = url;

    image.onload = () => {
      this.images.push({
        name,
        image,
      });
    };
  }

  getImage(name) {
    if (typeof name !== "string") {
      return;
    }

    const imageObject = this.images.filter((el) => el?.name === name)?.[0];

    if (imageObject?.hasOwnProperty("image")) {
      return imageObject?.image;
    } else {
      return {
        err: "No Image was found!",
      };
    }
  }
}
