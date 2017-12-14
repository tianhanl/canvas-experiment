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
          let particle = {
            x: i * cellWidth + (Math.random() - 0.5) * 5,
            y: j * cellHeight + (Math.random() - 0.5) * 5,
            fillStyle: '#006eff'
          };
          particles.push(particle);
        }
      }
    }
    console.log(particles);
    return particles;
  }

  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    let currParticle;
    for (let i = 0; i < this.particles.length; i++) {
      currParticle = this.particles[i];
      this.context.fillStyle = currParticle.fillStyle;
      this.context.fillRect(currParticle.x, currParticle.y, 1, 1);
    }
  }
}
