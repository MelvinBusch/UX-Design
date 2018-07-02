const SOCKET = io.connect("http://localhost:3000");

let img = [];

let t = 0;
let c1, c2;
let clouds = [];
let drops = [];
let canvasBorder = 20;

let rps = 0;
let rotated = [];

let pressed = false;

// Socket Event
SOCKET.on("rotating", () => {
  rotated.push(true);
  setTimeout(() => rotated.splice(0, 1), 1000);
});

function keyPressed() {
  if (key === " ") {
    rotated.push(true);
    setTimeout(() => rotated.splice(0, 1), 1000);
  }
}

function preload() {
  img[0] = loadImage("img/cloud-particle-1.png");
  img[1] = loadImage("img/cloud-particle-2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // Background
  c1 = color(173, 225, 248);
  c2 = color(232, 194, 225);

  // Clouds
  for (let i = 0; i < 35; i++) { // 60
    clouds[i] = new Cloud(random(canvasBorder, width - canvasBorder), random(canvasBorder, height - canvasBorder));
  }

}

function draw() {
  // background
  backgroundGradient(0, 0, width, height, c1, c2);

  clouds.forEach((cloud) => {
    cloud.show();
  });

  rps = rotated.length / 2;

  // Move ahead in time
  t += 1;
}

function backgroundGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    var inter = map(i, y, y + h, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}