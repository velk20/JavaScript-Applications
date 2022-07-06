function lockedProfile() {
  let url = 'http://localhost:3030/jsonstore/advanced/profiles';

  let main = document.getElementById('main');
  main.innerHTML = '';

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (const user in data) {
        createUser(user, data);
      }
    })
    .catch((err) => console.log(err.message));
  function createUser(user, data) {
    main.innerHTML += `<div class="profile">
    <img src="./iconProfile2.png" class="userIcon" />
    <label>Lock</label>
    <input type="radio" name="user1Locked" value="lock" checked>
    <label>Unlock</label>
    <input type="radio" name="user1Locked" value="unlock"><br>
    <hr>
    <label>Username</label>
    <input type="text" name="user1Username" value="${data[user].username}" disabled readonly />
    <div class="user1Username">
        <hr>
        <label>Email:</label>
        <input type="email" name="user1Email" value="${data[user].email}" disabled readonly />
        <label>Age:</label>
        <input type="text" name="user1Age" value="${data[user].age}" disabled readonly />
    </div>
    
    <button>Show more</button>
</div>
`;
  }
}
