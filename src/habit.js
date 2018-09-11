class Habit {
  constructor(args) {
    this.title = args.title
    this.description = args.description
    this.id = args.id
  }

  render(userId) {
    let habitId = this.id

    // now render the checkboxes
    let habitRow = document.createElement('tr')
    document.querySelector('#habit-table').appendChild(habitRow)

    let habitTd = document.createElement('td')
    habitTd.innerText = this.title

    habitRow.appendChild(habitTd)

    let headers = Array.from(document.querySelector('#habit-table').querySelectorAll('th'))

    headers.shift()

    headers.forEach(header => {
      let td = document.createElement('td')
      let input = document.createElement('input')
      input.dataset.fullDate = header.dataset.fullDate
      input.dataset.userId = userId
      input.dataset.habitId = habitId
      console.log(input.dataset.userId)
      input.setAttribute('type', 'checkbox')
      habitRow.appendChild(td)
      td.appendChild(input)

      input.addEventListener('click', checkBox)
    })
  }


}
