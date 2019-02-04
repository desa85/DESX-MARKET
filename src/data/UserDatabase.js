import DataBase from './db.js'

class UserDatabase extends DataBase {

  constructor() {
    super()
    this._dates = []
    this.arguments = ['login', 'money']
    this.dataName = 'users'
  }

  search(login) {
    return super.search('login', login)
  }

  generateFakeUsers() {
    if (localStorage.getItem('users')) {
      JSON.parse(localStorage.getItem('users')).forEach((iteam) => this.pushData(iteam))
    } else {
      this.insert('Lexa', 7800)
      this.insert('Oleg', 3)
      this.insert('Macho', 8000)
      localStorage.setItem('users', JSON.stringify(this.dates))
    }
  }

  getCurrentUser() {
    return this.find(sessionStorage['login']) || null
  }

  updateCurrentUser(login) {
    sessionStorage['login'] = this.search(login)
  }

  addMoney(money) {
    const id = sessionStorage['login']
    const moneyInData = +super.find(id)['money']
    this.changeData(id, 'money', moneyInData + +money)
    localStorage.setItem('users', JSON.stringify(this.dates))
  }
}

export default UserDatabase
