import {resource} from "./src/main/Resource.js";
import AudioManager from "./src/main/AudioManager.js";
import StateMachine from "./src/main/StateMachine.js";
import StartState from "./src/states/StartState.js";
import ServeState from "./src/states/ServeState.js";
import GameOverState from "./src/states/GameOverState.js";
import PlayState from "./src/states/PlayState.js";
import ImageManager from "./src/main/ImageManager.js";
import Bg from "./src/sprites/Bg.js";
import ReadyState from "./src/states/ReadyState.js";

export const canvas = document.getElementById("canvas");

canvas.width = Math.min(384 - 16, window.innerWidth);

canvas.height = Math.min(512, window.innerHeight);

canvas.style.width = canvas.width;
canvas.style.height = canvas.height;

const ctx = canvas.getContext("2d");

let elapsedTime = 0,
  fps = 0,
  fpsEl = document.getElementById("fps");

// resource.keyPressed = {};
// resource.gameState = "serve";
// resource.playerServe = "Player 1";
// resource.ballDir = 150;

// Images
const imageList = [
  {
    name: "bg-day",
    url: "./graphics/background-day.png",
  },
  {
    name: "player",
    url: "./graphics/redbird-midflap.png",
  },
  {
    name: "pipe-bottom",
    url: "./graphics/pipe-red.png",
  },
  {
    name: "pipe-top",
    url: "./graphics/pipe-red-top.png",
  },
  {
    name: "timer-3",
    url: "./graphics/3.png",
  },
  {
    name: "timer-2",
    url: "./graphics/2.png",
  },
  {
    name: "timer-1",
    url: "./graphics/1.png",
  },
];

resource.imageManager = new ImageManager();

resource.imageManager.loadImages(imageList);

// Sound
const soundEffects = new AudioManager();
const backgroundMusic = new AudioManager();

soundEffects.addSounds([
  {
    name: "death",
    audio: document.getElementById("death"),
  },
  {
    name: "point",
    audio: document.getElementById("point"),
  },
  {
    name: "hit",
    audio: document.getElementById("hit"),
  },
  {
    name: "wing",
    audio: document.getElementById("wing"),
  },
  {
    name: "swoosh",
    audio: document.getElementById("swoosh"),
  },
]);

// backgroundMusic.addSounds([
//   {
//     name: "wall-sound",
//     audio: document.getElementById("wall-sound"),
//   },
// ]);

export {soundEffects};

// console.log(resource.imageManager.images, "Before onload");

window.onload = function () {
  // console.log(resource.imageManager.images, "After onload");

  resource.gameState = new StateMachine({
    serve: () => new ServeState(),
    ready: () => new ReadyState(),
    play: () => new PlayState(),
    "game-over": () => new GameOverState(),
  });

  resource.gameState.change("serve");

  const bg = new Bg({
    image: "bg-day",
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    speed: 10,
    styles: {
      lineWidth: 20,
      fill: "#262626",
      stroke: "gray",
    },
  });

  function gameLoop(dt) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const deltaTime = (dt - elapsedTime) / 1000;

    elapsedTime = dt;

    // Calculate FPS
    fps = 1 / deltaTime;
    fpsEl.innerHTML = Math.floor(fps);

    // update scene objects
    update(deltaTime);

    // define a game loop
    draw();

    requestAnimationFrame(gameLoop);
  }

  function update(dt) {
    // draw bg
    bg.update(dt);

    // State Drawing
    resource.gameState.update(dt);
  }

  function draw() {
    // draw bg
    bg.draw(ctx);

    // State Drawing
    resource.gameState.draw(ctx);
  }

  requestAnimationFrame(gameLoop);

  // EVENTS
  window.onkeydown = function (e) {
    const key = e.key;

    resource.keyPressed[key] = true;
  };
  window.onkeyup = function (e) {
    const key = e.key;

    resource.keyPressed[key] = false;
  };
};
