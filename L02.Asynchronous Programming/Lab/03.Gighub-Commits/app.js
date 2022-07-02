async function loadCommits() {
  // Try it with Fetch API

  const username = document.getElementById('username').value;
  const repo = document.getElementById('repo').value;
  const list = document.getElementById('commits');

  try {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repo}/commits`
    );

    if (res.ok == false) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    list.innerHTML = '';
    for (const commit of data) {
      let li = document.createElement('li');
      li.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
      list.appendChild(li);
    }
  } catch (err) {
    list.innerHTML = `${err.message}`;
  }
}
