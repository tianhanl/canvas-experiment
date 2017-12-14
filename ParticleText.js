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
    // this.alpha = (Math.floor(Math.random() * 10) + 1) / 10;
    // this.color = `hsla(0, 0%, 62%, ${this.alpha})`;
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

class ParticleText {
  /*
  text
  original text to be transformed
  context, the canvas context in which should the result text be painted
*/

  constructor(text, fontSize, fontFamily, fillStyle) {
    this.text = text;
    this.fontSize = fontSize;
    this.canvas = document.createElement('canvas');
    this.width = this.calculateTextLength(this.text, this.fontSize);
    this.height = this.fontSize * 1.5;

    // init canvas
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // init context
    this.context = this.canvas.getContext('2d');
    this.context.font = `${fontSize}px ${fontFamily}`;
    this.context.fillStyle = fillStyle;
    this.context.fillText(text, fontSize * 0.05, fontSize);

    // get image data
    this.imageData = this.context.getImageData(0, 0, this.width, this.height);
    this.particles = this.calculateParticles();
    this.draw();
  }

  attachToElement(node) {
    console.log(node);
    node.appendChild(this.canvas);
  }

  calculateTextLength(text, fontSize) {
    return text.length * fontSize * 0.5;
  }

  calculateParticles() {
    let length = this.imageData.length;
    let cols = 100,
      rows = 100;
    let cellWidth = parseInt(this.width / cols);
    let cellHeight = parseInt(this.height / rows);
    let pos = 0;
    let particles = [];

    for (let i = 1; i <= cols; i++) {
      for (let j = 1; j <= rows; j++) {
        pos = [(j * cellHeight - 1) * this.width + (i * cellWidth - 1)] * 4;
        if (this.imageData.data[pos] > 250) {
          let particle = new Particle(
            pos,
            i * cellWidth + (Math.random() - 0.5) * this.fontSize / 20,
            j * cellHeight + (Math.random() - 0.5) * this.fontSize / 20,
            0.5,
            this.context,
            this.width,
            this.height,
            this.direction
          );
          particles.push(particle);
        }
      }
    }
    console.log(particles);
    return particles;
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.particles.forEach(element => element.draw());
  }
}
