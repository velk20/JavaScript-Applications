console.log('before');
setTimeout(callback, 200);
console.log('after');
function callback() {
  console.log('inside callback');
}

//*Promises
function executor(resolve, reject) {
  console.log('before');
  setTimeout(resolve, 2000);
  console.log('after');
}

function start() {
  const myPromise = new Promise(executor);
  //*executor(onResolve, onReject);

  myPromise.then(onResolve);
  function onResolve() {
    console.log('operation successful');
  }
  function onReject() {
    console.log('error found');
  }
}

start();

//*Fetch API

function onClick() {
  fetch('url.....')
    .then((res) => res.json())
    .then((data) => console.log(JSON.stringify(data, null, 2)))
    .catch((err) => alert(err.message));
}

//*Async/Await functions
async function onClick2() {
  try {
    //Header
    const res = await fetch('https://swapi.dev/api/people/1'); // return value NOT Promise
    //Body=>Result
    const data = await res.json(); // return value NOT Promise
    console.log(data);
  } catch (err) {
    alert(err.message);
  }
}

//*Error handling
async function onClick3() {
  try {
    //Header
    const res = await fetch('https://swapi.dev/api/people'); // return value NOT Promise

    if (res.ok == false) {
      throw new Error('Request error');
    }
    //Body=>Result
    const data = await res.json(); // return value NOT Promise
    console.log(data);
  } catch (err) {
    alert(err.message);
  }
}
