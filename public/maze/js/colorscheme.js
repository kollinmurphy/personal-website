window.onload = function() {
    var vibrateLength = 5;

    document.addEventListener("touchmove", function(event) {
        event.preventDefault();
    }, false); // prevent scrolling

    var scheme = Android.getColorScheme();
    // var scheme = 0;
    var numSchemes = schemeColors.length;
    document.body.style.backgroundColor = schemeColors[scheme][0];
    var width = window.innerWidth;
    var height = window.innerHeight;
    var margin = Math.min(Math.round(width * 0.05), Math.round(height * 0.05));
    var lineWidth = 2;

    var c = document.getElementById('myCanvas');
    c.width = width;
    c.height = height;
    var ctx = c.getContext('2d');

    var mazeDimensions = [18, 10];
    var cell_size = findMazeSize(mazeDimensions[0], mazeDimensions[1], width - margin * 2, height - margin * 2);
    var mazeSize = [cell_size[0] * mazeDimensions[1], cell_size[1] * mazeDimensions[0]];
    var offset = [Math.round((width - mazeSize[0]) / 2), Math.round((height - mazeSize[1]) / 2)];
    var ballRadius = Math.round(Math.min(mazeSize[0],mazeSize[1]) / Math.min(mazeDimensions[0],mazeDimensions[1]) / 3) - 1;
    var x;
    var y;

    var grid = new Grid(mazeDimensions[0], mazeDimensions[1], cell_size);
    grid = recursiveBacktracker(grid);
    var startingCell = grid.findStartingPosition();
    x = (startingCell.column + 0.5) * cell_size[0] + offset[0];
    y = (startingCell.row + 0.5) * cell_size[1] + offset[1];
    grid.calculateDistances(startingCell.row, startingCell.column);
    renderRectangle(grid);
    renderBall();

    var touchedBack = false;

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
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = schemeColors[scheme][1];
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = schemeColors[scheme][2];
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.rect(0,156,window.innerWidth,94);
        ctx.fill();

        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.font = "24px monospace";
        ctx.fillStyle="black";
        ctx.fillText("Tap the screen to switch",window.innerWidth / 2,200);
        ctx.fillText("between color schemes.",window.innerWidth / 2,240);
    }

    document.querySelector("#btnBack").addEventListener("touchend",function() {
        // Android.vibrate(vibrateLength);
        touchedBack = true;
        Android.saveColorScheme(scheme)
        document.location = "settings.html";
    });

    c.addEventListener("touchend",function() {
        incScheme(1);
    });

    function incScheme(amount) {
        if (touchedBack === false) {
            // Android.vibrate(vibrateLengte);
            scheme += amount;
            if (scheme < 0) {
                scheme = numSchemes - 1;
            } else if (scheme > numSchemes - 1) {
                scheme = 0;
            }
            document.body.style.backgroundColor = schemeColors[scheme][0];
            renderRectangle(grid);
            renderBall();
        }
    }

};