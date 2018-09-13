const USERS_URL = "http://localhost:3000/users";
const HABITS_URL = "http://localhost:3000/habits";
const USER_HABITS_URL = "http://localhost:3000/user_habits";
let showHabitForm = false;
let showUserForm = false;

document.addEventListener("DOMContentLoaded", init);

function init() {
  fetchUsers();
  addUserMenuButton();
  makeNewUserForm();
  fetchHabits();
  document.getElementById('users-header').innerText = 'Select User'
}

function addUserMenuButton() {
  if (document.querySelector('#newHabitButton')) {
    document.querySelector('#newHabitButton').remove();
  }
  let userMenuButton = document.createElement('div');
  userMenuButton.className = 'item';
  userMenuButton.id = 'newUserButton';
  userMenuButton.innerText = 'Add User';
  userMenuButton.addEventListener('click', e => {
    toggleUserForm();
  })
  document.getElementById('menu').appendChild(userMenuButton);
}

function makeNewUserForm() {
  let userFormContainer = document.getElementById('add-user-form')
  userFormContainer.style.display = 'none'
  let userFormBackground = document.createElement('div')
  userFormBackground.id = 'user-form-background'
  userFormBackground.className = 'ui inverted segment'
  let userForm = document.createElement('div')
  userForm.className = 'ui inverted form'
  let formTitle = document.createElement('h4')
  formTitle.innerText = 'Add New User'
  let inputContainer = document.createElement('div')
  inputContainer.className = 'equal width fields'
  let userFormSubmit = document.createElement('input')
  userFormSubmit.type = 'submit'
  userFormSubmit.className = 'ui button'
  userFormSubmit.addEventListener('click', e => {
    createUser(getUserData(e));
    nameInput.value = ''
    ageInput.value = ''
    genderInput.value = ''
    toggleUserForm();
  })
  let nameFieldDiv = document.createElement('div')
  nameFieldDiv.className = 'field'
  let nameInput = document.createElement('input')
  nameInput.className = 'ui right labeled input'
  nameInput.placeholder = 'name'
  let ageFieldDiv = document.createElement('div')
  ageFieldDiv.className = 'field'
  let ageInput = document.createElement('input')
  ageInput.className = 'ui right labeled input'
  ageInput.placeholder = 'age'
  let genderFieldDiv = document.createElement('div')
  genderFieldDiv.className = 'field'
  let genderInput = document.createElement('input')
  genderInput.className = 'ui right labeled input'
  genderInput.placeholder = 'gender'

  genderFieldDiv.appendChild(genderInput)
  ageFieldDiv.appendChild(ageInput)
  nameFieldDiv.appendChild(nameInput)
  inputContainer.appendChild(nameFieldDiv)
  inputContainer.appendChild(ageFieldDiv)
  inputContainer.appendChild(genderFieldDiv)
  userForm.appendChild(formTitle)
  userForm.appendChild(inputContainer)
  userForm.appendChild(userFormSubmit)
  userFormBackground.appendChild(userForm)
  userFormContainer.appendChild(userFormBackground)
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

function fetchHabits() {
  fetch(`${HABITS_URL}`)
  .then(response => response.json())
  .then(json => {
    makeHabits(json)
  })
}

function makeHabits(jsonData) {
  console.log(jsonData)
  jsonData.forEach(habit => {
    new Habit(habit);
  })
}

function createUser(data) {
  fetch(`${USERS_URL}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
  .then(json => {
    let newUser = new User(json)
    newUser.render()
  })
}

function toggleHabitForm() {
  showHabitForm = !showHabitForm
  if (showHabitForm) {
    document.querySelector('#add-habit-form').style.display = 'block';
  } else {
    document.querySelector('#add-habit-form').style.display = 'none';
  }
}

function toggleUserForm() {
  showUserForm = !showUserForm
  if (showUserForm) {
    document.querySelector('#add-user-form').style.display = 'block';
  } else {
    document.querySelector('#add-user-form').style.display = 'none';
  }
}

function getUserData(e) {
  let userName = e.path[1].children[1].children[0].children[0].value
  let userAge = e.path[1].children[1].children[1].children[0].value
  let userGender = e.path[1].children[1].children[2].children[0].value
  return {
    name: userName,
    age: userAge,
    gender: userGender
  }
}

function makeTable(userId) {
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

  sundayTh.dataset.userId = userId
  mondayTh.dataset.userId = userId
  tuesdayTh.dataset.userId = userId
  wednesdayTh.dataset.userId = userId
  thursdayTh.dataset.userId = userId
  fridayTh.dataset.userId = userId
  saturdayTh.dataset.userId = userId

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

    console.log(e.target.dataset.userId)

    createUserHabit(json, e.target.dataset.userId)

    let user = User.all().find(u => {
      return u.id == e.target.dataset.userId
    })

    // document.getElementById('main').innerHTML = `<div id="users-list" class='ui huge middle aligned selection list'>
    // </div><div id="add-habit-form">
    // </div><div id="edit-habit-form">
    // </div>`

    // document.getElementById('add-habit-form').innerHTML = ''
    document.getElementById('edit-habit-form').innerHTML = ''
    newHabit.render(e.target.dataset.userId);
    newHabit.renderCheckboxes()
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
    </div><div id="add-habit-form">
    </div><div id="edit-habit-form">
    </div>`
    user.show();
  })
  document.getElementById('add-habit-form').innerHTML = ''
  makeNewHabitForm(userId)
  console.log(Habit.all())
}

function makeNewHabitForm(userId) {
  document.getElementById('add-habit-form').style.display = 'none'
  let h4Element = document.createElement("h4");
  let formContainer = document.createElement("div");
  let habitForm = document.createElement("div");
  formContainer.className = 'ui inverted segment'
  formContainer.id = 'form-container'
  habitForm.className = 'ui inverted form'
  let inputContainer = document.createElement("div");
  inputContainer.className = "equal width fields"

  let titleField = document.createElement("select");
  titleField.className = "ui search dropdown"
  let option = document.createElement('option')
  option.value = ''

  // make dropdown items
  let habitTitles = Habit.all().map(habit => {
    return habit.title
  })

  // console.log(habitTitles)
  // debugger

  let uniqueTitles = [...new Set(habitTitles)];

  uniqueTitles.forEach(title => {
    // let usedTitles = [];

    // if (!usedTitles.includes(title)) {
      let div = document.createElement('option')
      div.value = `${title}`
      // div.setAttribute('data-value', `${habit.title}`)
      div.innerText = title
      titleField.appendChild(div)
      // usedTitles.push(title)
    // }
  })
  //

  let descriptionField = document.createElement("div");
  descriptionField.className = "field"
  let descriptionInput = document.createElement("input");
  let habitFormSubmit = document.createElement("input");
  habitFormSubmit.type = "submit";
  habitFormSubmit.dataset.userId = userId;
  habitFormSubmit.className = 'ui button'
  habitFormSubmit.addEventListener("click", createHabit);
  h4Element.innerText = "Add New Habit";
  descriptionInput.placeholder = "description";

  // saving user ID
  habitFormSubmit.dataset.userId = userId

  document.getElementById('add-habit-form').appendChild(formContainer)
  formContainer.appendChild(habitForm);
  habitForm.appendChild(h4Element);
  habitForm.appendChild(inputContainer);
  inputContainer.appendChild(titleField);
  inputContainer.appendChild(descriptionField);
  descriptionField.appendChild(descriptionInput);
  habitForm.appendChild(habitFormSubmit);
}
