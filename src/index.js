const USERS_URL = 'http://localhost:3000/users'
const HABITS_URL = 'http://localhost:3000/habits'

document.addEventListener('DOMContentLoaded', init)

function init() {
  fetchUsers()
}

function fetchUsers() {
  fetch(`${USERS_URL}`)
  .then(response => response.json())
  .then(json => {
    json.forEach(user => {
      // debugger
      let newUser = new User(user)
      newUser.render()
    })
  })
}
