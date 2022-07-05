async function getInfo() {
  let baseUrl = `http://localhost:3030/jsonstore/bus/businfo`;
  let stopId = document.getElementById('stopId');

  let stopName = document.getElementById('stopName');
  let busesList = document.getElementById('buses');

  try {
    let res = await fetch(`${baseUrl}/${stopId.value}`);
    busesList.innerHTML = '';

    if (res.ok == false) {
      throw new Error('Error');
    } else {
      let data = await res.json();
      busesList.innerHTML = '';

      let buses = data.buses;
      stopName.innerHTML = data.name;

      for (const key in buses) {
        let liElement = document.createElement('li');
        liElement.textContent = `Bus ${key} arrives in ${buses[key]} minutes`;
        busesList.appendChild(liElement);
      }
    }
  } catch (err) {
    busesList.innerHTML = '';
    stopName.textContent = 'Error';
  }
}
