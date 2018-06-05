'use strict';
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

var getArray = function () {
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
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content;
var mapPin = pinTemplate.querySelector('.map__pin');
// Создает метки на карте
var getRenderPin = function (pin) {
  var pinElement = mapPin.cloneNode(true);
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < getArray().length; i++) {
  fragment.appendChild(getRenderPin(getArray()[i]));
}
mapPins.appendChild(fragment);
// Функция установки праильного кол-ва комнат и гостей согласно правилам рус. языка
var getCorrectEndings = function (rooms, guests) {
  if (rooms > 1) {
    var roomTitle = rooms + ' комнаты';
  } else {
    roomTitle = 'одна комната';
  }
  if (guests > 1) {
    var guestTitle = guests + ' гостей';
  } else {
    guestTitle = 'одного гостя';
  }
  return roomTitle + ' для ' + guestTitle;
};

// Функция Создает обьявление
var mapCard = pinTemplate.querySelector('.map__card');
var getRenderPinCard = function (pin) {
  var pinElement = mapCard.cloneNode(true);
  pinElement.querySelector('.popup__title').textContent = pin.offer.title;
  pinElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  pinElement.querySelector('.popup__text--price').innerHTML = pin.offer.price + '&#x20bd;/ночь';
  var typeRus;
  switch (pin.offer.type) {
    case 'flat':
      typeRus = 'квартира';
      break;
    case 'palace':
      typeRus = 'дворец';
      break;
    case 'house':
      typeRus = 'дом';
      break;
    case 'bungalo':
      typeRus = 'бунгало';
      break;
  }
  pinElement.querySelector('.popup__type').textContent = typeRus;
  pinElement.querySelector('.popup__text--capacity').textContent = getCorrectEndings(pin.offer.rooms, pin.offer.guests);
  pinElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до' + pin.offer.checkout;
  pinElement.querySelector('.popup__features').textContent = '';
  for (var k = 0; k < pin.offer.features.length; k++) {
    var popupElement = document.createElement('li');
    popupElement.className = 'popup__feature popup__feature--' + pin.offer.features[k];
    pinElement.querySelector('.popup__features').appendChild(popupElement);
  }
  pinElement.querySelector('.popup__description').textContent = pin.offer.description;
  var photoElement = pinElement.querySelector('.popup__photo');
  pinElement.querySelector('.popup__photos').textContent = '';
  for (var l = 0; l < pin.offer.phptos.length; l++) {
    var element = photoElement.cloneNode();
    element.src = pin.offer.phptos[l];
    pinElement.querySelector('.popup__photos').appendChild(element);
  }
  pinElement.querySelector('.popup__avatar').src = pin.author.avatar;
  return pinElement;
};
var fragment1 = document.createDocumentFragment();
for (var j = 0; j < getArray().length; j++) {
  fragment1.appendChild(getRenderPinCard(getArray()[j]));
}
map.insertBefore(fragment1, document.querySelector('.map__filters-container'));

