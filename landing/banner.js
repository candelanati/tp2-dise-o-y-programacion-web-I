// Variables 
let textura;
let fondo;
let rotX = 0;
let rotY = 0;
let zoom = 450;
let dragging = false;
let lastMouseX, lastMouseY;

function preload() {
  // Cargar texturas
  textura = loadImage("imagenes/bloque-piedra.jpg");
  fondo = loadImage("imagenes/paisaje.png"); // Fondo
}

function setup() {
  let canvas = createCanvas(windowWidth, 500, WEBGL);
  canvas.parent("banner");
}

function draw() {
  // Dibujar fondo
  push();
  translate(0, 0, -500); // lo empujamos atrás del cubo
  texture(fondo);
  plane(windowWidth * 2, height * 2); // cubre todo el fondo
  pop();

  // Agregar un filtro de desenfoque leve
  // (esto se hace sobre toda la escena 2D)
  drawingContext.filter = 'blur(5px)'; // 👈 efecto de blur

  // Cámara y zoom
  camera(0, 0, zoom, 0, 0, 0, 0, 1, 0);

  // Luz
  ambientLight(150);
  directionalLight(255, 255, 255, 0.5, 1, -1);

  // Rotación
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

  // Cubo con textura
  noStroke();
  texture(textura);
  box(150);

  // Quitar blur después del render 3D
  drawingContext.filter = 'none';
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
