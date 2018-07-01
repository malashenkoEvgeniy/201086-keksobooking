'use strict';
(function () {

  var START_URL_AVATAR = 'img/avatars/user0';
  var END_URL_AVATAR = '.png';
  var TYPE_CHECK = ['12:00', '13:00', '14:00'];
  var TYPE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_URL = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var OFFER_TITLE = [
    {
      'title': 'Большая уютная квартира',
      'type': 'flat'
    },
    {
      'title': 'Маленькая неуютная квартира',
      'type': 'flat'
    },
    {
      'title': 'Огромный прекрасный дворец',
      'type': 'palace'
    },
    {
      'title': 'Маленький ужасный дворец',
      'type': 'palace'
    },
    {
      'title': 'Красивый гостевой домик',
      'type': 'house'
    },
    {
      'title': 'Некрасивый негостеприимный домик',
      'type': 'house'
    },
    {
      'title': 'Уютное бунгало далеко от моря',
      'type': 'bungalo'
    },
    {
      'title': 'Неуютное бунгало по колено в воде',
      'type': 'bungalo'
    }];

  // Функция возвращает случайное число от до.
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // Функция возвращает сгенерирываный массив обьектов
  window.setup = {
    getArray: function () {
      var arr = [];
      var locationX;
      var locationY;
      var featuresLength;
      for (var i = 0; i < 8; i++) {
        locationX = getRandomNumber(300, 900);
        locationY = getRandomNumber(150, 500);
        featuresLength = getRandomNumber(0, 5);
        arr[i] = {
          'author': {
            'avatar': START_URL_AVATAR + (i + 1) + END_URL_AVATAR
          },
          'location': {
            'x': locationX,
            'y': locationY
          },
          'offer': {
            'title': OFFER_TITLE[i].title,
            'address': locationX + ', ' + locationY,
            'price': getRandomNumber(1000, 1000000),
            'type': OFFER_TITLE[i].type,
            'rooms': getRandomNumber(1, 5),
            'guests': getRandomNumber(1, 5),
            'checkin': TYPE_CHECK[getRandomNumber(0, 2)],
            'checkout': TYPE_CHECK[getRandomNumber(0, 2)],
            'features': TYPE_FEATURES.slice(0, featuresLength),
            'description': '',
            'phptos': PHOTOS_URL
          }
        };
      }
      return arr;
    }

  };


})();
