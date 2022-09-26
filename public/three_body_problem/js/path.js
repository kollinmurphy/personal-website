class Path {
    constructor(color, point) {
        this.color = color;
        this.points = [point];
    }

    addPoint(point) {
        this.points.push(point);
    }

    draw(ctx) {
        if (this.points.length > 1500){
            this.points.shift();
        }
        if (this.points.length > 1) {
            ctx.strokeStyle = this.color;
            for (let i = this.points.length - 1; i > 1; i--) {
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.globalAlpha = (i / this.points.length);
                ctx.moveTo(this.points[i - 1][0], this.points[i - 1][1]);
                ctx.lineTo(this.points[i][0], this.points[i][1]);
                ctx.stroke();
                ctx.closePath();
                ctx.lineWidth = 1;
            }

            ctx.globalAlpha = 1;
        }
    }
}