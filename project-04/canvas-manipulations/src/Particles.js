class Particles {
    constructor(width, height, ctx) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 15;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.ctx = ctx;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
        if (this.size < 0.5) {
            this.size += 0.05;
        }
    }

    draw() {
        this.ctx.fillStyle = "purple";
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.fill();
    }
}

export default Particles;
