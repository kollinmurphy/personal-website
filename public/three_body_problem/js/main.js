window.onload = function () {
    let cvs = document.querySelector("#canvasForeground");
    let cvsBackground = document.querySelector("#canvasBackground");

    var painter = new Painter(cvs);
    var painterBackground = new Painter(cvsBackground);
    painter.addObject(painterBackground);
    painterBackground.addObject(new Background("black", 1));
    painterBackground.addObject(new Stars());
    painter.draw();

    let colors = ["FFF07C", "FFAAEA", "80FF72", "d319d7", "eb7a49", "e01b12", "17BEBB", "F61067"];

    var sliders = [document.getElementById("m1"), document.getElementById("m2"), document.getElementById("m3")];
    var angle = [document.getElementById("a1"), document.getElementById("a2"), document.getElementById("a3")];
    var velocity = [document.getElementById("v1"), document.getElementById("v2"), document.getElementById("v3")];
    var masses = [];
    var maxMagnitudes = [];
    var on = false;
    var clock;
    var point;



    // Update the current slider value (each time you drag the slider handle)
    for (let i = 0; i < 3; i++) {
        sliders[i].oninput = function () {
            if (masses.length > i) {
                masses[i].mass = parseInt(this.value);
                maxMagnitudes = calculateMaxMagnitudes(masses[0], masses[1], masses[2]);
                painter.draw();
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        angle[i].oninput = function () {
            if (masses.length > i) {
                masses[i].vector.direction = parseInt(this.value) / 1000;
                painter.draw();
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        velocity[i].oninput = function () {
            if (masses.length > i) {
                masses[i].vector.magnitude = parseInt(this.value);
                painter.draw();
            }
        }
    }

    window.addEventListener("click", function (e) {
        if (masses.length < 3) {
            let rand = Math.floor(Math.random() * colors.length);
            let removedColor = colors.splice(rand, 1)[0];
            let mass = new Mass(painter, e.clientX, e.clientY, sliders[masses.length].value, painterBackground, masses.length, 1, "#" + removedColor, velocity[masses.length].value, angle[masses.length].value);
            masses.push(mass);
            painter.addObject(mass);
            painter.draw();
        }
        if (masses.length == 3) {
            document.querySelector("#slidecontainercontainer").style.display = "block";
            document.querySelector("#txtInfo").style.display = "none";
            document.querySelector("#mainButtons").style.display = "inline";
            point = new Point(masses);
            painter.addObject(point);
            painter.draw();
        }
    });

    $("#btnRun").click(function () {
        on = !on;
        if (on) {
            maxMagnitudes = calculateMaxMagnitudes(masses[0], masses[1], masses[2]);
            document.querySelector("#btnRun").innerHTML = "Stop";
            // document.querySelector("#divInitVelocity").style.display = "none";
            var timestep = 10;
            clock = setInterval(function () {
                updateVectors(masses);
                updatePosition(masses, timestep, point);
                painter.draw();
            }, timestep);
        } else {
            document.querySelector("#btnRun").innerHTML = "Run";
            clearInterval(clock);
        }
    });

    for (let i = 0; i < 3; i++) {
        $("#btnImg" + i).click(function () {
            masses[i].nextIcon();
            painter.draw();
        });
    }

    $("#btnHide").click(function () {
        let container = $("#detailsContainer");
        if (!container.is(":visible")) {
            this.innerHTML = "Hide Details";
            container.show();
        } else {
            this.innerHTML = "Show Details";
            container.hide();
        }
    });

    $("#btnMass").click(function () {
        $("#btnMass").addClass("btn-success");
        $("#btnMass").removeClass("btn-secondary");
        $("#btnAngle").addClass("btn-secondary");
        $("#btnAngle").removeClass("btn-success");
        $("#btnVelocity").addClass("btn-secondary");
        $("#btnVelocity").removeClass("btn-success");
        for (let i = 1; i < 4; i++) {
            $("#label" + i).html("Mass " + i);
            $("#m" + i).show();
            $("#v" + i).hide();
            $("#a" + i).hide();
        }
    });

    $("#btnVelocity").click(function () {
        $("#btnVelocity").addClass("btn-success");
        $("#btnVelocity").removeClass("btn-secondary");
        $("#btnAngle").addClass("btn-secondary");
        $("#btnAngle").removeClass("btn-success");
        $("#btnMass").addClass("btn-secondary");
        $("#btnMass").removeClass("btn-success");
        for (let i = 1; i < 4; i++) {
            $("#label" + i).html("Velocity " + i);
            $("#m" + i).hide();
            $("#v" + i).show();
            $("#a" + i).hide();
        }
    });

    $("#btnAngle").click(function () {
        $("#btnAngle").addClass("btn-success");
        $("#btnAngle").removeClass("btn-secondary");
        $("#btnVelocity").addClass("btn-secondary");
        $("#btnVelocity").removeClass("btn-success");
        $("#btnMass").addClass("btn-secondary");
        $("#btnMass").removeClass("btn-success");
        for (let i = 1; i < 4; i++) {
            $("#label" + i).html("Angle " + i);
            $("#m" + i).hide();
            $("#v" + i).hide();
            $("#a" + i).show();
        }
    });

}

