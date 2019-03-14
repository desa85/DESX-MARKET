const uuid = require('uuid/v4')

class DataBase {
  constructor(dataName) {
    this.dataName = dataName
    this._dates = JSON.parse(localStorage.getItem(this.dataName)) || []
  }

  get dates() {
    return this._dates
  }

  filterDates(actions, call) {
    const filters = []
    const search = (value, key) => element => !!('' + element[key]).match(RegExp(value, 'i'))
    const fromTo = (from, to, key) => element => !!((+element[key] >= +from || !from ) && (+element[key] <= +to || !to))
    const output = (!!call) ? this._dates.map(call) : this._dates

    for (let key in actions) {
      const action = actions[key]
      switch(action.type) {
        case 'search': action.value && filters.push(search(action.value, key))
        case 'fromTo': filters.push(fromTo(action.from, action.to, key))
      }
    }

    return output.filter(element => !filters.find(filter => !filter(element)))
  }

  find(id) {
    return this._dates.find((data) => data.id === id)
  }

  commitСhanges() {
    localStorage.setItem(this.dataName, JSON.stringify(this.dates))
  }

  isEmpty(){
    return !localStorage.getItem(this.dataName)
  }

  sessionUserId(){
    return sessionStorage['sessionUserId']
  }


  insert() {
    let arg = Object.values(arguments)
    let values = {}
    let keys = this.arguments

    keys.forEach((key, index) => {
      values[key] = arg[index] !== undefined ? arg[index] : ""
    })
    values['id'] = uuid()
    this._dates.push(values)
    this.commitСhanges()

    return values
  }

  pushData(data) {
    this._dates.push(data)
    this.commitСhanges()
  }

  getId(key, value) {
    return (this._dates.find(data => data[key] === value) || {}).id
  }

  getIds(key, value) {
    return this._dates
      .filter(data => data[key] === value)
      .map(data => data.id)
  }

  changeData(id, key, value) {
    this._dates.forEach((data, index) => {
      if (data.id === id) {
        this._dates[index][key] = value
      }
    })
    this.commitСhanges()
  }

  random(value) {
    return Math.round(Math.random() * (value - 1) + 1)
  }

  pushSameValue(value, count) {
    let result = []
    for (let i = 1; i <= count; i++) result.push(value)
    return result

  }
}

export default DataBase
