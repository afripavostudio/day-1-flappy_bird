class Resource {
  constructor() {
    this.gameStates = undefined;
    this.imageManager = undefined;
    this.keyPressed = {};
    this.gameState = "";
    this.playerServe = "";
    this.ballDir = 0;
  }
}

const resource = new Resource();

export {resource};
