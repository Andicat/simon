'use strict';

(function () {
  var DELAY = 80;
  var SOUND_DELAY = 500;

  /*var Sounds = {
    green: 'fa',
    red: 'do',
    yellow: 'si',
    blue: 're',
    error: 'error'
  };*/

  var buttons = document.querySelectorAll('.game__sector');
  var sounds = document.querySelectorAll('.game__sound');
  var buttonStart = document.querySelector('.game__start');
  var buttonStartText = document.querySelector('.game__start_start');
  var countText = document.querySelector('.game__count');
  var gameStatus = document.querySelector('.game__name');
  var counter = makeCounter();
  var sound = document.querySelector('.mp3');
  var currentCount = 0;
  var arrTemplate = [];
  var clickNumber = 0;
  var clickResult;
  var record = 0;
    
  buttonStart.addEventListener('click', onClickButtonStart);
  
  // нажатие игрока по цветовой кнопке
  function onClickButton(evt) {
    playSound(evt.target.id);
    evt.target.classList.add('game__sector_active');
    setTimeout(function() {
      evt.target.classList.remove('game__sector_active');
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
    record = record < currentCount ? currentCount : record;
    if (res) {
      setResult('result');
      setTimeout(function() {
        counter();
        setRound(currentCount)
      }, 1000);
      
    } else {
      playSound('error');
      setResult('start');
      counter.set(0);
      arrTemplate = [];
      buttonStart.classList.remove('game__start_active');
      disableButtons(false);
    }
  }

  // выводим счет игры
  function setResult(option,text) {
    switch (option) {
      case 'start':
        countText.textContent = record > 1 ? ('Ваш рекорд: ' + (record - 1)) : '';
        gameStatus.textContent = 'SIMON';
        gameStatus.classList.remove('hide');
        buttonStart.classList.remove('hide');
        break;
      case 'round':
        gameStatus.textContent = 'ROUND №' + currentCount;
        gameStatus.classList.remove('hide');
        buttonStart.classList.add('hide');
        break;
      case 'repeat':
        gameStatus.textContent = 'repeat...';
        gameStatus.classList.remove('hide');
        buttonStart.classList.add('hide');
        break;
      case 'result':
        gameStatus.textContent = 'Great!';
        buttonStart.classList.add('hide');
    }
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

  // начинаем игру по кнопке 'старт''
  function onClickButtonStart() {
    counter.set(0);
    arrTemplate = [];
    buttonStart.classList.add('game__start_active');
    disableButtons(true);
    counter();
    setRound(currentCount);
  }

  function disableButtons(isDisabled) {
    if (isDisabled) {
      buttons.forEach(function (bt) {
        bt.addEventListener('click', onClickButton);
      });
    } else {
      buttons.forEach(function (bt) {
        bt.removeEventListener('click', onClickButton);
      });
    }
  }

  // задаем параметры раунда
  function setRound(roundNumber) {
    clickNumber = 0;
    clickResult = true;
    
    disableButtons(false);

    //задаем шаблон раунда
    arrTemplate.push(buttons[Math.floor(Math.random() * buttons.length)]);
        
    // выводим в консоль шаблон
    var textTemplate = 'Раунд №' + roundNumber + ': ';
    arrTemplate.forEach(function (bt, i) {
      textTemplate = textTemplate +  bt.id + ' ';
    });
    console.log(textTemplate);
    setResult('round');

    // демонстрация
    arrTemplate.forEach(function (bt, i) {
      setTimeout(function() { 
        bt.classList.add('game__sector_active');
        playSound(bt.id);
      }, (DELAY+SOUND_DELAY)*i);
      setTimeout(function() {
        bt.classList.remove('game__sector_active');
      }, SOUND_DELAY*(i + 1) + DELAY*i);
    });
    setTimeout(function() { 
      disableButtons(true);
      setResult('repeat'); 
    }, (SOUND_DELAY*roundNumber + DELAY*roundNumber));
  }

  function playSound(color) {
    document.getElementById(color + '_sound').cloneNode().play();
    //var myAudio = new Audio;
    //myAudio.src = 'mp3/' +  Sounds[color] + '.mp3';
    //myAudio.play();
  }

})();
