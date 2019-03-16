const uuid = require('uuid/v4')

class DataBase {
  constructor(dataName) {
    this.dataName = dataName
    this._dates = JSON.parse(localStorage.getItem(this.dataName)) || []
    this.FILTER_SEARCH = 'search'
    this.FILTER_FROM_TO = 'fromTo'
  }

  get dates() {
    return this._dates
  }
  
  filteredData(action) {
    return this._dates.filter(data => this.filterDates(data, action))
  }

  filterDates(value, action) {
    const search = (value, key) => element => !!('' + element[key]).toUpperCase().includes(value.toUpperCase())
    const fromTo = (from, to, key) => element => !!((+element[key] >= +from || !from ) && (+element[key] <= +to || !to))
    const filters = Object.entries(action).reduce((accumulator, [key, filter]) => {
      switch(filter.type) {
        case this.FILTER_SEARCH: return [...accumulator, search(filter.value, key)]
        case this.FILTER_FROM_TO: return [...accumulator, fromTo(filter.from, filter.to, key)]
      }
    }, [])

    return !filters.find(filter => !filter(value))
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
