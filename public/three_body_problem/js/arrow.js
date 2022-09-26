class Arrow {
    constructor(mass) {
        this.mass = mass;
    }

    draw(ctx) {
        let lengthX = this.mass.vector.get_x_component() / (10 + this.mass.mass * 2);
        let lengthY = this.mass.vector.get_y_component() / (10 + this.mass.mass * 2);
        ctx.strokeStyle = "#C0C0C0";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.mass.x, this.mass.y);
        ctx.lineTo(this.mass.x + lengthX, this.mass.y + lengthY);
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 1;
    }
}