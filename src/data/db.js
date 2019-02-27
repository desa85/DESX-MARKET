const uuid = require('uuid/v4')

class DataBase {
  constructor(dataName) {
    this.dataName = dataName
    this._dates = JSON.parse(localStorage.getItem(this.dataName)) || []
  }

  get dates() {
    return this._dates
  }

  find(id) {
    return this._dates.find((data) => data.id === id)
  }

    commitСhanges() {
    localStorage.setItem(this.dataName, JSON.stringify(this.dates))
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
    localStorage.setItem(this.dataName, JSON.stringify(this._dates))
    this.commitСhanges()

    return values
  }

  pushData(data) {
    this._dates.push(data)
    this.commitСhanges()
  }

  search(key, value) {
    let result = false

    this._dates.forEach((data) => {
      if (data[key] === value) {
        result = data['id']
        return
      }
    })
    return result
  }

  searchAll(key, value) {
    let result = []

    this._dates.forEach((data) => {
      if (data[key] === value) result.push(data['id'])
    })
    return result
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
