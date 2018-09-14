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

  findMyHabits() {
    let filteredHabits = []
    Habit.all().forEach(habit => {
      habit.users.forEach(user => {
        if (user.id == this.id)
        filteredHabits.push(habit)
      })
    })
    return filteredHabits
  }

  render() {
    let list = document.getElementById("users-list");
    let newItem = document.createElement("div");
    let nameDiv = document.createElement('div')
    nameDiv.className = 'header'
    newItem.className = 'item'
    nameDiv.innerText = this.name;

    newItem.addEventListener("click", e => {
      this.clearPage();
      this.addNewHabitButtonToMenu();
      this.show();
    });

    list.appendChild(newItem);
    newItem.appendChild(nameDiv)
  }

  clearPage() {
    document.getElementById('users-header').innerHTML = "";
    document.querySelector("#users-list").innerHTML = "";

    if (document.getElementById('newUserButton')) {
      document.getElementById('newUserButton').remove()
    }

    if (document.querySelector('#newHabitButton')) {
      document.querySelector('#newHabitButton').remove();
    }
  }

  addNewHabitButtonToMenu() {
    let habitMenuButton = document.createElement('div');
    habitMenuButton.className = 'item';
    habitMenuButton.id = 'newHabitButton';
    habitMenuButton.innerText = 'Add Habit';
    habitMenuButton.addEventListener('click', e => {
      toggleHabitForm();
    })
    document.getElementById('menu').appendChild(habitMenuButton);
  }

  show() {
    this.buildUserHeaderList();

    let habitList = document.createElement("table");
    habitList.id = `habit-table`;
    let habitDiv = document.createElement("div");

    document.querySelector("#main").appendChild(habitDiv);
    habitDiv.appendChild(habitList);

    makeTable(this.id)

    console.log('before show breaks')
    // we're hitting find my habits before makeHabits
    let myHabits = this.findMyHabits()

    myHabits.forEach(habit => {
      habit.render(this.id)
      habit.renderCheckboxes()
      habit.checkCheckboxes()
      this.renderHabitCard(habit)
    })

    makeNewHabitForm(this.id)

  }
  //
  // loadHabits() {
  //   console.log(this.habits)
  //
  //   this.habits.forEach(habit => {
  //     this.renderHabitCard(habit)
  //   })
  // }

  renderHabitCard(habit) {
    console.log(habit.user_habits)
    let cardBase = document.createElement('div')
    cardBase.className = 'ui card red'
    let cardContent = document.createElement('div')
    cardContent.className = 'content'
    let cardHeader = document.createElement('div')
    cardHeader.className = 'header'
    cardHeader.innerText = habit.title
    let cardDescription = document.createElement('div')
    cardDescription.className = 'description'
    cardDescription.innerText = habit.description
    let cardExtra = document.createElement('div')
    cardExtra.className = 'extra content'
    cardExtra.innerText = `Days completed: ${habit.user_habits[0].dates.length}`

    document.querySelector('#main').appendChild(cardBase)
    cardBase.appendChild(cardContent)
    cardContent.appendChild(cardHeader)
    cardContent.appendChild(cardDescription)
    cardBase.appendChild(cardExtra)
  }

  buildUserHeaderList() {
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

    this.handleDelete(deleteButton);
  }

  handleDelete(deleteButton) {
    deleteButton.addEventListener('click', e => {
      document.getElementById(`info-${this.id}`).remove()
      document.getElementById('habit-table').remove()

      if (confirm('Are you sure?')) {
        this.deleteUser()
      } else {
        document.getElementById('add-habit-form').innerHTML = ''
        this.show()
      }
    })
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
