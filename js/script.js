"use strict";
(function() {
    const objectWithGame = {
        chooseCountCards: 0,
        timeForGame: 60,
        arrayForStartPosition: [],
        arrayOfValues: [],

        createArray(countOfItems) {
            let returnArray = [];
            for (let i = 1; i < countOfItems / 2 + 1; i++) {
                returnArray.push(i, i);
            }
            return returnArray;
        },

        shuffleArray(array) {
            array.sort(() => Math.random() - 0.5);
            return array;
        },

        sleepBeforeRemove(array) {
            return function() {
                array[0].classList.toggle("game__hidden");
                array[1].classList.toggle("game__hidden");
            };
        },

        restartGame() {
            location.reload(true);
        },

        compareValues(context) {
            return function (event) {
                let checkStatesForWin = [];
                let winningHeading = document.querySelector(".game__heading");

                context.arrayOfValues.push(event.target);

                if (context.arrayOfValues.length === 1) {
                    context.arrayOfValues[0].removeEventListener('click', context.compareValues);
                    context.arrayOfValues[0].classList.toggle("game__hidden");
                } else {
                    context.arrayOfValues[1].classList.toggle("game__hidden");
                    context.arrayOfValues[1].removeEventListener('click', context.compareValues);
        
                    if (context.arrayOfValues[0].textContent !== context.arrayOfValues[1].textContent) {
                        context.arrayOfValues[0].addEventListener("click", context.compareValues);
                        context.arrayOfValues[1].addEventListener("click", context.compareValues);
        
                        setTimeout(context.sleepBeforeRemove(context.arrayOfValues), 300);
                    } else {
                        context.arrayOfValues[0].classList.add("game__done");
                        context.arrayOfValues[1].classList.add("game__done");
        
                        checkStatesForWin = document.querySelectorAll(".game__done");

                        if (checkStatesForWin.length === context.arrayForStartPosition.length) {
                            winningHeading.style.display = "block";
                        }
                    }
        
                    context.arrayOfValues = [];
                }
            };
        },


        createFullGame() {
            let divContainer = document.createElement("div");
            let listOfCards = document.createElement("ul");
            let restartButton = document.createElement("button");
            let victoryHeading = document.createElement("h2");
            let timeForPlaying = document.createElement("p");
            
            restartButton.innerHTML = "Restart game";
            victoryHeading.innerHTML = "WIN!!!";
            // timeForPlaying.innerHTML = this.timeForGame;

            // let timerForGameId = setInterval(function() {
            //     this.timeForGame--;
            //     timeForPlaying.innerHTML = this.timeForGame;
            // }, 1000);

            // setTimeout(() => clearInterval(timerForGameId), 60000);

            // restartButton.addEventListener("click", this.restartGame);
    
            divContainer.classList.add("container");
            listOfCards.classList.add("game__list");
            restartButton.classList.add("game__restart");
            victoryHeading.classList.add("game__heading");
    
            for (let item of this.arrayForStartPosition) {
                let element = document.createElement("li");     
                element.textContent = item;
                element.classList.add("game__item", "game__hidden");
                element.addEventListener("click", this.compareValues(this));
                listOfCards.append(element);
            }
    
            divContainer.append(victoryHeading);
            divContainer.append(listOfCards);
            divContainer.append(restartButton);
            divContainer.append(timeForPlaying);
            document.body.append(divContainer);
        },

        
        startGame() {
            while (this.chooseCountCards % 2 !== 0 ||
                this.chooseCountCards === 0 || 
                this.chooseCountCards === null || 
                this.chooseCountCards === undefined) {
                this.chooseCountCards = parseInt(prompt("Сколько хотите добавить карточек", ""));
            }
        
            this.arrayForStartPosition = this.createArray(this.chooseCountCards);
            this.arrayForStartPosition = this.shuffleArray(this.arrayForStartPosition);
            this.createFullGame();
        }
    };
    
    objectWithGame.startGame();
})();