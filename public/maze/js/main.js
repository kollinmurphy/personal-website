window.onload = function() {
    var speedX = 0;
    var speedY = 0;
    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');
    var cBall = document.querySelector("#ballCanvas");
    var cFireworks = document.querySelector("#fireworkCanvas");
    var width = window.innerWidth;
    var height = window.innerHeight;
    c.width = width;
    c.height = height;
    cBall.width = width;
    cBall.height = height;
    cFireworks.width = width;
    cFireworks.height = height;
    var ctxBall = cBall.getContext('2d');
    var mazeDimensions = [0,0];
    var difficulty = parseInt(new URLSearchParams(window.location.search).get('difficulty')) || 0;
    var margin = Math.min(Math.round(width * 0.05), Math.round(height * 0.05));
    var maxSpeed = 25;
    var speedQuotient = 1.4;
    var screenQuotient = 0.7;
    var lineWidth = 2;
    switch (difficulty) {
        case 0: mazeDimensions[0] = 10; lineWidth += 1; break; // easy
        case 1: mazeDimensions[0] = 20; speedQuotient = 1.0; screenQuotient = 0.25; maxSpeed = 25; break; // medium
        case 2: mazeDimensions[0] = 35; speedQuotient = 0.9; screenQuotient = 0.11; maxSpeed = 16; break; // hard
        case 3: mazeDimensions[0] = 50; maxSpeed = 16; screenQuotient = 0.06; speedQuotient = 0.6; break; // extreme
        case 4: mazeDimensions[0] = 8; lineWidth += 1; break; // reset best times
        default: mazeDimensions[0] = 8; lineWidth += 2; break;
    }
    mazeDimensions[1] = mazeDimensions[0];
    var cell_size = findMazeSize(mazeDimensions[0], mazeDimensions[1], width - margin * 2, height - margin * 2);
    var mazeSize = [cell_size[0] * mazeDimensions[1], cell_size[1] * mazeDimensions[0]];
    var offset = [Math.round((width - mazeSize[0]) / 2), Math.round((height - mazeSize[1]) / 2)];
    var ballRadius = Math.round(Math.min(mazeSize[0],mazeSize[1]) / Math.min(mazeDimensions[0],mazeDimensions[1]) / 4);
    var x;
    var y;
    var control_x;
    var control_y;
    var tap_x;
    var tap_y;
    var control_pressed = false;
    var stopped = false;
    var clock;
    var timer = 0;
    var scheme = 2;
    document.body.style.backgroundColor = schemeColors[scheme][0];
    var tilt_control = false;
    txt = ["To move the ball, tilt your device and the ball will move as if by gravity!", "To move the ball, tap anywhere on the screen and swipe in any direction without lifting your finger. It works like a joystick."];

    var grid = new Grid(mazeDimensions[0], mazeDimensions[1], cell_size);
    var prevCell = grid.ghostCell;
    grid = recursiveBacktracker(grid);
    var startingCell = grid.findStartingPosition();
    x = (startingCell.column + 0.5) * cell_size[0] + offset[0];
    y = (startingCell.row + 0.5) * cell_size[1] + offset[1];
    grid.calculateDistances(startingCell.row, startingCell.column);
    renderRectangle(grid);
    renderBall();
    speedX = 0;
    speedY = 0;
    var forceCell = grid.ghostCell;

    var visitedCells = [];

    setInterval(handleLinearMovement,16);

    function findMazeSize(rows, cols, max_width, max_height) {
        var xx = 0;
        while ((xx + 1) * cols < max_width) {
            xx += 1;
        }
        var yy = 0;
        while ((yy + 1) * rows < max_height) {
            yy += 1;
        }
        return [xx, yy];
    }

    function handleLinearMovement() {
        if (!stopped) {
            var relX = x - offset[0];
            var relY = y - offset[1];
            var thisCell = grid.getCellByCoordinates(relX, relY, cell_size);
            if (forceCell != grid.ghostCell) {
                thisCell = forceCell;
                forceCell = grid.ghostCell;
            }

            if (thisCell === grid.ghostCell && prevCell.exit != -1) { // win
                stopped = true;
                control_pressed = false;
                speedX = speedY = 0;
                renderBall();
                clearInterval(clock);
                var lblWin = document.getElementById("lblWin");
                lblWin.style.display = "flex";
                document.getElementById("backgroundWin").style.display = "block";
                document.querySelector("#btnExit").addEventListener("touchend",function() {
                    document.location = "index.html";
                });
                document.querySelector("#btnExit").addEventListener("click",function() {
                    document.location = "index.html";
                });
                new Fireworks(window.innerWidth, window.innerHeight)
            } else {
                prevCell = thisCell;

                var newX = relX + speedX;
                var newY = relY + speedY;
                var newCell = grid.getCellByCoordinates(newX, newY, cell_size);

                var off = ballRadius + lineWidth;
                var cornerCheck = grid.checkCorner(relX, relY, ballRadius + 2, cell_size);
                var onCorner = false;
                if (cornerCheck.length > 3) {
                    onCorner = true;
                }
                var limX = [thisCell.column * cell_size[0] + off, (thisCell.column + 1) * cell_size[0] - off];
                var limY = [thisCell.row * cell_size[1] + off, (thisCell.row + 1) * cell_size[1] - off];

                if (newCell === thisCell || newCell === thisCell.north || newCell === thisCell.east || newCell === thisCell.south || newCell === thisCell.west) {
                } else {
                    forceCell = thisCell;
                    newX = relX;
                    newY = relY;
                }
                if (newX < limX[0]) {
                    if (!thisCell.linked(thisCell.west.cellNumber()) && thisCell.exit != 3) {
                        newX = thisCell.column * cell_size[0] + off;
                    }
                }
                if (newX > limX[1] && !thisCell.linked(thisCell.east.cellNumber()) && thisCell.exit != 1) {
                    newX = (thisCell.column + 1) * cell_size[0] - off;
                }
                if (newY < limY[0] && thisCell.exit != 0) {
                    if (!thisCell.linked(thisCell.north.cellNumber())) {
                        newY = thisCell.row * cell_size[1] + off;
                    }
                }
                if (newY > limY[1] && thisCell.exit != 2) {
                    if (!thisCell.linked(thisCell.south.cellNumber())) {
                        newY = (thisCell.row + 1) * cell_size[1] - off;
                    }
                }
                x = Math.round(newX) + offset[0];
                y = Math.round(newY) + offset[1];
                renderBall();

                if (!visitedCells.includes(thisCell)) {
                    visitedCells.push(thisCell);
                }
            }
        }
    }

    function renderRectangle(grid) {
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < grid.rows; i++) {
            for (var j = 0; j < grid.grid[i].length; j++) {
                var pos = [j * cell_size[0],i * cell_size[1]];
                var thisCell = grid.grid[i][j];
                if (i === 0 && thisCell.exit != 0) { // draw top border
                    drawLine(ctx, pos[0], pos[1], pos[0] + cell_size[0], pos[1]);
                }
                if (!thisCell.linked(thisCell.south.cellNumber()) && thisCell.exit != 2) { // draw bottom border
                    drawLine(ctx, pos[0], pos[1] + cell_size[1], pos[0] + cell_size[0], pos[1] + cell_size[1]);
                }
                if (j === 0 && thisCell.exit != 3) { // draw left border
                    drawLine(ctx, pos[0], pos[1], pos[0], pos[1] + cell_size[1]);
                }
                if (!thisCell.linked(thisCell.east.cellNumber()) && thisCell.exit != 1) { // draw right border
                    drawLine(ctx, pos[0] + cell_size[0], pos[1], pos[0] + cell_size[0], pos[1] + cell_size[1]);
                }
                // ctx.beginPath();
                // ctx.fillStyle = "rgb(50,50,50)";
                // ctx.font = "20px Arial";
                // ctx.textAlign = "center";
                // ctx.fillText(thisCell.distance, pos[0]  + offset[0] + cell_size[0] / 2, pos[1] + cell_size[1] + offset[1] - 16);
            }
        }
    }

    function drawLine(ctx, _x1, _y1, _x2, _y2) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.moveTo(_x1 + offset[0], _y1 + offset[1]);
        ctx.lineTo(_x2 + offset[0], _y2 + offset[1]);
        ctx.strokeStyle = schemeColors[scheme][3];
        ctx.stroke();
    }

    function renderBall() {
        ctxBall.clearRect(0, 0, width, height);
        ctxBall.beginPath();
        ctxBall.arc(x, y, ballRadius, 0, 2 * Math.PI);
        ctxBall.fillStyle = schemeColors[scheme][1];
        ctxBall.fill();
        ctxBall.beginPath();
        ctxBall.arc(x, y, ballRadius, 0, 2 * Math.PI);
        ctxBall.strokeStyle = schemeColors[scheme][2];
        ctxBall.lineWidth = (lineWidth - 1 > 0) ? lineWidth - 1 : lineWidth;
        ctxBall.stroke();

        if (!tilt_control && control_pressed) {
            ctxBall.beginPath();
            ctxBall.arc(control_x, control_y, 16, 0, 2 * Math.PI);
            ctxBall.fillStyle = "rgba(255,255,255,0.7)";
            ctxBall.fill();
            ctxBall.lineWidth = "2px";
            ctxBall.strokeStyle = "rgba(200,200,200,0.7)";
            ctxBall.stroke();

            ctxBall.beginPath();
            ctxBall.arc(tap_x, tap_y, 8, 0, 2 * Math.PI);
            ctxBall.fillStyle = "rgba(255,255,255,0.7)";
            ctxBall.fill();
            ctxBall.strokeStyle = "rgba(200,200,200,0.7)";
            ctxBall.stroke();
            
        }
    }

    clock = setInterval(function() {
        timer++;
    },1000);

    const handleDown = ({ x, y }) => {
        control_x = tap_x = x;
        control_y = tap_y = y;
        control_pressed = true;
    }

    const handleMove = ({ x, y }) => {
        if (control_pressed) {
            tap_x = x;
            tap_y = y;
            speedX = ((tap_x - control_x) / 2) * (screenQuotient);
            speedY = ((tap_y - control_y) / 2) * (screenQuotient);
            while (Math.pow(speedX,2) + Math.pow(speedY,2) > maxSpeed) {
                speedX *= 0.9;
                speedY *= 0.9;
            }
            speedX = Math.floor(speedX);
            speedY = Math.floor(speedY);
        }
    }

    const handleUp = () => {
        control_pressed = false;
        speedX = speedY = 0;
    }

    document.addEventListener("touchstart", function(e) {
        handleDown({ x: e.touches[0].clientX, y: e.touches[1].clientY })
    });

    document.addEventListener("touchmove", function(e) {
        handleMove({ x: e.touches[0].clientX, y: e.touches[1].clientY })
    }, false); // prevent scrolling

    document.addEventListener("touchend",function() {
        handleUp()
    });

    document.addEventListener('mousedown', (e) => {
        handleDown({ x: e.clientX, y: e.clientY })
    })

    document.addEventListener('mousemove', (e) => {
        handleMove({ x: e.clientX, y: e.clientY })
    })

    document.addEventListener('mouseup', () => handleUp())
    
};