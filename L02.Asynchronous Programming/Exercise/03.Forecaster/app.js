function attachEvents() {
  let baseUrl = `http://localhost:3030/jsonstore/forecaster/locations`;
  let location = document.getElementById('location');
  let forecast = document.getElementById('forecast');
  let currentForecast = document.getElementById('#current');
  let threeDaysForecast = document.getElementById('#upcoming');
  let btn = document.getElementById('submit');

  let findCurrentWeatherUrl = `http://localhost:3030/jsonstore/forecaster/today`;
  let findThreeDaysWeather = `http://localhost:3030/jsonstore/forecaster/upcoming`;

  let weatherSymbols = {
    Sunny: '&#x2600', // ☀
    'Partly sunny': '&#x26C5', // ⛅
    Overcast: '&#x2601', // ☁
    Rain: '&#x2614', // ☂
    Degrees: '&#176', // °
  };

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
      forecast.style.display = 'inline';

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

  function currentForecasts(data) {
    console.log(data);
    let locationCurrentForecast = data.forecast;
    console.log(weatherSymbols[locationCurrentForecast.condition]);
    let conditionSpanSymbol = document.createElement('span');
    conditionSpanSymbol.className = 'condition symbol';
    conditionSpanSymbol.textContent =
      weatherSymbols[locationCurrentForecast.condition];

    currentForecast.appendChild(conditionSpanSymbol);
    console.log(conditionSpanSymbol);
  }

  function threeDaysForecasts(data) {
    console.log(data);
  }
}

attachEvents();
