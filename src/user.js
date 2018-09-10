class User {
  constructor(args) {
    this.name = args.name
    this.age = args.age
    this.gender = args.gender
    this.id = args.id
    this.habits = args.habits
  }

  render() {
    let list = document.getElementById('users-list')
    let newItem = document.createElement('li')
    newItem.innerText = this.name
    newItem.addEventListener('click', e => {
      this.show()
    })

    list.appendChild(newItem)
  }

  show() {
    document.querySelector('#users-list').innerHTML = ''

    let userInfo = document.createElement('ul')
    userInfo.id = `info-${this.id}`
    userInfo.className = 'h-list'

    let nameLi = document.createElement('li')
    let ageLi = document.createElement('li')
    let genderLi = document.createElement('li')

    // debugger
    nameLi.innerText = this.name
    ageLi.innerText = this.age
    genderLi.innerText = this.gender

    document.querySelector('#main').appendChild(userInfo)
    userInfo.appendChild(nameLi)
    userInfo.appendChild(ageLi)
    userInfo.appendChild(genderLi)

    let habitList = document.createElement('ul')
    habitList.id = `habit-list`
    let habitDiv = document.createElement('div')

    userInfo.appendChild(habitDiv)
    habitDiv.appendChild(habitList)

    this.habits.forEach(habit => {
      let newHabit = new Habit(habit)
      newHabit.render()
    })
  }
}
