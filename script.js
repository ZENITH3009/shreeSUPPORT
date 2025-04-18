const canvas = document.getElementById('sparkles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = 'rgba(255, 255, 255, 0.8)';
}

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1;

    this.draw();
};

Particle.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

function createParticles(event) {
    const xPos = event.x;
    const yPos = event.y;
    const numberOfParticles = 5;
    
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(xPos, yPos));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animateParticles);
}

canvas.addEventListener('mousemove', createParticles);
animateParticles();
