const USERS_URL = "http://localhost:3000/users";
const HABITS_URL = "http://localhost:3000/habits";
const USER_HABITS_URL = "http://localhost:3000/user_habits";

document.addEventListener("DOMContentLoaded", init);

function init() {
  fetchUsers();
}

function fetchUsers() {
  fetch(`${USERS_URL}`)
    .then(response => response.json())
    .then(json => {
      json.forEach(user => {
        let newUser = new User(user);
        newUser.render();
      });
    });
}

function fetchHabits(user) {
  fetch(`${HABITS_URL}`)
  .then(response => response.json())
  .then(json => {
    json.forEach(habit => {
      habit.user_habits.forEach(uh => {
        if (uh.user_id == user.id) {
          let newHabit = new Habit(habit);
          newHabit.render(user);
        }
      })
    })
  })
}

function makeTable() {
  let list = document.querySelector('#habit-table')
  list.className = 'ui inverted table black fixed'
  let thead = document.createElement('thead')

  let headerRow = document.createElement('tr')
  let nameTh = document.createElement('th')
  let sundayTh = document.createElement('th')
  let mondayTh = document.createElement('th')
  let tuesdayTh = document.createElement('th')
  let wednesdayTh = document.createElement('th')
  let thursdayTh = document.createElement('th')
  let fridayTh = document.createElement('th')
  let saturdayTh = document.createElement('th')

  sundayTh.innerText = 'Sunday'
  mondayTh.innerText = 'Monday'
  tuesdayTh.innerText = 'Tuesday'
  wednesdayTh.innerText = 'Wednesday'
  thursdayTh.innerText = 'Thursday'
  fridayTh.innerText = 'Friday'
  saturdayTh.innerText = 'Saturday'

  list.appendChild(thead)
  thead.appendChild(headerRow)
  headerRow.appendChild(nameTh)
  headerRow.appendChild(sundayTh)
  headerRow.appendChild(mondayTh)
  headerRow.appendChild(tuesdayTh)
  headerRow.appendChild(wednesdayTh)
  headerRow.appendChild(thursdayTh)
  headerRow.appendChild(fridayTh)
  headerRow.appendChild(saturdayTh)

  // figure out the date of the most recent Sunday
  let today = new Date()
  // yesterday.setDate(today.getDate() - 1)
  let sunday = today

  switch(today.getDay()) {
    case 0:
      sunday = today
      break;
    case 1:
      sunday.setDate(today.getDate() - 1)
      break;
    case 2:
      sunday.setDate(today.getDate() - 2)
      break;
    case 3:
      sunday.setDate(today.getDate() - 3)
      break;
    case 4:
      sunday.setDate(today.getDate() - 4)
      break;
    case 5:
      sunday.setDate(today.getDate() - 5)
      break;
    case 6:
      sunday.setDate(today.getDate() - 6)
      break;
  }
  let mon = new Date();
  let tues = new Date();
  let wed = new Date();
  let thurs = new Date();
  let fri = new Date();
  let sat = new Date;

  mon.setDate(sunday.getDate() + 1)
  tues.setDate(sunday.getDate() + 2)
  wed.setDate(sunday.getDate() + 3)
  thurs.setDate(sunday.getDate() + 4)
  fri.setDate(sunday.getDate() + 5)
  sat.setDate(sunday.getDate() + 6)

  sundayTh.dataset.fullDate = sunday
  mondayTh.dataset.fullDate = mon
  tuesdayTh.dataset.fullDate = tues
  wednesdayTh.dataset.fullDate = wed
  thursdayTh.dataset.fullDate = thurs
  fridayTh.dataset.fullDate = fri
  saturdayTh.dataset.fullDate = sat
}

function checkBox() {
  let userHabit;
  let userId = parseInt(event.target.dataset.userId);
  let habitId = parseInt(event.target.dataset.habitId);
  let checked = event.target.checked;
  let fullDate = event.target.dataset.fullDate;


  event.target.disabled = true


  fetch(`http://localhost:3000/user_habits`)
    .then(response => response.json())
    .then(json =>
      json.forEach(uh => {
        // debugger;
        if (uh.user_id == userId && uh.habit_id == habitId && checked) {
          // debugger;
          // userHabit = uh;
          let patchData = addUserHabitDate(fullDate, uh);
          patchUserHabit(patchData, uh.id)
          // console.log(userHabit);
        }
      })
    );

}


function addUserHabitDate(date, userHabit) {
  return {dates: [...userHabit.dates, date]}
}

function patchUserHabit(patchData, userHabitId) {
  // console.log(date);
  // console.log(userHabit);
  // console.log(userHabit.dates);

  fetch(`${USER_HABITS_URL}/${userHabitId}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(patchData)
  })
    .then(r => {
      r.json()
      console.log(r.body)
    })
    .then(json => console.log(json));
}

function createHabit(e) {
  e.preventDefault()
  let habitData = event.target
  // console.log(event.target)

  fetch(`${HABITS_URL}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      title: habitData[0].value,
      description: habitData[1].value
    })
  })
  .then(response => response.json())
  .then(json => {
    let newHabit = new Habit(json)
    newHabit.render(e.target[2].dataset.userId)
    createUserHabit(json, e.target[2].dataset.userId)
  })
}

function createUserHabit(data, userId) {
  console.log(userId)

  fetch(`${USER_HABITS_URL}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      user_id: userId,
      habit_id: data.id
    })
  })
  .then(r => r.json())
  .then(json => {console.log(json)})
}
