class User {
  constructor(args) {
    this.name = args.name;
    this.age = args.age;
    this.gender = args.gender;
    this.id = args.id;
    this.habits = args.habits;
  }

  render() {
    let list = document.getElementById("users-list");
    let newItem = document.createElement("li");
    newItem.innerText = this.name;
    newItem.addEventListener("click", e => {
      this.show();
    });

    list.appendChild(newItem);
  }

  show() {
    document.querySelector("#users-list").innerHTML = "";

    let userInfo = document.createElement("ul");
    userInfo.id = `info-${this.id}`;
    userInfo.className = "h-list";

    let nameLi = document.createElement("li");
    let ageLi = document.createElement("li");
    let genderLi = document.createElement("li");

    // debugger
    nameLi.innerText = this.name;
    ageLi.innerText = this.age;
    genderLi.innerText = this.gender;

    document.querySelector("#main").appendChild(userInfo);
    userInfo.appendChild(nameLi);
    userInfo.appendChild(ageLi);
    userInfo.appendChild(genderLi);

    let habitList = document.createElement("table");
    habitList.id = `habit-table`;
    let habitDiv = document.createElement("div");

    document.querySelector("#main").appendChild(habitDiv);
    habitDiv.appendChild(habitList);

    this.habits.forEach(habit => {
      let newHabit = new Habit(habit);
      newHabit.render(this);
    });

    // Creating form for habit
    let h2Element = document.createElement("h2");
    let habitForm = document.createElement("form");
    let titleInput = document.createElement("input");
    let descriptionInput = document.createElement("input");
    let habitFormSubmit = document.createElement("input");
    habitFormSubmit.type = "submit";
    habitFormSubmit.dataset.userId = this.id;
    habitForm.addEventListener("submit", createHabit);
    h2Element.innerText = "Add New Habit";
    titleInput.placeholder = "title";
    descriptionInput.placeholder = "description";

    document.querySelector("#main").appendChild(habitForm);
    habitForm.appendChild(h2Element);
    habitForm.appendChild(titleInput);
    habitForm.appendChild(descriptionInput);
    habitForm.appendChild(habitFormSubmit);
  }
}
