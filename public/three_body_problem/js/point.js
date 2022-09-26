class Point {
    constructor(masses){
        this.x = -100;
        this.y = -100;
        this.masses = masses;
        this.origin = this.getCenter();
    }
    getCenter() {
        let coords = getCenterOfMass(this.masses);
        this.x = coords[0];
        this.y = coords[1];
        return [this.x, this.y];
    }
    moveToOrigin() {
        this.x = this.origin[0];
        this.y = this.origin[1];
    }
    draw(ctx){
        this.getCenter();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}