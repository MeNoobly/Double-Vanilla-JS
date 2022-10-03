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

        functionforTime(time) {
            let timeHour;
            let timeMinute;
            let timeSecond;
            let wordHour;
            let wordMinute;
            let wordSecond;
            let result;

            if (time / 3600 < 1) {
                timeHour = 0;
            } else {
                timeHour = Math.floor(time / 3600);
            }

            if ((time - timeHour * 60) / 60 < 1) {
                timeMinute = 0;
            } else {
                timeMinute = Math.floor(time / 60);
            }

            timeSecond = Math.floor(time - timeHour * 3600 - timeMinute * 60);

            switch (timeHour % 10) {
                case 1:
                    wordHour = "час";
                    break;
                case 2:
                case 3:
                case 4:
                    wordHour = "часа";
                    break;
                default:
                    wordHour = "часов";
                    break;
            }

            switch (timeMinute % 10) {
                case 1:
                    wordMinute = "минута";
                    break;
                case 2:
                case 3:
                case 4:
                    wordMinute = "минуты";
                    break;
                default:
                    wordMinute = "минут";
                    break;
            }

            switch (timeSecond % 100) {
                case 1:
                    wordSecond = "секунда";
                    break;
                case 2:
                case 3:
                case 4:
                    wordSecond = "секунды";
                    break;
                default:
                    wordSecond = "секунд";
                    break;
            }

            if (timeHour !== 0) {
                if (timeSecond !== 0) {
                    result = `Осталось ${timeHour} ${wordHour}, ${timeMinute} ${wordMinute}, ${timeSecond} ${wordSecond}`;
                } else {
                    result = `Осталось ${timeHour} ${wordHour}, ${timeMinute} ${wordMinute}`;
                }
            } else if (timeMinute !== 0) {
                if (timeSecond !== 0) {
                    result = `Осталось ${timeMinute} ${wordMinute}, ${timeSecond} ${wordSecond}`;
                } else {
                    result = `Осталось ${timeMinute} ${wordMinute}`;
                }
            } else {
                result = `Осталось ${timeSecond} ${wordSecond}`;
            }
            
            return result;
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
                            setTimeout(context.sleepBeforeRemove(choosenElements), 500); // hide not equals elements
                        }

                        setTimeout(() => choosenElements.forEach(item => item.classList.remove("game__choose")), 400); // delete class game__choose from elements        
                    } 
                }
            };
        },

        createFullGame() {
            // create DOM elements
            let divContainer = document.createElement("div");
            let startLink = document.createElement("a");
            let startButton = document.createElement("button");
            let listOfCards = document.createElement("ul");
            let restartButton = document.createElement("button");
            let stateHeading = document.createElement("h2");
            let timeForPlaying = document.createElement("p");
            let mainHeading = document.createElement("h1");
            let menuArrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            let menuArrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            let menuArrowP = document.createElement("p");
            
            startLink.href = "start.html";

            restartButton.innerHTML = "Перезапустить игру";
            timeForPlaying.innerHTML = this.functionforTime(this.timeForGame); // add timeForGame on page

            menuArrow.setAttribute("width", "20px");
            menuArrow.setAttribute("height", "20px");
            menuArrow.setAttribute("viewBox", "0 -89 219 219");
            menuArrow.setAttribute("fill", "none");
            menuArrow.setAttribute("xmlns", "http://www.w3.org/2000/svg");

            menuArrowPath.setAttribute("d", "M21.489 29.4305C36.9333 31.3498 51.3198 33.0559 65.7063 34.9753C66.7641 35.1885 67.6104 36.4681 69.9376 38.3875C63.1675 39.2406 57.8783 40.3069 52.5892 40.5201C38.6259 40.9467 24.8741 40.9467 10.9107 40.9467C9.21821 40.9467 7.5257 41.1599 5.83317 40.7334C0.332466 39.6671 -1.57164 36.0416 1.39028 31.1365C2.87124 28.7906 4.56377 26.658 6.46786 24.7386C13.6611 17.4877 21.0659 10.4499 28.4707 3.41223C29.7401 2.13265 31.6442 1.49285 34.183 0C34.6061 10.8765 23.8162 13.8622 21.489 22.3927C23.3931 21.9662 25.0856 21.7529 26.5666 21.3264C83.6894 5.54486 140.601 7.25098 197.3 22.606C203.224 24.0988 208.936 26.4447 214.649 28.5773C217.61 29.6437 220.149 31.9896 218.457 35.6151C216.976 39.2406 214.014 39.2406 210.629 37.7477C172.759 20.6866 132.561 18.7672 91.9404 19.407C70.7838 19.6203 50.0504 21.9662 29.5285 26.8713C26.9897 27.5111 24.4509 28.3641 21.489 29.4305Z");
            menuArrowPath.setAttribute("fill", "#0D1927");

            menuArrow.appendChild(menuArrowPath);

            menuArrowP.innerHTML = "В меню";
            mainHeading.innerHTML = "DOUBLE";

            restartButton.addEventListener("click", this.restartGame); // add fuction restartGame to restartButton
            
            // Add clases to elements
            divContainer.classList.add("container");
            listOfCards.classList.add("game__list");
            restartButton.classList.add("game__restart");
            stateHeading.classList.add("game__heading");
            startLink.classList.add("game__start_link");
            startButton.classList.add("game__start_button");
            mainHeading.classList.add("game__main-header");
            menuArrow.classList.add("game__start_svg");
            menuArrowP.classList.add("game__start_p");
            timeForPlaying.classList.add("game__timer");

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
                
                timeForPlaying.innerHTML = this.functionforTime(--this.timeForGame); // decriment time

                if (this.timeForGame === 0) {
                    this.statusOfGame = 0; // if time done, off game
                    stateHeading.innerHTML = "ПРОИГРЫШ";
                    stateHeading.style.display = "block";
                }

                let winningArray = document.querySelectorAll(".game__done"); // get all done elements

                if (this.chooseCountCards === winningArray.length) { // if all element is done
                    let stateHeading = document.querySelector(".game__heading");

                    stateHeading.innerHTML = "ПОБЕДА!!!";
                    stateHeading.style.display = "block";

                    clearInterval(timerForGameId);
                }

            }, 1000);

            setTimeout(() => clearInterval(timerForGameId), this.timeForGame * 1000); // end timer

            // add elements in DOM
            divContainer.append(startLink);
            startLink.append(startButton);
            startButton.append(menuArrow);
            startButton.append(menuArrowP);
            divContainer.append(mainHeading);
            divContainer.append(listOfCards);
            divContainer.append(timeForPlaying);
            divContainer.append(stateHeading);
            divContainer.append(restartButton);
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