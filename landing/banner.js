// Variables
let rotX = 0;
let rotY = 0;
let zoom = 450; // un poquito más de zoom
let dragging = false;
let lastMouseX, lastMouseY;
let grassTopImg;    // Textura de pasto (arriba)
let dirtSideImg;    // Textura de tierra (lados)
let dirtBottomImg;  // Textura de tierra (abajo)
let cubeSize = 150
let fondoImg; // NUEVA: Variable para la imagen de fondo

function preload() {
  // Cargar la textura del bloque de Minecraft (tierra/pasto)
  // textura = loadImage("imagenes/bloque-madera.png");
  // textura = loadImage("imagenes/bloque-pasto.png")
  grassTopImg = loadImage("imagenes/bloque-pasto.png");     
  dirtSideImg = loadImage("imagenes/bloque-tierra-pasto.png");   
  dirtBottomImg = loadImage("imagenes/bloque-tierra.png");

  fondoImg = loadImage("imagenes/paisaje.png"); 
}

function setup() {
  // Banner más alto (500 px)
  let canvas = createCanvas(windowWidth, windowHeight * 0.6, WEBGL);
  canvas.parent("banner");
}

function draw() {
  background(0); // Fondo negro
  // NOTA: Eliminamos orbitControl() porque ya tienes un control manual implementado.

  // Aseguramos que todas las texturas se hayan cargado antes de dibujar
  if (!grassTopImg || !dirtSideImg || !dirtBottomImg) {
      textAlign(CENTER);
      textSize(24);
      fill(255, 0, 0);
      text("Error: Texturas no cargadas correctamente.", 0, 0);
      return; 
  }
// --- FONDO FIJO (NO AFECTADO POR EL ZOOM DEL CUBO) ---
  if (fondoImg) {
      // Aplicar blur al contexto de dibujo
      drawingContext.filter = "blur(4px)";
      
      push();
      // ******* CAMBIO CLAVE 1: Dibujar el fondo antes de definir la cámara con zoom *******
      // Resetear la matriz para que el plano se dibuje en las coordenadas 0,0,0
      resetMatrix(); 
      
      texture(fondoImg);
      // CAMBIO CLAVE 2: Dibujamos un plano mucho más grande que el canvas (por ejemplo, 1.5 veces) 
      // y en el eje Z negativo (lejos) para asegurar que cubre TODO el viewport
      translate(0, 0, -500); // Lo empujamos hacia atrás para que quede por detrás del cubo
      plane(width * 1.5, height * 1.5); 
      pop();
      
      // DESACTIVAR EL BLUR antes de dibujar el cubo
      drawingContext.filter = "none"; 
  }
  // --- FIN FONDO FIJO ---
  
  // ******* CAMBIO CLAVE 3: La cámara con zoom se aplica AHORA, solo para el cubo *******
  camera(0, 0, zoom, 0, 0, 0, 0, 1, 0);


  // Luz y materiales
  ambientLight(150);
  directionalLight(255, 255, 255, 0.5, 1, -1);

  // Rotación automática
  rotY += 0.01;

  // Arrastre manual (código de rotación personalizada)
  if (dragging) {
    let dx = mouseX - lastMouseX;
    let dy = mouseY - lastMouseY;
    rotY += dx * 0.01;
    rotX += dy * 0.01;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }

  // Aplicar rotaciones
  rotateX(rotX);
  rotateY(rotY);

  // ******* 3. REEMPLAZO DEL BOX(150) por 6 PLANOS *******
  // Dibujamos el cubo usando 6 planos individuales, asignando la textura correcta a cada cara.
  noStroke();

  // Las caras tienen la textura de tierra lateral por defecto
  texture(dirtSideImg); 

  // --- CARA SUPERIOR (PASTO) ---
  push();
  translate(0, -cubeSize / 2, 0); // Mover hacia arriba la mitad del tamaño
  rotateX(HALF_PI);              // Rotar 90 grados para que el plano mire hacia arriba
  texture(grassTopImg);          // Aplicar la textura de pasto
  plane(cubeSize, cubeSize);
  pop();

  // --- CARA INFERIOR (TIERRA) ---
  push();
  translate(0, cubeSize / 2, 0); // Mover hacia abajo la mitad del tamaño
  rotateX(-HALF_PI);             // Rotar 90 grados para que el plano mire hacia abajo
  texture(dirtBottomImg);        // Aplicar la textura de tierra inferior
  plane(cubeSize, cubeSize);
  pop();
  
  // --- CARA FRONTAL (TIERRA) ---
  push();
  translate(0, 0, cubeSize / 2); // Mover hacia adelante
  plane(cubeSize, cubeSize);     // Ya tiene aplicada la textura dirtSideImg por defecto
  pop();

  // --- CARA TRASERA (TIERRA) ---
  push();
  translate(0, 0, -cubeSize / 2); // Mover hacia atrás
  rotateY(PI);                    // Rotar 180 grados para que mire hacia atrás
  plane(cubeSize, cubeSize);
  pop();

  // --- CARA DERECHA (TIERRA) ---
  push();
  translate(cubeSize / 2, 0, 0); // Mover hacia la derecha
  rotateY(HALF_PI);              // Rotar 90 grados para que mire a la derecha
  plane(cubeSize, cubeSize);
  pop();

  // --- CARA IZQUIERDA (TIERRA) ---
  push();
  translate(-cubeSize / 2, 0, 0); // Mover hacia la izquierda
  rotateY(-HALF_PI);             // Rotar 90 grados para que mire a la izquierda
  plane(cubeSize, cubeSize);
  pop();
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
// NUEVA: Maneja la responsividad del canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.6); 
}