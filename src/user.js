class User {
  constructor(args) {
    this.name = args.name;
    this.age = args.age;
    this.gender = args.gender;
    this.id = args.id;
    this.habits = args.habits;
    this.user_habits = args.user_habits
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
    document.querySelector("#users-list").innerHTML = "";

    let userInfo = document.createElement("div");
    userInfo.id = `info-${this.id}`;
    userInfo.className = "ui big horizontal divided list";

    let nameLi = document.createElement("div");
    let ageLi = document.createElement("div");
    let genderLi = document.createElement("div");
    nameLi.className = 'item'
    ageLi.className = 'item'
    genderLi.className = 'item'
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

    makeTable()

    fetchHabits(this);

    // Creating form for habit
    let h2Element = document.createElement("h2");
    let formContainer = document.createElement("div");
    let habitForm = document.createElement("div");
    formContainer.className = 'ui inverted segment'
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
    habitFormSubmit.dataset.userId = this.id;
    habitFormSubmit.className = 'ui button'
    habitForm.addEventListener("submit", createHabit);
    h2Element.innerText = "Add New Habit";
    titleInput.placeholder = "title";
    descriptionInput.placeholder = "description";

    document.querySelector("#main").appendChild(formContainer);
    formContainer.appendChild(habitForm);
    habitForm.appendChild(h2Element);
    habitForm.appendChild(inputContainer);
    inputContainer.appendChild(titleField);
    inputContainer.appendChild(descriptionField);
    titleField.appendChild(titleInput);
    descriptionField.appendChild(descriptionInput);
    habitForm.appendChild(habitFormSubmit);
  }
}
