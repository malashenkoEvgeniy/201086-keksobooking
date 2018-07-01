'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');

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


  window.map = {
    // Создает метки на карте
    getRenderPinIcon: function () {
      var getRenderPin = function (pin) {
        var pinTemplate = document.querySelector('template').content;
        var mapPin = pinTemplate.querySelector('.map__pin');
        var pinElement = mapPin.cloneNode(true);
        pinElement.style.left = pin.location.x + 'px';
        pinElement.style.top = pin.location.y + 'px';
        pinElement.querySelector('img').src = pin.author.avatar;
        return pinElement;
      };

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.setup.getArray().length; i++) {
        fragment.appendChild(getRenderPin(window.setup.getArray()[i]));
      }
      mapPins.appendChild(fragment);
    },

    // Создает описания обьявлений
    getPinCards: function () {
      var map = document.querySelector('.map');
      var fragment1 = document.createDocumentFragment();
      for (var j = 0; j < window.setup.getArray().length; j++) {
        fragment1.appendChild(getRenderPinCard(window.setup.getArray()[j]));
      }
      map.insertBefore(fragment1, document.querySelector('.map__filters-container'));
    }
  };

  // Функция Создает обьявление
  var getRenderPinCard = function (pin) {
    var pinTemplate = document.querySelector('template').content;
    var mapCard = pinTemplate.querySelector('.map__card');
    mapCard.classList.add('hidden');
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

})();
