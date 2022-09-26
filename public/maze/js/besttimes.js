window.onload = function() {

    var txt = "<div id='flex'>";
    var bestTimesTotal = Android.getBestTimes();
    var bestTimes = bestTimesTotal.split("-");
    // bestTimes = "0,0,0-0,0,0-0,0,0-0,0,0".split("-");
    txt += joinTimes(bestTimes[0],"EASY");
    txt += joinTimes(bestTimes[1],"MEDIUM");
    txt += joinTimes(bestTimes[2],"HARD");
    txt += joinTimes(bestTimes[3],"EXTREME");
    txt += "<div class='label'></div></div>";
    document.getElementById('bestTimes').innerHTML = txt;
    var premium = Android.isPremium();

    function joinTimes(bestTime,difficulty) {
        var origText = "<div class='label'>" + difficulty + ":</div>";
        var text = origText;
        var splitTimes = bestTime.split(",");
    	for (var i = 0; i < 3; i++) {
    		if (splitTimes[i] != 0) {
    			text += "<div class='time'>" + (i + 1) + ". " + splitTimes[i] + " s</div>";
    		}
    	}
    	if (text === origText) {
            if (difficulty === 3 && !premium) {
                text += "<div class='time'>Download Mazing Race Premium to play on Extreme!</div>";
            } else {
                text += "<div class='time'>No best times yet!</div>";
            }
    	}
    	return text;
    }

    var touchedReset = false;
    var vibrateLength = 5;

    document.querySelector("#btnOptions").addEventListener("touchend",function() {
        // Android.vibrate(vibrateLength);
        document.querySelector("#reset").style.display = "block";
        touchedReset = true;
        setTimeout(function() {touchedReset = false;},25);
    });

    document.querySelector("#btnNoReset").addEventListener("touchend",function() {
        // Android.vibrate(vibrateLength);
        document.querySelector("#reset").style.display = "none";
    });

    document.querySelector("#btnReset").addEventListener("touchend",function() {
        // Android.vibrate(vibrateLength);
        Android.setDifficulty(4);
        if (Android.getTilt()) {
            document.location="levelphone.html";
        } else {
            document.location = "maze.html";
        }
    });

    document.querySelector("#reset").addEventListener("touchend",function() {
        touchedReset = true;
        setTimeout(function() {touchedReset = false;},25);
    });

    document.querySelector("#btnBack").addEventListener("touchend",function() {
        // Android.vibrate(vibrateLength);
        document.location = "index.html";
    });

    document.addEventListener("touchend",function() {
        if (touchedReset === false) {
            document.querySelector("#reset").style.display = "none";
        }
    });
};