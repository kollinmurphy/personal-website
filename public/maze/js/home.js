window.onload = function() {

    
    document.querySelector("#btnPlay").addEventListener("touchend",function() {
        document.location="difficulty.html";
    });
    document.querySelector("#btnPlay").addEventListener("click",function() {
        document.location="difficulty.html";
    });

    var cvs = document.querySelector("#canvasTitle");
    cvs.width = window.innerWidth;
    cvs.height = Math.round(window.innerHeight * 0.45);
    var ctx = cvs.getContext("2d");

    var img = document.querySelector("#imgTitle");
    var imgWidth = Math.round(Math.min(window.innerWidth,window.innerHeight) * 0.8);
    var imgHeight = Math.round(imgWidth / 2);
    var yy = 0;
    var stage = 0;
    var hoverClock;
    draw(yy);

    // this.setTimeout(function() {

        var dropClock = setInterval(function() {
            yy += 10;
            if (yy > cvs.height - 10) {
                stage = 1;
                clearInterval(dropClock);
                var hoverClock = setInterval(function() {
                    switch (stage) {
                        case 1:
                            yy -= 1;
                            if (yy < cvs.height - 18) {
                                stage = 2;
                            }
                            break;
                        case 2:
                            yy += 1;
                            if (yy > cvs.height - 10) {
                                stage = 1;
                            }
                    }
                    draw(yy);
                },100);
            }
            draw(yy);
        }, 10);
    // }, 100);

    function draw(y) {
        ctx.clearRect(0,0,cvs.width,cvs.height);
        // ctx.font = "64px Crom";
        // // ctx.fillText("MAZING RACE",window.innerWidth / 2,0);
        // ctx.shadowOffsetX = 3;
        // ctx.shadowOffsetY = 3;
        // ctx.shadowColor = "rgba(200,200,200,0.45)";
        // ctx.shadowBlur = 4;
        // ctx.textAlign = "center";
        // ctx.fillStyle = "white";
        // ctx.fillText("MAZING", cvs.width / 2, 70 + y);
        // ctx.fillText(window.innerHeight, 100,100);

        ctx.drawImage(img,0,0,640,320,Math.round(window.innerWidth / 2) - Math.round(imgWidth / 2),y-imgHeight,imgWidth,imgHeight);
        img.style.display = "none";
    }

    // img.style.display = "block";
};