class Stars {
    constructor() {
        this.stars = [];
        for (let i = 0; i < Math.floor(Math.random() * 50 + 50); i++) {
            this.stars.push(new Star());
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].draw(ctx);
        }
        ctx.globalAlpha = 1;
    }
}

class Star {
    constructor() {
        this.x = Math.floor(Math.random() * window.innerWidth);
        this.y = Math.floor(Math.random() * window.innerHeight);
        this.radius = Math.ceil(Math.random() * 3);
        this.alpha = Math.random();
    }
    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}