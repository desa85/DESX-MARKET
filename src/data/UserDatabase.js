import DataBase from './db.js'

class UserDatabase extends DataBase {

  constructor() {
    super('users')
    this.arguments = ['login', 'money']
  }

  search(login) {
    return super.search('login', login)
  }

  generateFakeUsers() {
    if (!localStorage.getItem('users')) {
      let usersId = []
      usersId.push(this.insert('Lexa', 7800)['id'])
      usersId.push(this.insert('Oleg', 3)['id'])
      usersId.push(this.insert('Macho', 8000)['id'])
      localStorage.setItem('users', JSON.stringify(this.dates))
      return usersId
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
  }
}

export default UserDatabase
