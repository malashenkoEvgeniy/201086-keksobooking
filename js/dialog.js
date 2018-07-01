'use strict';
(function () {
  var WIDTH_PIN = 40;
  var HEIGHT_PIN = 44;
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var fieldsetForm = adForm.querySelectorAll('fieldset');
  var addressPin = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');

  // Функция проверяющая mapCardItem на наличие класса hidden. Если класа hidden нет, функция его добавляет
  var getClassCheck = function () {
    var mapCardItem = document.querySelectorAll('.map__card');
    for (var j = 0; j < mapCardItem.length; j++) {
      if (!mapCardItem[j].classList.contains('hidden')) {
        mapCardItem[j].classList.add('hidden');
      }
    }
  };
  // getClassCheck();
  // удаляет метки на карте
  var removePinItem = function () {
    var el = document.querySelectorAll('.pins-icon');
    var parentEl = document.querySelector('.map__pins');
    for (var i = 0; i < el.length; i++) {
      if (el[i] !== null) {
        parentEl.removeChild(el[i].parentNode);
      }
    }
  };

  // Функция переводит в активное состояние страницу
  var getActiveCondition = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var q = 0; q < fieldsetForm.length; q++) {
      fieldsetForm[q].disabled = false;
    }
    window.map.getPinCards();
    getClassCheck();
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    removePinItem();

    // Функция перемещения курсора мыши

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    };
    // Добавляет обработчик события mouseup на .map__pin--main.
    var onPinUp = function (evtUp) {
      getActiveCondition();
      var pinX = evtUp.clientX + WIDTH_PIN / 2;
      var pinY = evtUp.clientY + HEIGHT_PIN * 3 / 2;
      addressPin.value = pinX + ', ' + pinY;
      window.map.getRenderPinIcon();
      var pinItem = document.querySelectorAll('.map__pin img');

      var onPinItemClick = function (evtO) {
        var mapCardItem = document.querySelectorAll('.map__card');
        switch (evtO.target.className) {
          case 'pin1 pins-icon':
            getClassCheck();
            mapCardItem[0].classList.remove('hidden');
            mapCardItem[0].querySelector('.popup__close').onclick = function () {
              mapCardItem[0].classList.add('hidden');
            };
            break;
          case 'pin2 pins-icon':
            getClassCheck();
            mapCardItem[1].classList.remove('hidden');
            mapCardItem[1].querySelector('.popup__close').onclick = function () {
              mapCardItem[1].classList.add('hidden');
            };
            break;
          case 'pin3 pins-icon':
            getClassCheck();
            mapCardItem[2].classList.remove('hidden');
            mapCardItem[2].querySelector('.popup__close').onclick = function () {
              mapCardItem[2].classList.add('hidden');
            };
            break;
          case 'pin4 pins-icon':
            getClassCheck();
            mapCardItem[3].classList.remove('hidden');
            mapCardItem[3].querySelector('.popup__close').onclick = function () {
              mapCardItem[3].classList.add('hidden');
            };
            break;
          case 'pin5 pins-icon':
            getClassCheck();
            mapCardItem[4].classList.remove('hidden');
            mapCardItem[4].querySelector('.popup__close').onclick = function () {
              mapCardItem[4].classList.add('hidden');
            };
            break;
          case 'pin6 pins-icon':
            getClassCheck();
            mapCardItem[5].classList.remove('hidden');
            mapCardItem[5].querySelector('.popup__close').onclick = function () {
              mapCardItem[5].classList.add('hidden');
            };
            break;
          case 'pin7 pins-icon':
            getClassCheck();
            mapCardItem[6].classList.remove('hidden');
            mapCardItem[6].querySelector('.popup__close').onclick = function () {
              mapCardItem[6].classList.add('hidden');
            };
            break;
          case 'pin8 pins-icon':
            getClassCheck();
            mapCardItem[7].classList.remove('hidden');
            mapCardItem[7].querySelector('.popup__close').onclick = function () {
              mapCardItem[7].classList.add('hidden');
            };
            break;
        }
      };
      for (var k = 1; k < pinItem.length; k++) {
        pinItem[k].classList.add('pin' + k);
        pinItem[k].classList.add('pins-icon');
        pinItem[k].onclick = onPinItemClick;
      }

      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onPinUp);
    };
    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onPinUp);
  });

})();
