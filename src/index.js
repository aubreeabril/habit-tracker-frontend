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

function fetchHabits(userId) {
  fetch(`${HABITS_URL}`)
  .then(response => response.json())
  .then(json => {
    json.forEach(habit => {
      habit.user_habits.forEach(uh => {
        if (uh.user_id == userId) {
          let newHabit = new Habit(habit);
          newHabit.render(userId);
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

  let habitTitle = event.target.parentElement.children[1].children[0].children[0].value

  let habitDescription = event.target.parentElement.children[1].children[1].children[0].value


  fetch(`${HABITS_URL}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      title: habitTitle,
      description: habitDescription
    })
  })
  .then(response => response.json())
  .then(json => {
    let newHabit = new Habit(json)
    // console.log(e.target.dataset)

    createUserHabit(json, e.target.dataset.userId)

    let user = User.all().find(u => {
      return u.id == e.target.dataset.userId
    })

    document.getElementById('main').innerHTML = `<div id="users-list" class='ui huge middle aligned selection list'>
    </div><div id="where-forms-go">
    </div>`
    user.show();

  })
}

function createUserHabit(data, userId) {


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
  .then(json => {})
}

// function findUserHabit(userId, habitId) {
//   fetch(`${USER_HABITS_URL}`)
//   .then(r => r.json())
//   .then(json => console.log(json))
// }

function getUpdateInfo(e) {
  e.preventDefault()
  let userId = e.target.dataset.userId
  let habitId = e.target.dataset.habitId
  let newTitle = event.target.parentElement.children[1].children[0].children[0].value
  let newDescription = event.target.parentElement.children[1].children[1].children[0].value
  let data = {habit_id: habitId, title: newTitle, description: newDescription}
  updateHabit(data, userId)
}

function updateHabit(data, userId) {
  fetch(`${HABITS_URL}/${data.habit_id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
  .then(json => {
    let user = User.all().find(u => {
      return u.id == userId
    })

    document.getElementById('main').innerHTML = `<div id="users-list" class='ui huge middle aligned selection list'>
    </div><div id="where-forms-go">
    </div>`
    user.show();
  })
  document.getElementById('where-forms-go').innerHTML = ''
  makeNewHabitForm(userId)
}

function makeNewHabitForm(userId) {
  let h2Element = document.createElement("h2");
  let formContainer = document.createElement("div");
  let habitForm = document.createElement("div");
  formContainer.className = 'ui inverted segment'
  formContainer.id = 'form-container'
  habitForm.className = 'ui inverted form'
  let inputContainer = document.createElement("div");
  inputContainer.className = "equal width fields"
  let titleField = document.createElement("div");
  titleField.className = "field"
  let titleInput = document.createElement("input");
  titleInput.className = 'ui right labeled input'
  let descriptionField = document.createElement("div");
  descriptionField.className = "field"
  let descriptionInput = document.createElement("input");
  let habitFormSubmit = document.createElement("input");
  habitFormSubmit.type = "submit";
  habitFormSubmit.dataset.userId = userId;
  habitFormSubmit.className = 'ui button'
  habitFormSubmit.addEventListener("click", createHabit);
  h2Element.innerText = "Add New Habit";
  titleInput.placeholder = "title";
  descriptionInput.placeholder = "description";

  // saving user ID
  habitFormSubmit.dataset.userId = userId

  document.getElementById('where-forms-go').appendChild(formContainer)
  formContainer.appendChild(habitForm);
  habitForm.appendChild(h2Element);
  habitForm.appendChild(inputContainer);
  inputContainer.appendChild(titleField);
  inputContainer.appendChild(descriptionField);
  titleField.appendChild(titleInput);
  descriptionField.appendChild(descriptionInput);
  habitForm.appendChild(habitFormSubmit);
}
