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

	find(id) {
		return this._dates.find((data) => data.id === id)
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
}

export default DataBase