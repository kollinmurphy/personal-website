window.onload = function() {

    var vibrateLength = 5;

    var btnEasy = document.querySelector("#btnEasy")
    var btnMed = document.querySelector("#btnMed")
    var btnHard = document.querySelector("#btnHard")
    var btnExtreme = document.querySelector("#btnExtreme");

    var chosen = false;
    var toastIsShowing = false;

    btnEasy.addEventListener("touchend",function() {
        chosenDifficulty(0);
    });

    btnMed.addEventListener("touchend",function() {
        chosenDifficulty(1);
    });

    btnHard.addEventListener("touchend",function() {
        chosenDifficulty(2);
    });

    btnExtreme.addEventListener("touchend",function() {
        chosenDifficulty(3);
    });
    btnEasy.addEventListener("click",function() {
        chosenDifficulty(0);
    });

    btnMed.addEventListener("click",function() {
        chosenDifficulty(1);
    });

    btnHard.addEventListener("click",function() {
        chosenDifficulty(2);
    });

    btnExtreme.addEventListener("click",function() {
        chosenDifficulty(3);
    });

    function chosenDifficulty(diff) {
        if (!chosen) {
            chosen = true;
            var moveThese = [];
            var growThis;
            var j = 0;
            var topFactor = 0;
            var lockRight = -95;
            switch (diff) {
                case 0:
                    moveThese.push(btnMed);
                    moveThese.push(btnHard);
                    moveThese.push(btnExtreme);
                    growThis = btnEasy;
                    topFactor = 0.5;
                    break;
                case 1:
                    moveThese.push(btnEasy);
                    moveThese.push(btnHard);
                    moveThese.push(btnExtreme);
                    growThis = btnMed;
                    topFactor = 1.5;
                    break;
                case 2:
                    moveThese.push(btnMed);
                    moveThese.push(btnEasy);
                    moveThese.push(btnExtreme);
                    growThis = btnHard;
                    topFactor = 2.5;
                    break;
                case 3:
                    moveThese.push(btnMed);
                    moveThese.push(btnHard);
                    moveThese.push(btnEasy);
                    growThis = btnExtreme;
                    topFactor = 3.5;
            }
            setInterval(function() {
                if (j > 60) {
                    document.location = `maze.html?difficulty=${diff}`;
                }
                for (var i = 0; i < 3; i++) {
                    var left = parseInt(moveThese[i].style.left);
                    if (isNaN(left)) {
                        left = 0;
                    }
                    moveThese[i].style.left = (left + 50) + "px";
                }
                lockRight -= 50;
                growThis.style.padding = (j * 3 * (topFactor + 1) + 16) + "px";
                growThis.style.top = (-j * 3 * topFactor) + "px";
                j += 5;
            }, 50);
        }
    }

};