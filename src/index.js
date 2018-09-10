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

function checkBox() {
let userHabit
let userId = parseInt(event.target.dataset.userId)
let habitId = parseInt(event.target.dataset.habitId)
  fetch(`http://localhost:3000/user_habits`)
  .then(response => response.json())
  .then(json =>  json.forEach(uh => {
    if (uh.user_id == userId && uh.habit_id == habitId) {
      userHabit = uh
    }
  })


  )

  console.log(userHabit)

  if (event.target.checked) {
    patchUserHabit(event.target.dataset.fullDate)
  }
}

function patchUserHabit(date) {

}
