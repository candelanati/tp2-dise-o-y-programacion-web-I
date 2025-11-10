// ====== VOID + CUBO DE TIERRA (p5.js) ======
let rotX = 0, rotY = 0, zoom = 450;
let dragging = false, lastMouseX, lastMouseY;
let cubeSize = 150;
let hover = false; // ¿el mouse está sobre el cubo?

// Texturas
let grassTopImg, dirtSideImg, dirtBottomImg;

// Partículas del "void"
let stars = [];
const STAR_COUNT = 220;
const STAR_Z_NEAR = -400;
const STAR_Z_FAR  = -1400;

function preload(){
  grassTopImg   = loadImage("imagenes/bloque-pasto.png");
  dirtSideImg   = loadImage("imagenes/bloque-tierra-pasto.png");
  dirtBottomImg = loadImage("imagenes/bloque-tierra.png");
}

function setup(){
  const canvas = createCanvas(windowWidth, windowHeight * 0.6, WEBGL);
  canvas.parent("banner");

  // Generar partículas del fondo
  for (let i = 0; i < STAR_COUNT; i++){
    stars.push({
      x: random(-width, width),
      y: random(-height, height),
      z: random(STAR_Z_FAR, STAR_Z_NEAR),
      s: random(2, 5),
      spd: random(0.2, 0.6)
    });
  }
}

function draw(){
  background(0);

  // --- Fondo "void" ---
  push();
  const parX = map(mouseX, 0, width, -20, 20);
  const parY = map(mouseY, 0, height, -10, 10);

  noStroke();
  ambientLight(40);
  for (let i = 0; i < stars.length; i++){
    let st = stars[i];

    push();
    translate(st.x + parX, st.y + parY, st.z);
    fill(255,255,255, 40);
    box(st.s * 2);
    pop();

    push();
    translate(st.x + parX, st.y + parY, st.z);
    fill(255);
    box(st.s);
    pop();

    st.z += st.spd;
    if (st.z > STAR_Z_NEAR){
      st.z = STAR_Z_FAR;
      st.x = random(-width, width);
      st.y = random(-height, height);
      st.s = random(2,5);
      st.spd = random(0.2,0.6);
    }
  }
  pop();

  // --- Cámara ---
  camera(0, 0, zoom, 0, 0, 0, 0, 1, 0);

  // Luces del cubo
  ambientLight(160);
  directionalLight(255,255,255, 0.6, 0.6, -0.8);

  // --- Rotación ---
  if (!dragging) {
    rotY += 0.01; // Rotación automática
  } else {
    // Rotación manual
    let dx = mouseX - lastMouseX;
    let dy = mouseY - lastMouseY;
    rotY += dx * 0.01;
    rotX += dy * 0.01;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }

  // Detección de hover
  hover = isOverCube();
  cursor(hover ? (dragging ? 'grabbing' : 'grab') : 'default');

  rotateX(rotX);
  rotateY(rotY);

  // --- CUBO ---
  noStroke();

  // Superior (pasto)
  push();
  translate(0, -cubeSize/2, 0);
  rotateX(HALF_PI);
  texture(grassTopImg);
  plane(cubeSize, cubeSize);
  pop();

  // Inferior (tierra)
  push();
  translate(0, cubeSize/2, 0);
  rotateX(-HALF_PI);
  texture(dirtBottomImg);
  plane(cubeSize, cubeSize);
  pop();

  // Laterales
  texture(dirtSideImg);

  // Frontal
  push();
  translate(0, 0, cubeSize/2);
  plane(cubeSize, cubeSize);
  pop();

  // Trasera
  push();
  translate(0, 0, -cubeSize/2);
  rotateY(PI);
  plane(cubeSize, cubeSize);
  pop();

  // Derecha
  push();
  translate(cubeSize/2, 0, 0);
  rotateY(HALF_PI);
  plane(cubeSize, cubeSize);
  pop();

  // Izquierda
  push();
  translate(-cubeSize/2, 0, 0);
  rotateY(-HALF_PI);
  plane(cubeSize, cubeSize);
  pop();
}

// --- Función para detectar si el mouse está sobre el cubo ---
function isOverCube(){
  const cx = width / 2;
  const cy = height / 2;
  const baseR = Math.min(width, height) * 0.12;
  const scale = 450 / zoom;
  const r = baseR * constrain(scale, 0.5, 2.0);
  return dist(mouseX, mouseY, cx, cy) <= r;
}

// --- Eventos de interacción ---
function mousePressed(){
  if (isOverCube()){
    dragging = true;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
}

function mouseReleased(){
  dragging = false;
}

function mouseWheel(e){
  if (isOverCube()){
    zoom = constrain(zoom + e.delta * 0.5, 200, 1000);
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight * 0.6);
}
