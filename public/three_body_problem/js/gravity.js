const G = 100;

function calculateMaxMagnitudes(mass1, mass2, mass3) {
    let totalMass = mass1.mass + mass2.mass + mass3.mass;
    let totalMax = 20 * totalMass;
    let massRatios = [mass1.mass / totalMass, mass2.mass / totalMass, mass3.mass / totalMass];
    mass1.maxMagnitude = massRatios[0] * totalMax;
    mass2.maxMagnitude = massRatios[1] * totalMax;
    mass3.maxMagnitude = massRatios[2] * totalMax;
}

function calculateGravity(mass1, mass2) {
    let den = (calculateDistance(mass1, mass2) ** 2);
    if (den < 0.1){
        den = .1;
    }
    let magnitude = (G * mass1.mass * mass2.mass) / den;
    // console.log(magnitude);
    if (magnitude > mass1.maxMagnitude) {
        magnitude = mass1.maxMagnitude;
        //unchange the movement
    }
    let direction = calculateAngle(mass1.x, mass1.y, mass2.x, mass2.y);
    return new Vector(direction, magnitude);
}

function calculateDistance(mass1, mass2) {
    let xDist = mass1.x - mass2.x;
    let yDist = mass1.y - mass2.y;
    return Math.sqrt(xDist ** 2 + yDist ** 2) / 12;
}

function calculateAngle(x1, y1, x2, y2) { 
    let xDist = x2 - x1;
    let yDist = y2 - y1;
    let dist = checkNaN(Math.sqrt(xDist ** 2 + yDist ** 2));

    let theta = checkNaN(Math.asin(yDist / dist));

    if ((xDist < 0 && yDist > 0) || (xDist < 0 && yDist < 0)) { q = 2; theta = (Math.PI) + (theta * (-1)); } // quadrant II or III
    if (xDist > 0 && yDist < 0) { theta = 2 * Math.PI + theta; q = 4; } // quadrant IV
    if (yDist === 0 && xDist < 0) { theta = Math.PI; }
    if (xDist === 0 && yDist > 0) { theta = Math.PI / 2; }
    if (xDist === 0 && yDist < 0) { theta = Math.PI * 1.5; }
    if (yDist === 0 && xDist > 0) { theta = 0; }
    if (theta < 0) { theta += Math.PI * 2; }
    if (theta > Math.PI * 2) { theta -= Math.PI * 2; }

    return Math.abs(Math.PI * 2 - theta);
}

function checkNaN(num) {
    if (Number.isNaN(num) || Math.abs(num) < 0.001) {
        return 0;
    } else {
        return num;
    }
}

function getCenterOfMass(masses) {
    if (masses.length > 0){
        var numX = 0;
        var den = 0;
        var numY = 0;
        for (let i = 0; i < masses.length; i++) {
            numX += masses[i].x * masses[i].mass;
            numY += masses[i].y * masses[i].mass;
            den += masses[i].mass;
        }
        var x = numX/den;
        var y = numY/den;
        return [x, y];
    }
    else {
        return [-100, -100];
    }
}

function recenter(masses, point) {
    // remember old center?
    // fix it
    // move other masses the same
    let oldCenter = point.origin;
    let currentCenter = point.getCenter();
    let difX = oldCenter[0] - currentCenter[0];
    let difY = oldCenter[1] - currentCenter[1];
    point.moveToOrigin();
    for (let i = 0; i < masses.length; i++){
        masses[i].x += difX;
        masses[i].y += difY;
    }
}
