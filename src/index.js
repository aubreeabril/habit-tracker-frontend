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
        // debugger
        let newUser = new User(user);
        newUser.render();
      });
    });
}

function checkBox() {
  let userHabit;
  let userId = parseInt(event.target.dataset.userId);
  let habitId = parseInt(event.target.dataset.habitId);
  let checked = event.target.checked;
  let fullDate = event.target.dataset.fullDate;
  fetch(`http://localhost:3000/user_habits`)
    .then(response => response.json())
    .then(json =>
      json.forEach(uh => {
        // debugger;
        if (uh.user_id == userId && uh.habit_id == habitId && checked) {
          // debugger;
          // userHabit = uh;
          patchUserHabit(fullDate, uh);
          // console.log(userHabit);
        }
      })
    );

  // console.log(userHabit);

  // if (event.target.checked) {
  //   patchUserHabit(event.target.dataset.fullDate);
  // }
}

function patchUserHabit(date, userHabit) {
  // console.log(date);
  // console.log(userHabit);
  // console.log(userHabit.dates);

  let data = userHabit;
  let newDates = userHabit.dates;
  newDates.push(date);
  data.dates = newDates;

  console.log(data);

  fetch(`${USER_HABITS_URL}/${userHabit.id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      dates: "1234"
    })
  })
    .then(r => r.json())
    .then(json => console.log(json));
}
