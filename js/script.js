"use strict";
(function() {
    const objectWithGame = {
        chooseCountCards: 0,
        timeForGame: localStorage.getItem("startTime"),
        arrayForStartPosition: [],
        arrayOfValues: [],
        statusOfGame: 1,
        doneId: [],

        createArray(countOfItems) {
            let returnArray = [];
            for (let i = 1; i < countOfItems / 2 + 1; i++) {
                returnArray.push(i, i); // create array with numbers (like 1, 1, 2, 2 ... countOfItems, counteOfItems)
            }
            return returnArray;
        },

        shuffleArray(array) {
            return array.sort(() => Math.random() - 0.5); // shuffle index of array
        },

        sleepBeforeRemove(array) {
            return () => array.forEach(item => item.classList.toggle("game__hidden")); // hide elements from page
        },

        restartGame() {
            location.reload(true); // reload page
        },

        compareValues(context) {
            return function compareValuesEvent() {
                if (context.statusOfGame) { // if timer not end
                    let choosenElements = document.querySelectorAll(".game__choose"); // get all choosen elements

                    if (choosenElements.length === 0 && // if this elements is first
                        !context.doneId.includes(this.id) ) { // if this elements not choosen earlier
                        this.classList.add("game__choose"); // choose element
                        this.classList.toggle("game__hidden"); // show element on page
                        choosenElements = document.querySelectorAll(".game__choose"); // get all choosen elements
                    }

                    else if (choosenElements.length === 1 && // if this elements is second
                        this.id !== choosenElements[0].id && // if this element not equal to first element
                        !context.doneId.includes(this.id)) { // if this elements not choosen earlier

                        this.classList.add("game__choose"); // choose element
                        this.classList.toggle("game__hidden"); // show element on page
                        choosenElements = document.querySelectorAll(".game__choose"); // get all choosen elements

                        if (choosenElements[0].textContent === choosenElements[1].textContent) { // if elements equals
                            choosenElements[0].classList.add("game__done"); // add done class to element
                            choosenElements[1].classList.add("game__done"); // add done class to element
                            
                            context.doneId.push(choosenElements[0].id, choosenElements[1].id); // add elements to array with done items
                        } else {
                            setTimeout(context.sleepBeforeRemove(choosenElements), 300); // hide not equals elements
                        }

                        setTimeout(() => choosenElements.forEach(item => item.classList.remove("game__choose")), 300); // delete class game__choose from elements        
                    } 
                }
            };
        },

        createFullGame() {
            // create DOM elements
            let divContainer = document.createElement("div");
            let listOfCards = document.createElement("ul");
            let restartButton = document.createElement("button");
            let stateHeading = document.createElement("h2");
            let timeForPlaying = document.createElement("p");

            restartButton.innerHTML = "Restart game";
            timeForPlaying.innerHTML = this.timeForGame; // add timeForGame on page

            restartButton.addEventListener("click", this.restartGame); // add fuction restartGame to restartButton
            
            // Add clases to elements
            divContainer.classList.add("container");
            listOfCards.classList.add("game__list");
            restartButton.classList.add("game__restart");
            stateHeading.classList.add("game__heading");
            
            let iterrator = 0; // iterrator for id
            for (let item of this.arrayForStartPosition) {
                let element = document.createElement("li");    
                element.textContent = item; // textContent equal value of array
                element.classList.add("game__item", "game__hidden");
                element.id = String(iterrator); // add unique id for element
                element.addEventListener("click", this.compareValues(this), false); // add event "click" with function with compareElements
                listOfCards.append(element); // add element to DOM
                iterrator++;
            }

            let timerForGameId = setInterval(() => {
                let stateHeading = document.querySelector(".game__heading");
                
                timeForPlaying.innerHTML = --this.timeForGame; // decriment time

                if (this.timeForGame === 0) {
                    this.statusOfGame = 0; // if time done, off game
                    stateHeading.innerHTML = "Loose";
                    stateHeading.style.display = "block";
                }

                let winningArray = document.querySelectorAll(".game__done"); // get all done elements

                if (this.chooseCountCards === winningArray.length) { // if all element is done
                    let stateHeading = document.querySelector(".game__heading");

                    stateHeading.innerHTML = "Win";
                    stateHeading.style.display = "block";

                    clearInterval(timerForGameId);
                }

            }, 1000);

            setTimeout(() => clearInterval(timerForGameId), this.timeForGame * 1000); // end timer

            // add elements in DOM
            divContainer.append(stateHeading);
            divContainer.append(listOfCards);
            divContainer.append(restartButton);
            divContainer.append(timeForPlaying);
            document.body.append(divContainer);
        },
        
        startGame() {
            // while (this.chooseCountCards % 2 !== 0 ||
            //     this.chooseCountCards === 0 || 
            //     this.chooseCountCards === null || 
            //     this.chooseCountCards === undefined) {
            //     this.chooseCountCards = parseInt(prompt("Сколько хотите добавить карточек", ""));
            // }
        
            // this.arrayForStartPosition = this.createArray(localStorage.getItem("startCount")); // create array with input count of cards
            this.arrayForStartPosition = this.createArray(Number(localStorage.getItem("startCount")));
            this.chooseCountCards = Number(localStorage.getItem("startCount"));
            this.arrayForStartPosition = this.shuffleArray(this.arrayForStartPosition); // shuffle places
            this.createFullGame(); // create game
        }
    };
    
    objectWithGame.startGame();
})();