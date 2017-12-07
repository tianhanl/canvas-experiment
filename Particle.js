// directions
const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal';
const DIAGONAL = 'diagonal';

class Particle {
  constructor(
    key,
    x,
    y,
    r = 2,
    context,
    width,
    height,
    direction,
    stepInterval
  ) {
    this.key = key;
    this.x = x;
    this.y = y;
    this.r = Math.random() * r + 1;
    this.alpha = (Math.floor(Math.random() * 10) + 1) / 10;
    this.color = `hsla(0, 0%, 62%, ${this.alpha})`;
    this.context = context;
    this.direction = direction;
    this.stepInterval = stepInterval;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.shadowBlur = this.r * 2;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    this.context.closePath();
    this.context.fill();
  }

  move() {
    switch (this.direction) {
      case VERTICAL:
        this.y -= this.stepInterval;
        this.y = this.y <= -10 ? this.height + 10 : this.y;
        break;
      case HORIZONTAL:
        this.x -= this.stepInterval;
        this.x = this.x <= -10 ? this.width + 10 : this.x;
        break;
      case DIAGONAL:
        this.y -= this.stepInterval;
        this.y = this.y <= -10 ? this.height + 10 : this.y;
        this.x -= this.stepInterval;
        this.x = this.x <= -10 ? this.width + 10 : this.x;
        break;
      default:
    }
    this.draw();
  }
}

class ParticleManager {
  constructor(
    element,
    width,
    height,
    itemCount = 100,
    direction = VERTICAL,
    stepInterval = 0.15,
    range = 0
  ) {
    // set up context
    this.element = element;
    this.context = element.getContext('2d');
    this.width = width;
    element.width = this.width;
    this.height = height;
    element.height = this.height;

    // set up particle related properties
    this.itemCount = itemCount;
    this.direction = direction;
    this.stepInterval = stepInterval;
    this.range = range;

    // set up particles;
    this.particles = [];
    for (let i = 0; i < this.itemCount; i++) {
      this.particles.push(
        new Particle(
          i,
          Math.random() * this.width,
          Math.random() * this.height,
          3,
          this.context,
          this.width,
          this.height,
          this.direction,
          this.range === 0
            ? this.stepInterval
            : this.stepInterval + Math.random() * range
        )
      );
      this.particles[i].draw();
    }
    this.animate = this.animate.bind(this);
    this.animate();
  }
  animate() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.particles.forEach(particle => particle.move());
    requestAnimationFrame(this.animate);
  }
}
