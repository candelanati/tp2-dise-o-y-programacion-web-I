let particulas = [];

function setup() {
  let canvas = createCanvas(400, 300);
  canvas.parent("nota-principal"); // se vincula con la sección
}

function draw() {
  background(10, 50, 20);
  noStroke();

  // Crear partículas aleatorias
  if (frameCount % 3 === 0) {
    particulas.push({
      x: random(width),
      y: height,
      size: random(5, 12),
      speed: random(1, 3),
      alpha: 255
    });
  }

  // Dibujar y mover partículas
  for (let i = particulas.length - 1; i >= 0; i--) {
    let p = particulas[i];
    fill(0, 255, 0, p.alpha);
    ellipse(p.x, p.y, p.size);
    p.y -= p.speed;
    p.alpha -= 3;
    if (p.alpha <= 0) particulas.splice(i, 1);
  }

  // Texto de fondo
  textAlign(CENTER);
  textSize(24);
  fill(0, 255, 0, 80);
  text("ENERGÍA CREATIVA", width / 2, height / 2);
}
