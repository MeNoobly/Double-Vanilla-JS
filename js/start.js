"use strict";
(function() {
    const startDoublesApp = {
        addValues() {
            let startCount = document.getElementById("start__count").value;
            let startTime = document.getElementById("start__time").value;

            startCount = parseInt(startCount);
            startTime = parseInt(startTime);

            localStorage.setItem("startCount", startCount);
            localStorage.setItem("startTime", startTime);
        },

        goToDoublesApp() {
            let startButton = document.getElementById("start__button");
            startButton.addEventListener("click", this.addValues);
        }
    };
    
    startDoublesApp.goToDoublesApp();
})();