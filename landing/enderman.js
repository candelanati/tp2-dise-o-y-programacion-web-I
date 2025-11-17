let endermanSketch = (p) => {

  let particles = [];

  p.setup = function () {
    let canvas = p.createCanvas(420, 520);
    canvas.parent("enderman-canvas");

    p.rectMode(p.CENTER);

    
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: p.random(-50, 50),
        y: p.random(-200, 200),
        size: p.random(4, 12),
        speed: p.random(0.3, 1),
        offset: p.random(100),
      });
    }
  };

  p.draw = function () {
    p.background(26); 

    drawGlowPurple();
    drawParticlesPurple();
    drawEndermanPurple();
  };

  
  function drawGlowPurple() {
    p.push();
    p.noStroke();
    for (let r = 220; r > 0; r -= 20) {
      p.fill(178, 76, 255, 30); 
      p.ellipse(p.width / 2, p.height / 2 - 40, r, r * 1.3);
    }
    p.pop();
  }

 
  function drawParticlesPurple() {
    p.push();
    p.noStroke();

    particles.forEach(pt => {
      const alpha = p.map(p.sin(p.frameCount * 0.05 + pt.offset), -1, 1, 50, 180);

      p.fill(191, 60, 255, alpha); 
      p.circle(p.width / 2 + pt.x, p.height / 2 + pt.y, pt.size);

      pt.y -= pt.speed;
      if (pt.y < -260) pt.y = 260;
    });

    p.pop();
  }

  
  function drawEndermanPurple() {
    p.push();
    p.translate(p.width / 2, p.height / 2 + 40);

   
    p.noStroke();
    p.fill(0);

    
    p.rect(0, 0, 110, 200, 5);

    
    p.rect(0, -160, 140, 140, 5);

    
    p.fill(191, 60, 255); 
    let glow = p.sin(p.frameCount * 0.1) * 6 + 14;
    p.rect(-40, -160, 40, glow);
    p.rect(40, -160, 40, glow);

    
    p.fill(0);
    p.push();
    p.rotate(p.sin(p.frameCount * 0.03) * 0.15);
    p.rect(-100, -10, 40, 200, 5);
    p.rect(100, -10, 40, 200, 5);
    p.pop();

    
    p.rect(-30, 180, 40, 200, 5);
    p.rect(30, 180, 40, 200, 5);

    p.pop();
  }

};

new p5(endermanSketch);
