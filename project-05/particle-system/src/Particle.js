class Particle {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 18;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.ctx = ctx;
        this.color = `hsl(${this.ctx.hue},50%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw() {
        //this.ctx.fillStyle = "purple";
        //this.ctx.fillStyle = "white";
        this.ctx.fillStyle = this.color;
        //this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.fill();
    }
}

export default Particle;
