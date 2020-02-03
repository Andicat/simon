'use strict';

(function () {
  var serverTime = 10000;
  var statusOk = 200;

  var html = document.getElementsByTagName('html')[0];
  var quoteBox = document.querySelector('.quote-box');
  var buttonNewQuote = quoteBox.querySelector('.quote-new_quote');
  var quoteText = quoteBox.querySelector('.quote-text');
  var quoteAuthor = quoteBox.querySelector('.quote-author');
  var socialTwitter = quoteBox.querySelector('.social-twitter');
  var socialVk = quoteBox.querySelector('.social-vk');
  var socialFb = quoteBox.querySelector('.social-fb');

  buttonNewQuote.addEventListener('click', onClickbuttonNewQuote);
  socialTwitter.addEventListener('click', onClickSocialTwitter);
  socialVk.addEventListener('click', onClickSocialVk);
  socialFb.addEventListener('click', onClickSocialFb);

  function onClickbuttonNewQuote() {
    load(function (data) {
      showQuote(data);
      setRandomColor();
    },showError);
  }

  function onClickSocialTwitter(evt) {
    this.href = 'http://twitter.com/share?url=' +  window.location.href + '&text=' + quoteText.textContent;
  }

  function onClickSocialVk(evt) {
    this.href = 'https://vk.com/share.php?url=' + window.location.href + '&title=' + document.title;
  }

  function onClickSocialFb(evt) {
    this.href = 'http://www.facebook.com/share.php?u=' + window.location.href;
  }

  function showQuote(data) {
    var quoteData = JSON.parse(data);
    quoteText.textContent = quoteData[0].quote;
    quoteAuthor.textContent = quoteData[0].author;
    quoteBox.classList.remove('hidden');
  }

  function setRandomColor() {
    html.style.setProperty('--color', 'hsl(' + 360 * Math.random() + ', 50%, 70%)');
  }

  // загрузка данных с сервера
  function load(onLoad, onError) {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('load', function () {
      if (xhr.status === statusOk) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = serverTime;

    xhr.open('GET', 'https://andruxnet-random-famous-quotes.p.mashape.com/');
    xhr.setRequestHeader('X-Mashape-Key', 'eLDaLcXAYOmshU8uqTBkhkrT9Nmcp1ACCmSjsnmbo1Va9oqckY');

    xhr.send(data);
  }

  // показ ошибки
  function showError(error) {
    var errorModal = document.createElement('div');
    errorModal.style = 'position: absolute; height: auto; width: 500px; left: 50%; top: 50%; padding: 20px; background: #fff; border: 1px solid #333; z-index: 9999; transform: translate(-50%, -50%)';
    errorModal.classList.add('error');
    var errorMessage = document.createElement('h1');
    errorMessage.style = 'color: red; text-shadow: none; font-size: 30px';
    errorMessage.textContent = error;
    errorModal.appendChild(errorMessage);
    document.body.appendChild(errorModal);
  }

  //начальная загрузка
  load(function (data) {
    showQuote(data);
    setRandomColor();

  },showError);

})();
