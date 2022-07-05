function attachEvents() {
  let baseUrl = `http://localhost:3030/jsonstore/forecaster/locations`;
  let location = document.getElementById('location');
  let forecast = document.getElementById('forecast');
  let btn = document.getElementById('submit');

  let findCurrentWeatherUrl = `http://localhost:3030/jsonstore/forecaster/today`;
  let findThreeDaysWeather = `http://localhost:3030/jsonstore/forecaster/upcoming`;

  let locations = [];

  fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => (locations = data))
    .catch((err) => (forecast.textContent = 'Error'));

  btn.addEventListener('click', getForecast);

  function getForecast(event) {
    event.preventDefault();

    let currentObject = undefined;
    for (const obj of locations) {
      if (obj.name == location.value) {
        currentObject = obj;
        break;
      }
    }

    if (!currentObject) {
      forecast.textContent = 'Error';
    } else {
      fetch(`${findCurrentWeatherUrl}/${currentObject.code}`)
        .then((res) => res.json())
        .then((data) => currentForecasts(data))
        .catch((err) => (forecast.textContent = 'Error'));

      fetch(`${findThreeDaysWeather}/${currentObject.code}`)
        .then((res) => res.json())
        .then((data) => threeDaysForecasts(data))
        .catch((err) => (forecast.textContent = 'Error'));
    }
  }

  function currentForecasts(data) {}

  function threeDaysForecasts(data) {}
}

attachEvents();
