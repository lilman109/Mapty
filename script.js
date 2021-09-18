'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];
      map = L.map('map').setView(coords, 15);

      L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(map);

      map.on('click', event => {
        mapEvent = event;
        OnMapClicked();
      });
    },
    () => {
      alert('Could not get yoru position');
    }
  );
}

const OnMapClicked = () => {
  ShowWorkOutForm();
  FocusInputElement(inputDistance);
};

const ShowWorkOutForm = () => {
  form.classList.remove('hidden');
};

const FocusInputElement = inputElement => {
  inputElement.focus();
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('WorkOut')
    .openPopup();

  ClearAllInputFields();
});

const ClearAllInputFields = () => {
  inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
    '';
};

inputType.addEventListener('change', event => {
  event.preventDefault();
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
