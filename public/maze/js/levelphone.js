window.onload = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var xx = 0;
    var yy = 0;
    var zz = 0;

    var cvs = document.querySelector("#myCanvas");
    cvs.width = width;
    cvs.height = height;
    var ctx = cvs.getContext("2d");
    draw();

    function draw() {
        ctx.clearRect(0,0,width,height);

        ctx.beginPath();
        ctx.fillStyle = "#c2c2c2";
        ctx.rect(0,0,width,height);
        ctx.fill();

        var imgPhone = document.querySelector("#imgPhone");
        var imgArrow = document.querySelector("#imgArrow");
        var phoneCoords = [Math.round(window.innerWidth / 2),Math.round(window.innerHeight / 2) - 64];
        ctx.drawImage(imgPhone, phoneCoords[0] - 64, phoneCoords[1] - 64);
        var arrowPoint = getArrowPoint(xx,yy,phoneCoords);
        ctx.save();
        ctx.translate(arrowPoint[0],arrowPoint[1]);
        ctx.rotate(arrowPoint[2]);
        ctx.drawImage(imgArrow, -imgArrow.width / 2, -imgArrow.width / 2);
        ctx.restore();
    }

    function getArrowPoint(xx, yy, phoneCoords) {
        var returnArr = [0, 0];
        // var x = Math.round(Math.round(xx));
        // var y = Math.round(Math.round(yy));
        var theta = Math.atan(yy/-xx);
        if (xx < 0 && yy > 0) {
            theta += Math.PI;
        } else if (xx < 0) {
            theta += Math.PI;
        } else if (xx === 0) {
            if (yy < 0) {
                theta = Math.PI / 2;
            } else if (yy > 0) {
                theta = Math.PI * 1.5;
            } else {
                theta = 0;
            }
        }
        returnArr[0] = Math.round(phoneCoords[0] + Math.cos(theta) * 80);
        returnArr[1] = Math.round(phoneCoords[1] + Math.sin(theta) * -100);
        theta = -theta;
        while (theta < 0) {
            theta += Math.PI * 2;
        }
        while (theta > Math.PI * 2) {
            theta -= Math.PI * 2;
        }
        returnArr[2] = theta;
        return returnArr;
    }


    window.addEventListener("devicemotion", function(e) {
        xx = Math.round(Android.getX() * 16) / -16; // calculates the speed that the ball should travel assuming walls don't interfere
        yy = Math.round(Android.getY() * 16) / -16;
        zz = Android.getZ() / 10 - 1;

        
        draw();

        if (Math.abs(xx) + Math.abs(yy) + Math.abs(zz) < 1 && e.accelerationIncludingGravity.z > 0) {
            this.document.location = "maze.html";
        }
    });

};