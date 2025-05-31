function brownianSketch(p) {
  let particles = [];
  let numParticles = 50;
  let temperature = 2;
  let hitCount = 0;
  let boxSize = 400;
  let boxMargin = 50;
  let slider;

  p.setup = () => {
    p.createCanvas(boxSize + boxMargin * 2, boxSize + boxMargin * 2);

    // Reset particles array (important to avoid stacking when re-instantiated)
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: p.random(boxMargin, boxMargin + boxSize),
        y: p.random(boxMargin, boxMargin + boxSize),
        vx: 0,
        vy: 0,
      });
    }

    slider = p.createSlider(0.1, 5, 2, 0.1);
    slider.parent(p.canvas.parentElement); // Attach slider under canvas
    slider.position(20, boxSize + boxMargin * 2 + 10);
    slider.style('width', '200px');
  };

  p.draw = () => {
    p.background(255);
    temperature = slider.value();
    let t = p.constrain(hitCount / 100, 0, 1);
    let frameColor = p.lerpColor(p.color(0, 120, 255), p.color(255, 30, 30), t);
    p.strokeWeight(8);
    p.stroke(frameColor);
    p.noFill();
    p.rect(boxMargin, boxMargin, boxSize, boxSize);

    for (let pt of particles) {
      pt.vx += p.random(-temperature, temperature);
      pt.vy += p.random(-temperature, temperature);
      const maxSpeed = Math.max(temperature * 2, 1.5);
      pt.vx = p.constrain(pt.vx, -maxSpeed, maxSpeed);
      pt.vy = p.constrain(pt.vy, -maxSpeed, maxSpeed);
      pt.x += pt.vx;
      pt.y += pt.vy;

      let hit = false;
      if (pt.x <= boxMargin) { pt.x = boxMargin; pt.vx *= -1; hit = true; }
      if (pt.x >= boxMargin + boxSize) { pt.x = boxMargin + boxSize; pt.vx *= -1; hit = true; }
      if (pt.y <= boxMargin) { pt.y = boxMargin; pt.vy *= -1; hit = true; }
      if (pt.y >= boxMargin + boxSize) { pt.y = boxMargin + boxSize; pt.vy *= -1; hit = true; }
      if (hit) hitCount++;

      p.noStroke();
      p.fill(50, 50, 120, 200);
      p.ellipse(pt.x, pt.y, 10, 10);
    }

    p.noStroke();
    p.fill(0);
    p.textSize(16);
    p.text(`Temperature: ${temperature}`, 230, boxSize + boxMargin * 2 + 25);
    if (hitCount > 0 && p.frameCount % 30 === 0) {
  hitCount = Math.floor(hitCount * 0.8); // Decay 20% per second at 30 fps
}
  };

  // Custom cleanup to remove slider
  p.remove = () => {
    if (slider) {
      slider.remove();
      slider = null;
    }
  };
}

export default brownianSketch;