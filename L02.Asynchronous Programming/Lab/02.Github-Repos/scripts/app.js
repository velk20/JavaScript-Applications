//* WITH PROMISES .then().catch()
function loadRepos() {
  const username = document.getElementById('username').value;
  const list = document.getElementById('repos');

  fetch(`https://api.github.com/users/${username}/repos`)
    .then(headerHandler)
    .then(bodyHandler)
    .catch(errHandler);

  function headerHandler(res) {
    if (res.ok == false) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  function bodyHandler(data) {
    list.innerHTML = '';
    for (const obj of data) {
      list.innerHTML += `<li>
		<a href="${obj.html_url}">
			${obj.full_name}
		</a>
		</li>`;
    }
  }

  function errHandler(err) {
    list.innerHTML = `${err.message}`;
  }
}

//* WITH Async/Await function
async function loadRepos2() {
  const username = document.getElementById('username').value;
  const list = document.getElementById('repos');

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    if (response.ok == false) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    list.innerHTML = '';

    for (const repo of data) {
      list.innerHTML += `<li>
		<a href="${repo.html_url}">
			${repo.full_name}
		</a>
		</li>`;
    }
  } catch (error) {
    list.innerHTML = `${error.message}`;
  }
}
