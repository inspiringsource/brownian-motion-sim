import { getTranslation } from "../lib/translations";

function brownianSketch(p, initialLanguage = "de") {
  let particles = [];
  let numParticles = 50;
  let temperature = 2;
  let hitCount = 0;
  let boxSize = 400;
  let boxMargin = 50;
  let particleRadius = 5; // Half of the diameter (10)
  let currentLanguage = initialLanguage;

  // Method to update language
  p.updateLanguage = (newLanguage) => {
    currentLanguage = newLanguage;
  };

  // Method to update temperature from external slider
  p.updateTemperature = (newTemperature) => {
    temperature = newTemperature;
  };

  p.setup = () => {
    p.createCanvas(boxSize + boxMargin * 2, boxSize + boxMargin * 2);

    // Reset particles array (important to avoid stacking when re-instantiated)
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: p.random(
          boxMargin + particleRadius,
          boxMargin + boxSize - particleRadius
        ),
        y: p.random(
          boxMargin + particleRadius,
          boxMargin + boxSize - particleRadius
        ),
        vx: 0,
        vy: 0,
      });
    }
  };

  p.draw = () => {
    p.background(255);

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
      if (pt.x <= boxMargin + particleRadius) {
        pt.x = boxMargin + particleRadius;
        pt.vx *= -1;
        hit = true;
      }
      if (pt.x >= boxMargin + boxSize - particleRadius) {
        pt.x = boxMargin + boxSize - particleRadius;
        pt.vx *= -1;
        hit = true;
      }
      if (pt.y <= boxMargin + particleRadius) {
        pt.y = boxMargin + particleRadius;
        pt.vy *= -1;
        hit = true;
      }
      if (pt.y >= boxMargin + boxSize - particleRadius) {
        pt.y = boxMargin + boxSize - particleRadius;
        pt.vy *= -1;
        hit = true;
      }
      if (hit) hitCount++;

      p.noStroke();
      p.fill(50, 50, 120, 200);
      p.ellipse(pt.x, pt.y, particleRadius * 2, particleRadius * 2);
    }

    if (hitCount > 0 && p.frameCount % 30 === 0) {
      hitCount = Math.floor(hitCount * 0.8); // Decay 20% per second at 30 fps
    }
  };

  // Custom cleanup - no longer needed since we removed the slider
  p.remove = () => {
    // Cleanup code if needed in the future
  };
}

export default brownianSketch;
