class Painter {
    constructor(cvs) {
        this.cvs = cvs;
        this.cvs.width = window.innerWidth;
        this.cvs.height = window.innerHeight;

        this.ctx = cvs.getContext("2d");
        this.objects = [];
        this.draw();
    }

    addObject(obj) {
        this.objects.push(obj);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].draw(this.ctx);
        }

    }
}