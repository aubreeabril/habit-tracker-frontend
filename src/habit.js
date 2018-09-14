let allHabits = []

class Habit {
  constructor(args) {
    this.title = args.title
    this.description = args.description
    this.id = args.id
    this.user_habits = args.user_habits
    this.users = args.users
    allHabits.push(this)
  }

  static all() {
    return allHabits
  }

  render(userId) {
    let habitId = this.id

    // now render the checkboxes
    let habitRow = document.createElement('tr')
    habitRow.id = `habit-${this.id}`
    document.querySelector('#habit-table').appendChild(habitRow)

    let habitTd = document.createElement('td')
    habitTd.innerText = this.title
    habitTd.className = 'ui icon'
    habitTd.setAttribute('data-content', `${this.description}`)
    habitTd.addEventListener('click', e => {
      this.renderEditForm(userId)
    })

    habitRow.appendChild(habitTd)
  }

  renderCheckboxes() {
    let headers = Array.from(document.querySelector('#habit-table').querySelectorAll('th'))

    headers.shift()

    headers.forEach(header => {
      let userId = header.dataset.userId
      let habitId = this.id

      let td = document.createElement('td')
      let input = document.createElement('input')
      input.dataset.fullDate = header.dataset.fullDate
      input.dataset.userId = userId
      input.dataset.habitId = habitId
      input.setAttribute('type', 'checkbox')
      document.getElementById(`habit-${habitId}`).appendChild(td)
      td.appendChild(input)
      input.addEventListener('click', checkBox)
    })
  }

  checkCheckboxes() {
    let habitRow = document.querySelector(`#habit-${this.id}`);
    let headers = Array.from(document.querySelector('#habit-table').querySelectorAll('th'))

    let checkboxes = habitRow.querySelectorAll('input');
    let userId = headers[1].dataset.userId
    let foundUserHabit = this.user_habits.find(uh => {
      return uh.user_id == userId
    })

    foundUserHabit.dates.forEach(date => {
      checkboxes.forEach(cb => {
        if(cb.dataset.fullDate.split(' ').slice(0, 4).join(' ') == date.split(' ').slice(0, 4).join(' ')) {
          cb.checked = true
          cb.disabled = true
        }
      })
    })
  }

  renderEditForm(userId) {
    let h2Element = document.createElement("h2");
    let formContainer = document.querySelector("#form-container");
    formContainer.innerHTML = ''
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
    habitFormSubmit.dataset.habitId = this.id;
    habitFormSubmit.dataset.userId = userId
    habitFormSubmit.className = 'ui button'
    habitFormSubmit.addEventListener("click", getUpdateInfo);
    h2Element.innerText = "Edit Habit";
    titleInput.value = this.title;
    descriptionInput.value = this.description;
    let deleteButton = document.createElement('button')
    deleteButton.className = 'ui inverted red button'
    deleteButton.dataset.habitId = this.id
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', e => {
      if (confirm('Are you sure?')) {
        this.deleteHabit(e)
      }
    })

    document.querySelector("#edit-habit-form").appendChild(formContainer);
    formContainer.appendChild(habitForm);
    habitForm.appendChild(h2Element);
    habitForm.appendChild(inputContainer);
    inputContainer.appendChild(titleField);
    inputContainer.appendChild(descriptionField);
    titleField.appendChild(titleInput);
    descriptionField.appendChild(descriptionInput);
    habitForm.appendChild(habitFormSubmit);
    habitForm.appendChild(deleteButton)
  }

  deleteHabit(e) {
    document.getElementById('edit-habit-form').innerHTML = ''
    document.getElementById(`habit-${this.id}`).remove()
    fetch(`${HABITS_URL}/${this.id}`, {
      method: 'DELETE'
    })

    makeNewHabitForm(e.target.dataset.userId)
  }

}
