let rotX = 0, rotY = 0, zoom = 450;
let dragging = false, lastMouseX, lastMouseY;
let cubeSize = 150;
let hover = false; 


let grassTopImg, dirtSideImg, dirtBottomImg;


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


  camera(0, 0, zoom, 0, 0, 0, 0, 1, 0);


  ambientLight(160);
  directionalLight(255,255,255, 0.6, 0.6, -0.8);

  rotY += 0.01; 
  if (dragging){
    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    rotY += dx * 0.01;   
    rotX += dy * 0.01;   
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }

 
  hover = isOverCube();
  cursor(hover ? (dragging ? 'grabbing' : 'grab') : 'default');

  rotateX(rotX);
  rotateY(rotY);


  noStroke();

 
  push();
  translate(0, -cubeSize/2, 0);
  rotateX(HALF_PI);
  texture(grassTopImg);
  plane(cubeSize, cubeSize);
  pop();

  
  push();
  translate(0, cubeSize/2, 0);
  rotateX(-HALF_PI);
  texture(dirtBottomImg);
  plane(cubeSize, cubeSize);
  pop();


  texture(dirtSideImg);

 
  push(); translate(0, 0, cubeSize/2); plane(cubeSize, cubeSize); pop();


  push(); translate(0, 0, -cubeSize/2); rotateY(PI); plane(cubeSize, cubeSize); pop();

 
  push(); translate(cubeSize/2, 0, 0); rotateY(HALF_PI); plane(cubeSize, cubeSize); pop();

  
  push(); translate(-cubeSize/2, 0, 0); rotateY(-HALF_PI); plane(cubeSize, cubeSize); pop();
}


function isOverCube(){
  const cx = width / 2;
  const cy = height / 2;
  const baseR = Math.min(width, height) * 0.12;
  const scale = 450 / zoom;
  const r = baseR * constrain(scale, 0.5, 2.0);
  return dist(mouseX, mouseY, cx, cy) <= r;
}


function mousePressed(){
  if (isOverCube()){
    dragging = true;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
}

function mouseReleased(){ dragging = false; }

function mouseWheel(e){
  if (isOverCube()){
    zoom = constrain(zoom + e.delta * 0.5, 200, 1000);
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight * 0.6);
}
