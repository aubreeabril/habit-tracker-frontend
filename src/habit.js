class Habit {
  constructor(args) {
    this.title = args.title
    this.description = args.description
    this.id = args.id
  }

  render() {

    let list = document.querySelector('#habit-list')

    let habitLi = document.createElement('li')
    habitLi.innerText = this.title

    list.appendChild(habitLi)
  }

}
