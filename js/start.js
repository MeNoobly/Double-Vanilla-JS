"use strict";
(function() {
    const startDoublesApp = {
        addValues(startCount, startTime) {
            localStorage.setItem("startCount", parseInt(startCount)); // set item from input
            localStorage.setItem("startTime", parseInt(startTime)); // set item from input
        },

        validateForm: (context) => {
            // found elements
            let form = document.querySelector(".start__form");
            let formInputs = document.querySelectorAll(".start__input");
            let formTitles = document.querySelectorAll(".start__title");
            let spanElements = document.querySelectorAll(".start__error");

            function validateDigit(count) {
                let reg = /^(0|[1-9]\d*)$/; // create regular for digits
                return reg.test(parseInt(count)); // test input for true
            }

            form.onsubmit = () => {
                let countOfCards = formInputs[0].value; // first element of array of inputs
                let time = formInputs[1].value; // second element of array of inputs
                let timeSplit = time.split(":"); // split array for check on hours:minutes:seconds

                for (let i = 0; i < 2; i++) {
                    if (formInputs[i].value === "") { // if input dont have value, adding class with error, add span with error
                        formInputs[i].classList.add("start__input_error");
                        formTitles[i].classList.add("start__title_error");
                        spanElements[i].textContent = "Ошибка! Поле не заполнено";

                        return false;
                    } else { // else, class with error remove, text content is empty
                        formInputs[i].classList.remove("start__input_error");
                        formTitles[i].classList.remove("start__title_error");

                        spanElements[i].textContent = "";
                    }
                }

                if (!validateDigit(countOfCards)) { // if input value not a digit, add class with error
                    formInputs[0].classList.add("start__input_error");
                    spanElements[0].textContent = "Ошибка! Введите числовое значение";

                    return false;
                } else {
                    formInputs[0].classList.remove("start__input_error");
                    spanElements[0].textContent = "";
                }

                if (countOfCards % 2 !== 0) { // error, if count of cards not even
                    formInputs[0].classList.add("start__input_error");
                    spanElements[0].textContent = "Ошибка! Введите четное количество карточек";

                    return false;
                }

                if (timeSplit.length - 1 === 0) { // if time with only seconds
                    if (!validateDigit(parseInt(timeSplit[0]))) {
                        formInputs[1].classList.add("start__input_error");
                        formTitles[1].classList.add("start__title_error");

                        spanElements[1].textContent = "Ошибка! Введите время в формате \"часы : минуты : секунды\", или, \"минуты : секунды\", или \"секунды\"";
                        
                        return false;
                    } else {
                        formInputs[1].classList.remove("start__input_error");
                        formTitles[1].classList.remove("start__title_error");
                        
                        context.addValues(countOfCards, timeSplit[0]);
                    }
                } else if (timeSplit.length - 1 === 1) { // if time with seconds and minutes
                    if (!validateDigit(parseInt(timeSplit[0])) || !validateDigit(parseInt(timeSplit[1]))) {
                        formInputs[1].classList.add("start__input_error");
                        formTitles[1].classList.add("start__title_error");

                        spanElements[1].textContent = "Ошибка! Введите время в формате \"часы : минуты : секунды\", или, \"минуты : секунды\", или \"секунды\"";
                        
                        return false;
                    } else if (parseInt(timeSplit[0] > 59) || parseInt(timeSplit[1]) > 59) {
                        formInputs[1].classList.add("start__input_error");
                        formTitles[1].classList.add("start__title_error");

                        spanElements[1].textContent = "Ошибка! Введенные секунды и минуты не должны превышать значения \"59\"";

                        return false;
                    } else {
                        formInputs[1].classList.remove("start__input_error");
                        formTitles[1].classList.remove("start__title_error");

                        let newStartTime = parseInt(timeSplit[0]) * 60 + parseInt(timeSplit[1]);
                        
                        context.addValues(countOfCards, newStartTime);
                    }
                } else if (timeSplit.length - 1 === 2) { // if time with seconds, minutes and hours
                    if (!validateDigit(parseInt(timeSplit[0])) || !validateDigit(parseInt(timeSplit[1]))) {
                        formInputs[1].classList.add("start__input_error");
                        formTitles[1].classList.add("start__title_error");

                        spanElements[1].textContent = "Ошибка! Введите время в формате \"часы : минуты : секунды\", или, \"минуты : секунды\", или \"секунды\"";
                        
                        return false;
                    } else if (parseInt(timeSplit[1] > 59) || parseInt(timeSplit[2]) > 59) {
                        formInputs[1].classList.add("start__input_error");
                        formTitles[1].classList.add("start__title_error");

                        spanElements[1].textContent = "Ошибка! Введенные секунды и минуты не должны превышать значения \"59\"";

                        return false;
                    } else {
                        formInputs[1].classList.remove("start__input_error");
                        formTitles[1].classList.remove("start__title_error");

                        let newStartTime = parseInt(timeSplit[0]) * 3600 + parseInt(timeSplit[1]) * 60 + parseInt(timeSplit[2]);
                        
                        context.addValues(countOfCards, newStartTime);
                        console.log(newStartTime);
                    }
                } else {
                    formInputs[1].classList.add("start__input_error");
                    formTitles[1].classList.add("start__title_error");
                    
                    spanElements[1].textContent = "Ошибка! Введите время в формате \"часы : минуты : секунды\", или, \"минуты : секунды\", или \"секунды\"";
                    
                    return false;
                }
            };
        },

        goToDoublesApp() {
            let startButton = document.getElementById("start__button"); // find button
            startButton.addEventListener("click", startDoublesApp.addValues); // add event for double
            this.validateForm(this); // add validate for form
        }
    };
    
    startDoublesApp.goToDoublesApp();
})();