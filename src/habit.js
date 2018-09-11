class Habit {
  constructor(args) {
    this.title = args.title
    this.description = args.description
    this.id = args.id
    this.user_habits = args.user_habits
  }

  render(user) {
    let habitId = this.id
    let userId = user.id
    // now render the checkboxes
    let habitRow = document.createElement('tr')
    document.querySelector('#habit-table').appendChild(habitRow)

    let habitTd = document.createElement('td')
    habitTd.innerText = this.title

    habitRow.appendChild(habitTd)

    let headers = Array.from(document.querySelector('#habit-table').querySelectorAll('th'))

    headers.shift()
    console.log(headers)
    headers.forEach(header => {
      let td = document.createElement('td')
      let input = document.createElement('input')
      input.dataset.fullDate = header.dataset.fullDate
      input.dataset.userId = userId
      input.dataset.habitId = habitId
      input.setAttribute('type', 'checkbox')
      habitRow.appendChild(td)
      td.appendChild(input)
      // debugger
      // let foundUserHabit = this.user_habits.find(uh => {
      //   uh.user_id == userId
      // })

      // if (foundUserHabit.dates.includes(header.dataset.fullDate))
      

      input.addEventListener('click', checkBox)
    })
  }


}
