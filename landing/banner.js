// Variables
let textura;
let rotX = 0;
let rotY = 0;
let zoom = 450; // un poquito más de zoom
let dragging = false;
let lastMouseX, lastMouseY;

function preload() {
  // Cargar la textura del bloque de Minecraft (tierra/pasto)
  textura = loadImage("imagenes/bloque-madera.png");
}

function setup() {
  // Banner más alto (500 px)
  let canvas = createCanvas(windowWidth, 500, WEBGL);
  canvas.parent("banner");
}

function draw() {
  background(0); // Fondo negro
  orbitControl();

  // Cámara y zoom
  camera(0, 0, zoom, 0, 0, 0, 0, 1, 0);

  // Luz y materiales
  ambientLight(150);
  directionalLight(255, 255, 255, 0.5, 1, -1);

  // Rotación automática
  rotY += 0.01;

  // Arrastre manual
  if (dragging) {
    let dx = mouseX - lastMouseX;
    let dy = mouseY - lastMouseY;
    rotY += dx * 0.01;
    rotX += dy * 0.01;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }

  rotateX(rotX);
  rotateY(rotY);

  // Dibujar cubo con textura
  noStroke();
  texture(textura);
  box(150);
}

// Eventos del mouse
function mousePressed() {
  dragging = true;
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function mouseReleased() {
  dragging = false;
}

function mouseWheel(event) {
  zoom += event.delta * 0.5;
  zoom = constrain(zoom, 200, 1000);
}
