class Habit {
  constructor(args) {
    this.title = args.title
    this.description = args.description
    this.id = args.id
  }

  render() {

    let list = document.querySelector('#habit-table')

    let headerRow = document.createElement('tr')
    let nameTh = document.createElement('th')
    let sundayTh = document.createElement('th')
    let mondayTh = document.createElement('th')
    let tuesdayTh = document.createElement('th')
    let wednesdayTh = document.createElement('th')
    let thursdayTh = document.createElement('th')
    let fridayTh = document.createElement('th')
    let saturdayTh = document.createElement('th')

    sundayTh.innerText = 'Sunday'
    mondayTh.innerText = 'Monday'
    tuesdayTh.innerText = 'Tuesday'
    wednesdayTh.innerText = 'Wednesday'
    thursdayTh.innerText = 'Thursday'
    fridayTh.innerText = 'Friday'
    saturdayTh.innerText = 'Saturday'

    list.appendChild(headerRow)
    headerRow.appendChild(nameTh)
    headerRow.appendChild(sundayTh)
    headerRow.appendChild(mondayTh)
    headerRow.appendChild(tuesdayTh)
    headerRow.appendChild(wednesdayTh)
    headerRow.appendChild(thursdayTh)
    headerRow.appendChild(fridayTh)
    headerRow.appendChild(saturdayTh)


    // figure out the date of the most recent Sunday
    let today = new Date()
    // yesterday.setDate(today.getDate() - 1)
    let sunday = today

    switch(today.getDay()) {
      case 0:
        sunday = today
        break;
      case 1:
        sunday.setDate(today.getDate() - 1)
        break;
      case 2:
        sunday.setDate(today.getDate() - 2)
        break;
      case 3:
        sunday.setDate(today.getDate() - 3)
        break;
      case 4:
        sunday.setDate(today.getDate() - 4)
        break;
      case 5:
        sunday.setDate(today.getDate() - 5)
        break;
      case 6:
        sunday.setDate(today.getDate() - 6)
        break;
    }
    let mon = new Date();
    let tues = new Date();
    let wed = new Date();
    let thurs = new Date();
    let fri = new Date();
    let sat = new Date;

    mon.setDate(sunday.getDate() + 1)
    tues.setDate(sunday.getDate() + 2)
    wed.setDate(sunday.getDate() + 3)
    thurs.setDate(sunday.getDate() + 4)
    fri.setDate(sunday.getDate() + 5)
    sat.setDate(sunday.getDate() + 6)

    sundayTh.dataset.fullDate = sunday
    mondayTh.dataset.fullDate = mon
    tuesdayTh.dataset.fullDate = tues
    wednesdayTh.dataset.fullDate = wed
    thursdayTh.dataset.fullDate = thurs
    fridayTh.dataset.fullDate = fri
    saturdayTh.dataset.fullDate = sat
    /////////////

    // now render the checkboxes
    let habitRow = document.createElement('tr')
    list.appendChild(habitRow)
    console.log(this)
    let habitTd = document.createElement('td')
    habitTd.innerText = this.title

    habitRow.appendChild(habitTd)

    let headers = Array.from(list.querySelectorAll('th'))
    headers.shift()

    headers.forEach(header => {
      let td = document.createElement('td')
      let input = document.createElement('input')
      input.dataset.fullDate = header.dataset.fullDate
      input.setAttribute('type', 'checkbox')
      habitRow.appendChild(td)
      td.appendChild(input)
    })
  }

}
