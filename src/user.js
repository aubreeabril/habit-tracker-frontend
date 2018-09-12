let allUsers = []

class User {
  constructor(args) {
    this.name = args.name;
    this.age = args.age;
    this.gender = args.gender;
    this.id = args.id;
    this.habits = args.habits;
    this.user_habits = args.user_habits
    allUsers.push(this)
  }

  static all() {
    return allUsers
  }

  render() {
    let list = document.getElementById("users-list");
    let newItem = document.createElement("div");
    let nameDiv = document.createElement('div')
    nameDiv.className = 'header'
    newItem.className = 'item'
    nameDiv.innerText = this.name;

    newItem.addEventListener("click", e => {
      this.show();
    });

    list.appendChild(newItem);
    newItem.appendChild(nameDiv)
  }

  show() {
    document.getElementById('users-header').innerHTML = ''

    if (document.getElementById('newUserButton')) {
      document.getElementById('newUserButton').remove()
    }

    if (document.querySelector('#newHabitButton')) {
      document.querySelector('#newHabitButton').remove();
    }
    let habitMenuButton = document.createElement('div');
    habitMenuButton.className = 'item';
    habitMenuButton.id = 'newHabitButton';
    habitMenuButton.innerText = 'Add Habit';
    habitMenuButton.addEventListener('click', e => {
      toggleHabitForm();
    })
    document.getElementById('menu').appendChild(habitMenuButton);

    document.querySelector("#users-list").innerHTML = "";

    let userInfo = document.createElement("div");
    userInfo.id = `info-${this.id}`;
    userInfo.className = "ui big horizontal divided list";

    let nameLi = document.createElement("div");
    let ageLi = document.createElement("div");
    let genderLi = document.createElement("div");
    let deleteUser = document.createElement('div');
    let deleteButton = document.createElement('button');

    nameLi.className = 'item'
    ageLi.className = 'item'
    genderLi.className = 'item'
    deleteUser.className = 'item'
    deleteButton.className = 'ui button'
    // debugger
    nameLi.innerText = this.name;
    ageLi.innerText = this.age;
    genderLi.innerText = this.gender;
    deleteButton.innerText = `Delete ${this.name}`

    document.querySelector("#main").appendChild(userInfo);
    userInfo.appendChild(nameLi);
    userInfo.appendChild(ageLi);
    userInfo.appendChild(genderLi);
    userInfo.appendChild(deleteUser);
    deleteUser.appendChild(deleteButton)

    deleteUser.addEventListener('click', e => {
      document.getElementById(`info-${this.id}`).remove()
      document.getElementById('habit-table').remove()

      if (confirm('Are you sure?')) {
        this.deleteUser()
      } else {
        this.show() // this makes the double form thing happen
      }
    })

    let habitList = document.createElement("table");
    habitList.id = `habit-table`;
    let habitDiv = document.createElement("div");

    document.querySelector("#main").appendChild(habitDiv);
    habitDiv.appendChild(habitList);

    makeTable()

    fetchHabits(this.id);

    makeNewHabitForm(this.id)

  }

  deleteUser() {
    fetch(`${USERS_URL}/${this.id}`, {
      method: 'DELETE'
    })
    .then(r => {
      document.getElementById('user-form-background').remove()
      document.getElementById('form-container').remove()
      init()
    })
  }
}
