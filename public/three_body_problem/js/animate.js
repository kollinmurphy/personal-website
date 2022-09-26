function updateVectors(masses) {
    for (let i = 0; i < masses.length; i++) {
        for (let j = 0; j < masses.length; j++) {
            if (i != j) {
                let vector = calculateGravity(masses[i], masses[j]);
                if ((i == 2 && j == 0) || i == 1) {
                    // vector.direction += Math.PI;
                    // if (vector.direction > Math.PI * 2) {
                    //     vector.direction -= Math.PI * 2;
                    // }
                }
                masses[i].vector = masses[i].vector.addVector(vector);
            }
        }
    }
}

function updatePosition(masses, t, point) {
    //get vector(direction, magnitude)
    //update x, y based on vector and timestep
    for (let i = 0; i < masses.length; i++){
        let m = masses[i];
        let v = m.vector;
        m.x += (v.get_x_component() * t / 2) / (masses[i].mass * 500);
        m.y += (v.get_y_component() * t / 2) / (masses[i].mass * 500);

        // if (m.x < 0) {
        //     m.x += window.innerWidth;
        // } else if (m.x > window.innerWidth) {
        //     m.x -= window.innerWidth;
        // }
        // if (m.y < 0) {
        //     m.y += window.innerHeight;
        // } else if (m.y > window.innerHeight) {
        //     m.y -= window.innerHeight;
        // }
    }
    recenter(masses, point);
}



