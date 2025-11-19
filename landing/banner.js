let rotX = 0, rotY = 0, zoom = 450;
let dragging = false, lastMouseX, lastMouseY;
let cubeSize = 150;
let hover = false;

let grassTopImg, dirtSideImg, dirtBottomImg;

function preload() {
  grassTopImg   = loadImage("imagenes/bloque-pasto.png");
  dirtSideImg   = loadImage("imagenes/bloque-tierra-pasto.png");
  dirtBottomImg = loadImage("imagenes/bloque-tierra.png");
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight * 0.6, WEBGL);
  canvas.parent("banner");
}

function draw() {
  clear(); // Fondo transparente para ver la imagen del banner

  // Cámara
  camera(0, 0, zoom, 0, 0, 0, 0, 1, 0);

  // Luces
  ambientLight(160);
  directionalLight(255,255,255, 0.6, 0.6, -0.8);

  // Rotación automática
  rotY += 0.01;

  // Rotación manual
  if (dragging) {
    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    rotY += dx * 0.01;
    rotX += dy * 0.01;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }

  // Hover del mouse
  hover = isOverCube();
  cursor(hover ? (dragging ? 'grabbing' : 'grab') : 'default');

  // Rotación del cubo
  rotateX(rotX);
  rotateY(rotY);

  noStroke();

  // Arriba
  push();
  translate(0, -cubeSize/2, 0);
  rotateX(HALF_PI);
  texture(grassTopImg);
  plane(cubeSize, cubeSize);
  pop();

  // Abajo
  push();
  translate(0, cubeSize/2, 0);
  rotateX(-HALF_PI);
  texture(dirtBottomImg);
  plane(cubeSize, cubeSize);
  pop();

  // Lados
  texture(dirtSideImg);

  push(); translate(0, 0, cubeSize/2); plane(cubeSize, cubeSize); pop();
  push(); translate(0, 0, -cubeSize/2); rotateY(PI); plane(cubeSize, cubeSize); pop();
  push(); translate(cubeSize/2, 0, 0); rotateY(HALF_PI); plane(cubeSize, cubeSize); pop();
  push(); translate(-cubeSize/2, 0, 0); rotateY(-HALF_PI); plane(cubeSize, cubeSize); pop();
}

function isOverCube() {
  const cx = width / 2;
  const cy = height / 2;
  const baseR = Math.min(width, height) * 0.12;
  const scale = 450 / zoom;
  const r = baseR * constrain(scale, 0.5, 2.0);
  return dist(mouseX, mouseY, cx, cy) <= r;
}

function mousePressed() {
  if (isOverCube()) {
    dragging = true;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
}

function mouseReleased() {
  dragging = false;
}

function mouseWheel(e) {
  if (isOverCube()) {
    zoom = constrain(zoom + e.delta * 0.5, 200, 1000);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.6);
}
