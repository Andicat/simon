'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var GAME_ROUNDS = 100;
  var DELAY = 500;

  var buttons = document.querySelectorAll('.game__sector');
  var buttonStart = document.querySelector('.game__start');
  var countText = document.querySelector('.game__count');
  var counter = makeCounter();
  var currentCount = 0;
  var arrTemplate = [];
  var clickNumber = 0;
  var clickResult;
  var arrTimers = [];
  
  buttonStart.addEventListener('click', onClickButtonStart);
  
  function onClickButton(evt) {
    arrTimers.forEach(function (timer) {
      clearTimeout(timer);
      //console.log("очищаем действующий таймер " + timer);
    });
    arrTimers = [];
    activateButtons2();
    evt.target.classList.add("active");
    var timerId = setTimeout(function() {evt.target.classList.remove("active"); }, 100);
    arrTimers.push(timerId);
    console.log("устанавливаем таймер " + timerId + " для " + evt.target.id);
    //setTimeout(function() {activateButtons()}, DELAY);
    //setTimeout(function() {controlClick(evt)}, DELAY*2);
    controlClick(evt);
  }

  //проверяем нажатую кнопку
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

  function result(res) {
    if (res) {
      setCount("ВЫИГРЫШ: " + currentCount);
      setTimeout(function() {
        counter();
        round(currentCount)
      }, DELAY);
      
    } else {
      setCount("ПРОИГРЫШ :(");
      counter.set(0);
      disactivateButtons();
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

  // начинаем игру
  function onClickButtonStart() {
    counter.set(0);
    //console.log("обнуляем счетчик:" + currentCount);
    setCount("Поехали!");
    activateButtons();
    game();
  }

  function activateButtons() {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", onClickButton);
    }
    //console.log("кнопки активированы");
  }

  function disactivateButtons() {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].removeEventListener("click", onClickButton);
    }
   // console.log("кнопки дизактивированы");
  }

  function activateButtons2() {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active");
    }
    //console.log("кнопки активированы");
  }

  function game() {
    counter();
    round(currentCount);
  }

  function round(roundNumber) {
    arrTemplate = [];
    clickNumber = 0;
    clickResult = true;
    
    disactivateButtons();

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

    setTimeout(function() { activateButtons() }, DELAY * roundNumber);
    //ожидание ответа от игрока
  }
  
})();
