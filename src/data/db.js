const uuid = require('uuid/v4')

class DataBase {
  constructor(dataName) {
    this.dataName = dataName
    this._datas = JSON.parse(localStorage.getItem(this.dataName)) || []
    this.FILTER_SEARCH = 'search'
    this.FILTER_FROM_TO = 'fromTo'
    this.SORT_BY_DATE = 'sortByDate'
    this.SORT_BY_NUMBER = 'sortByNumber'
    this.SORT_BY_STRING = 'sortByString'
  }

  get dates() {
    return this._datas
  }
  
  filteredData(action) {
    return this._datas.filter(data => this.filterDates(data, action)).sort(this.sortDatas(action))
  }

  filterDates(value, action) {
    const search = (value, key) => element => !!('' + element[key]).toUpperCase().includes(value.toUpperCase())
    const fromTo = (from, to, key) => element => !!((+element[key] >= +from || !from ) && (+element[key] <= +to || !to))
    const filters = Object.entries(action.filters).reduce((accumulator, [key, filter]) => {
      switch(filter.type) {
        case this.FILTER_SEARCH: return [...accumulator, search(filter.value, key)]
        case this.FILTER_FROM_TO: return [...accumulator, fromTo(filter.from, filter.to, key)]
      }
    }, [])

    return !filters.find(filter => !filter(value))
  }


  sortDatas(action) {
    const sorting = (key) => (a, b) => {
      let firstArg
      let secondArg

      if (a[key] instanceof Date) [firstArg, secondArg] = [Date.parse(a[key]), Date.parse(b[key])]
      if (typeof a[key] === 'string') [firstArg, secondArg] = [a[key].toUpperCase(), b[key].toUpperCase()]
      if (typeof a[key] === 'number') [firstArg, secondArg] = [a[key], b[key]]

      if (firstArg === secondArg) {
        return 0
      } else return (firstArg > secondArg) ? 1 : -1 
    }

    return sorting(action.sortBy)
  }

  find(id) {
    return this._datas.find((data) => data.id === id)
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
    this._datas.push(values)
    this.commitСhanges()

    return values
  }

  pushData(data) {
    this._datas.push(data)
    this.commitСhanges()
  }

  getId(key, value) {
    return (this._datas.find(data => data[key] === value) || {}).id
  }

  getIds(key, value) {
    return this._datas
      .filter(data => data[key] === value)
      .map(data => data.id)
  }

  changeData(id, key, value) {
    this._datas.forEach((data, index) => {
      if (data.id === id) {
        this._datas[index][key] = value
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
