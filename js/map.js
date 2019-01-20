'use strict';
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkin_out = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; 
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg" расположенных в произвольном порядке'];
var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];

shuffle(titles);
shuffle(avatars);
 console.log(avatars);

var hotels = [];
for (var i = 0; i < 8; i++) {
    var locationX = randomInteger(0, 1150);
    var locationY = randomInteger(130, 630);
    hotels.push({
        "author": {
            "avatar": "img/avatars/user" + avatars[i] + ".png",
        },
        "offer": {
            "title": titles[i],
            "address": locationX + ", " + locationY,
            "price": randomInteger(1000, 1000000),
            "type": types[randomInteger(0, 3)] ,
            "rooms": randomInteger(1, 5),
            "guests": randomInteger(1, 8),
            "checkin": checkin_out[randomInteger(0,2)],
            "checkout": checkin_out[randomInteger(0,2)],
            "features": features.slice(randomInteger(0, 5)),
            "description": "Великолепная квартира-студия в центре Новочебоксарска.",
            "photos": photos.slice(randomInteger(0, 2)),

        },

        "location": {
            "x": locationX,
            "y": locationY
        }
    })
}

var mapHotels = document.querySelector('.map');
mapHotels.classList.remove('map--faded');
 
 console.log(hotels);

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

function shuffle(array) {
    var i = array.length,
    j = 0,
    temp;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1));

        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



var similarListElement = mapHotels.querySelector('.map__pins');
var similarHotelTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderHotels = function(hotel) {
    var hotelElement = similarHotelTemplate.cloneNode(true);

    // hotelElement.style = "left: " + hotel.locationX + "px"; "top: " + hotel.locationY + "px";
    hotelElement.style.left = hotel.location.x + "px";
    hotelElement.style.top = hotel.location.y + "px";
    hotelElement.querySelector('img').src = hotel.author.avatar;
    hotelElement.querySelector('img').alt = hotel.offer.title;
    return hotelElement;

}

var renderAdvertising = function(advertising) {
    var advertisingElement = hotelAdvertisingTemplate.cloneNode(true);
    advertisingElement.querySelector('.popup__title').textContent = advertising.offer.title;
    advertisingElement.querySelector('.popup__text--address').textContent = advertising.offer.address;
    advertisingElement.querySelector('.popup__text--price').textContent = advertising.offer.price+ "₽/ночь";
    advertisingElement.querySelector('.popup__text--capacity').textContent = advertising.offer.rooms+" комнаты для "+ advertising.guests+" гостей";
    advertisingElement.querySelector('.popup__text--time').textContent = "Заезд после " +advertising.offer.checkin+ " выезд до "+ advertising.offer.checkout;
    advertisingElement.querySelector('.popup__features').textContent = advertising.offer.features.toString();
    advertisingElement.querySelector('.popup__description').textContent = advertising.offer.description;

console.log(advertising);
return advertisingElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < hotels.length; i++) {
    fragment.appendChild(renderHotels(hotels[i]));
    
}

similarListElement.appendChild(fragment);

var hotelAdvertisingTemplate = document.querySelector('#card').content.querySelector('.map__card');
var afterElement = mapHotels.querySelector('.map__filters-container');
var fragment = document.createDocumentFragment();
fragment.appendChild(renderAdvertising(hotels[0]));
mapHotels.insertBefore(fragment, afterElement);