let particles = [];
let numParticles = 50;
let temperature = 2;
let hitCount = 0;
let lastHitCount = 0;

function brownianSketch(p) {
  let slider;
  let boxSize = 400;
  let boxMargin = 50;

  p.setup = () => {
    p.createCanvas(boxSize + boxMargin * 2, boxSize + boxMargin * 2);
    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: p.random(boxMargin, boxMargin + boxSize),
        y: p.random(boxMargin, boxMargin + boxSize),
        vx: 0,
        vy: 0,
      });
    }
    slider = p.createSlider(0.5, 5, 2, 0.1);
    slider.position(20, boxSize + boxMargin * 2 + 10);
    slider.style('width', '200px');
  };

  p.draw = () => {
    p.background(255);
    temperature = slider.value();

    // Box color based on hit count
    let frameColor;
    let t = p.constrain(hitCount / 100, 0, 1);
    // Blue (cold, few hits) to Red (hot, many hits)
    frameColor = p.lerpColor(p.color(0, 120, 255), p.color(255, 30, 30), t);

    // Draw the box frame
    p.strokeWeight(8);
    p.stroke(frameColor);
    p.noFill();
    p.rect(boxMargin, boxMargin, boxSize, boxSize);

    // Move and draw particles
    for (let pt of particles) {
      // Random movement, scale with temperature
      pt.vx += p.random(-temperature, temperature);
      pt.vy += p.random(-temperature, temperature);

      // Limit speed
      pt.vx = p.constrain(pt.vx, -5, 5);
      pt.vy = p.constrain(pt.vy, -5, 5);

      pt.x += pt.vx;
      pt.y += pt.vy;

      // Bounce off the walls (with hit counting)
      let hit = false;
      if (pt.x <= boxMargin) { pt.x = boxMargin; pt.vx *= -1; hit = true; }
      if (pt.x >= boxMargin + boxSize) { pt.x = boxMargin + boxSize; pt.vx *= -1; hit = true; }
      if (pt.y <= boxMargin) { pt.y = boxMargin; pt.vy *= -1; hit = true; }
      if (pt.y >= boxMargin + boxSize) { pt.y = boxMargin + boxSize; pt.vy *= -1; hit = true; }
      if (hit) hitCount++;

      // Draw particle
      p.noStroke();
      p.fill(50, 50, 120, 200);
      p.ellipse(pt.x, pt.y, 10, 10);
    }

    // Draw temperature label
    p.noStroke();
    p.fill(0);
    p.textSize(16);
    p.text(`Temperature: ${temperature}`, 230, boxSize + boxMargin * 2 + 25);

    // Slowly reduce hitCount over time (frame cools off)
    if (hitCount > 0 && p.frameCount % 30 === 0) hitCount -= 1;
  };
}

export default brownianSketch;