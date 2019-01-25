const uuid = require('uuid/v4')

class DataBase {
    constructor() {
        this._dates = []
        this.arguments = Object.values(arguments)
        this.dataName = this.arguments.shift()
    }

    get dates() {
        return this._dates
    }

    getData(id) {
        let result
        this._dates.forEach((data) => {
            if (data.id === id) return result = data
        })
        return result
    }

    addData() {
        let arg = Object.values(arguments)
        let values = {}
        let keys = this.arguments

        keys.forEach((key, index) => {
            values[key] = arg[index] !== undefined ? arg[index] : ""
        })
        values['id'] = uuid()
        this._dates.push(values)
        localStorage.setItem(this.dataName, JSON.stringify(this._dates))

        return values
    }

    pushData(data) {
        this._dates.push(data)
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

    generateFakeUsers() {
        if (localStorage.getItem('users')) {
            JSON.parse(localStorage.getItem('users')).forEach((iteam) => this.pushData(iteam))
        } else {
            this.addData('Lexa', 7800)
            this.addData('Oleg', 3)
            this.addData('Macho', 8000)
        
            localStorage.setItem('users', JSON.stringify(this.dates))
        }
    }
}

export default DataBase