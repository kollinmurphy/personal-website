schemeColors = [["rgb(238,202,175)","rgb(28,137,191)","rgb(19,79,146)","rgb(9,37,61)"],["rgb(219,219,219)","blue","black","black"],["black","rgb(34,153,40)","white","white"],["rgb(19,62,89)","orange","rgb(14,45,61)","yellow"],["rgb(6,30,4)","red","red","green"]];
    
var i;

class Cell { // the object to hold the properties of each individual cell
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this._links = [];
        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;
        this.distance = null;
        this.exit = -1;
    }
    link(cell, bidi) {
        // links the current cell to another cell. 
        // input is cell object, not cell number. 
        // bidi (bidirectional) sets whether to mark the current cell as linked in the other cell's properties
        this._links.push(cell.cellNumber());
        if (bidi === true) {
            cell._links.push(this.cellNumber());
        }
        return 1;
    }
    links() {
        // returns an array of the cell numbers of linked cells
        return this._links;
    }
    linked(cell) {
        // checks if the cell is linked to another cell
        // input requires cell number
        var _linked = false;
        for (var i =0; i < this._links.length; i++) { // loops through links and checks if any match the same cell number
            if (this._links[i] === cell) {
                _linked = true;
                i += 10;
            }
        }
        return _linked;
    }
    listNeighbors(_onlyUnlinked = false) {
        // returns an array of the neighboring cells
        this.list = [];

            if (_onlyUnlinked === true && this.north._links.length > 0) {} else {
                if (this.north.row != -1) {
                    this.list.push(this.north);
                }
            }
            if (this.east === undefined)
                debugger
            if (_onlyUnlinked === true != -1 && this.east._links.length > 0) {} else {
                if (this.east.row != -1) {
                    this.list.push(this.east);
                }
            }
            if (_onlyUnlinked === true && this.south._links.length > 0) {} else {
                if (this.south.row != -1) {
                    this.list.push(this.south);
                }
            }
            if (_onlyUnlinked === true != -1 && this.west._links.length > 0) {} else {
                if (this.west.row != -1) {
                    this.list.push(this.west);
                }
            }
            // if (this.list[0] === null)
                // debugger
        return this.list;
    }
    cellNumber() {
        // returns a number for identifying cells
        // format:
        // 0 => row 0, col 0
        // 100 => row 1, col 0
        // 206 => row 2, col 6
        if (this === null) {
            return undefined;
        } else {
            return this.row * 100 + this.column;
        }
    }
}

class Grid {
    // the object that powers the maze
    prepare_grid() {
        // creates an array of cell objects within the grid. called by constructor
        var _rows = new Array(this.rows).fill(null);

        for (var i = 0; i < this.rows; i++) {
            _rows[i] = new Array(this.columns);
            for (var k = 0; k < this.columns; k++) {
                _rows[i][k] = new Cell(i, k);
            }
        }
        return _rows;
    }
    configure_cells() {
        // sets the neighboring cells. called by constructor
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                    if (i === 0) {
                        this.grid[i][j].north = this.ghostCell;
                    } else {
                        this.grid[i][j].north = this.grid[i - 1][j];
                    }
                    if (i === this.grid.length - 1) {
                        this.grid[i][j].south = this.ghostCell;
                    } else {
                        this.grid[i][j].south = this.grid[i + 1][j];
                    }
                    if (j === this.grid[i].length - 1) {
                        this.grid[i][j].east = this.ghostCell;
                    } else {
                        this.grid[i][j].east = this.grid[i][j + 1];
                    }
                    if (j === 0) {
                        this.grid[i][j].west = this.ghostCell;
                    } else {
                        this.grid[i][j].west = this.grid[i][j - 1];
                    }
                
            }
        }
        // console.log(this.grid);
        // debugger;
    }
    constructor(rows, columns, cell_size) {
        // initializes the grid object
        this.rows = rows;
        this.columns = columns;
        this.cell_size = cell_size;
        this.ghostCell = new Cell(-1,-1);
        this.ghostCell.distance = 0;
        this.grid = this.prepare_grid(); // the grid variable contains the two-dimensional array of cells
        this.configure_cells();

    }
    random_cell() {
        // gets a random cell. called by the maze generation algorithm
        var row = Math.floor(Math.random() * this.rows);
        var col = Math.floor(Math.random() * this.grid[row].length);
        return this.grid[row][col];
    }
    getCellByCoordinates(_x, _y, cell_size) {
        //returns a cell object based on the x-y coordinates
        var xx = Math.floor(_x / cell_size[0]);
        var yy = Math.floor(_y / cell_size[1]);
        if (yy > -1 && yy < this.grid.length) {
            if (xx > -1 && xx < this.grid[yy].length) {
                return this.grid[yy][xx];
            }
        }
        return this.ghostCell;
    }

    findStartingPosition() {
        var possiblePoints = [];
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j]._links.length === 1) {
                    possiblePoints.push(this.grid[i][j]);
                }
            }
        }
        var rand = Math.floor(Math.random() * possiblePoints.length);
        return possiblePoints[rand];
    }

    calculateDistances(rootRow, rootCol) {
        // calculates the distance between the center cell and each other cell. the furthest cell from the beginning is marked as the exit cell
        this.grid[rootRow][rootCol].distance = 0;
        markNeighbors(this.grid, this.grid[rootRow][rootCol], 1);
        var greatestDist = this.ghostCell;
            for (var i = 0; i < this.grid[this.grid.length - 1].length; i++) {
                if (this.grid[0][i].distance > greatestDist.distance) {
                    greatestDist = this.grid[0][i];
                } 
                if (this.grid[this.grid.length - 1][i].distance > greatestDist.distance) {
                    greatestDist = this.grid[this.grid.length - 1][i];
                }
            }
            for (var i = 1; i < this.rows - 1; i++) { // loop through left and right border cells, ignoring the first and last, which were already looped through
                // debugger
                if (this.grid[i][0].distance > greatestDist.distance) {
                    greatestDist = this.grid[i][0];
                }
                if (this.grid[i][this.columns - 1].distance > greatestDist.distance) {
                    greatestDist = this.grid[i][this.columns - 1];
                }
            }
        var rNum = Math.round(Math.random());
        switch (greatestDist.row) {
            case 0: 
                if (greatestDist.column === 0) {
                    greatestDist.exit = (rNum === 0) ? 3 : 0;
                } else if (greatestDist.column === this.columns - 1) {
                    greatestDist.exit = (rNum === 0) ? 1 : 0;
                } else {
                    greatestDist.exit = 0;
                }
                break;
            case this.rows - 1: 
                if (greatestDist.column === 0) {
                    greatestDist.exit = (rNum === 0) ? 3 : 2;
                } else if (greatestDist.column === this.columns - 1) {
                    greatestDist.exit = (rNum === 0) ? 1 : 2;
                } else {
                    greatestDist.exit = 2;
                }
                break;
            default:
                greatestDist.exit = (greatestDist.column === 0) ? 3 : 1;
        }
    }
    checkCorner(x,y,radius,cell_size) {
        var off = radius;
        var sqrtOff = Math.round(Math.sqrt(off));
        var cells = [];
        for (var i =0; i < 9; i++) {
            var xx = x;
            var yy = y;
            switch (i) {
                case 0: break;
                case 1: xx += off; break;
                case 2: xx -= off; break;
                case 3: yy += off; break;
                case 4: yy -= off; break;
                case 5: xx += off; yy += off; break;
                case 6: xx += off; yy -= off; break;
                case 7: xx -= off; yy += off; break;
                // case 8: xx -= sqrtOff; yy -= sqrtOff; break;
                // case 5: xx += sqrtOff; yy += sqrtOff; break;
                // case 6: xx += sqrtOff; yy -= sqrtOff; break;
                // case 7: xx -= sqrtOff; yy += sqrtOff; break;
                // case 8: xx -= sqrtOff; yy -= sqrtOff; break;
            }
            var thisCell = this.getCellByCoordinates(xx,yy,cell_size);
            if (!cells.includes(thisCell)) {
                cells.push(thisCell);
            }
        }
        return cells;
    }
}

function markNeighbors(cellArray, cell, number) {
    // used by the calculateDistances function to mark neighboring cells with a distance one greater than the previous cell. called recursively.
    //var cellNum = cell.cellNumber();
    var links = cell._links;
    for (var i = 0; i < links.length; i++) {
        var neighborCol = links[i] % 100;
        var neighborRow = (links[i] - neighborCol) / 100;
        if (cellArray[neighborRow][neighborCol].distance === null) {
            cellArray[neighborRow][neighborCol].distance = number;
            markNeighbors(cellArray, cellArray[neighborRow][neighborCol], number + 1);
        }
    }

}


function recursiveBacktracker(grid) {
    var start_at = grid.random_cell();
    var stack = [];
    stack.push(start_at);

    while (stack.length > 0) {
        var current = stack[stack.length - 1]; // grab the last element of the stack
        var _neighbors = current.listNeighbors(true);
        if (_neighbors.length === 0) {
            stack.pop();
        } else {
            var neighbor = _neighbors[Math.floor(Math.random() * _neighbors.length)];
            current.link(neighbor, true);
            stack.push(neighbor);
        }
    }

    return grid;
}