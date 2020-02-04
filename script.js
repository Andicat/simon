'use strict';

(function () {
  var GAME_ROUNDS_MAX = 100;
  var DELAY = 500;

  var buttons = document.querySelectorAll('.game__sector');
  var buttonStart = document.querySelector('.game__start');
  var countText = document.querySelector('.game__count');
  var counter = makeCounter();
  var currentCount = 0;
  var arrTemplate = [];
  var clickNumber = 0;
  var clickResult;
    
  buttonStart.addEventListener('click', onClickButtonStart);
  
  // нажатие игрока по цветовой кнопке
  function onClickButton(evt) {
    evt.target.classList.add("active");
    setTimeout(function() {
      evt.target.classList.remove("active");
    }, 100);
    controlClick(evt);
  }

  //проверяем нажатую цветовую кнопку
  function controlClick(evt) {
    if (arrTemplate.length) {
      clickResult = (evt.target.id == arrTemplate[clickNumber].id) ? true : false;
      if (clickResult && clickNumber == (arrTemplate.length - 1)) {
        result(true);
        return;
      }
      if (!clickResult) {
        result(false);
        return;
      }
    }
    clickNumber++;
  }

  // выводим результат игры
  function result(res) {
    if (res) {
      setCount("ВЫИГРЫШ: " + currentCount);
      setTimeout(function() {
        counter();
        setRound(currentCount)
      }, DELAY);
      
    } else {
      setCount("ПРОИГРЫШ :(");
      counter.set(0);
      disableButtons(false);
    }
  }

  // выводим счет игры
  function setCount(text) {
    countText.textContent = text;
  }

  // счетчик
  function makeCounter() {
    
    function counter() {
      currentCount++;
      return currentCount;
    }

    counter.set = function(value) {
      currentCount = value;
    };

    counter.reset = function() {
      currentCount = 0;
    };

    return counter;
  }

  // начинаем игру по кнопке "старт""
  function onClickButtonStart() {
    counter.set(0);
    setCount("Поехали!");
    disableButtons(true);
    counter();
    setRound(currentCount);
  }

  function disableButtons(isDisabled) {
    if (isDisabled) {
      buttons.forEach(function (bt) {
        bt.addEventListener("click", onClickButton);
      });
    } else {
      buttons.forEach(function (bt) {
        bt.removeEventListener("click", onClickButton);
      });
    }
  }

  // задаем параметры раунда
  function setRound(roundNumber) {
    arrTemplate = [];
    clickNumber = 0;
    clickResult = true;
    
    disableButtons(false);

    //задаем шаблон раунда
    for (var i = 0; i < roundNumber; i++) {
      arrTemplate.push(buttons[Math.floor(Math.random() * buttons.length)]);
    }
    
    // выводим в консоль шаблон
    var textTemplate = "Раунд №" + roundNumber + ": ";
    arrTemplate.forEach(function (bt, i) {
      textTemplate = textTemplate +  bt.id + " ";
    });
    console.log(textTemplate);

    // демонстрация
    arrTemplate.forEach(function (bt, i) {
      setTimeout(function() { bt.classList.add("active"); }, DELAY * i);
      setTimeout(function() { bt.classList.remove("active"); }, DELAY * (i + 0.5));
    });

    setTimeout(function() { disableButtons(true) }, DELAY * roundNumber);
  }
  
})();
