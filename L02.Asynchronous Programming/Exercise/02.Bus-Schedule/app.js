function solve() {
  let baseUrl = `http://localhost:3030/jsonstore/bus/schedule`;
  let firstStopId = 'depot';

  let textBox = document.querySelector('#info .info');
  let departBtn = document.getElementById('depart');
  let arriveBtn = document.getElementById('arrive');
  function depart() {
    fetch(`${baseUrl}/${firstStopId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        departBtn.disabled = true;
        arriveBtn.disabled = false;
        textBox.textContent = `Next stop ${data.name}`;
      })
      .catch((err) => {
        textBox.textContent = 'Error';
        departBtn.disabled = true;
        arriveBtn.disabled = true;
      });
  }

  function arrive() {
    fetch(`${baseUrl}/${firstStopId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        departBtn.disabled = false;
        arriveBtn.disabled = true;
        textBox.textContent = `Arriving at ${data.name}`;
        firstStopId = data.next;
      })
      .catch((err) => {
        textBox.textContent = 'Error';
        departBtn.disabled = true;
        arriveBtn.disabled = true;
      });
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
