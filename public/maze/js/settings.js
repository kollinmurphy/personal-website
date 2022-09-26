window.onload = function() {
    var vibrateLength = 5;
    
    var sTilt = document.querySelector("#sliderTilt");
    var sScreen = document.querySelector("#sliderOnScreen");

    var sliderTilt = new Slider(sTilt,Android.getTilt(),document.querySelector("#divTilt"),sScreen);
    var sliderOnScreen = new Slider(sScreen,!Android.getTilt(),document.querySelector("#divScreen"),sTilt);

    var premium = Android.isPremium();
    if (premium) {
        document.querySelector("#divPremium").innerHTML = "Thanks for supporting the developer!";
        document.querySelector("#divPremium").style.display = "none";
    }

    // var sliderTilt = new Slider(sTilt,true,document.querySelector("#divTilt"));
    // var sliderOnScreen = new Slider(sScreen,false,document.querySelector("#divScreen"));

    sliderTilt.setOpp(sliderOnScreen);
    sliderOnScreen.setOpp(sliderTilt);

    document.querySelector("#btnBack").addEventListener("touchend",function() {
        // Android.vibrate(vibrateLength);
        document.location = "index.html";
    });

    document.querySelector("#btnColorSchemes").addEventListener("touchend",function() {
        // Android.vibrate(vibrateLength);
        document.location = "colorscheme.html";
    });

    document.querySelector("#btnUpgrade").addEventListener("touchend",function() {
        // Android.vibrate(vibrateLength);
        Android.buyPremium();
//        final String appPackageName = getPackageName(); // getPackageName() from Context or Activity object

//        document.location = "https://play.google.com/store/apps/details?id=com.luckymurphy.mazingrace"
    });

};