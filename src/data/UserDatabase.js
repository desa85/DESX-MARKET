import DataBase from './db.js'

class UserDatabase extends DataBase {

  constructor() {
    super('users')
    this.LOGIN = 'login'
    this.MONEY = 'money'
    this.CREATED = 'created'
    this.AVATAR = 'avatar'
    this.arguments = [this.LOGIN, this.MONEY, this.CREATED, this.AVATAR]
  }

  getId(login) {
    return this.dates.find(user => user.login.toLowerCase() === login.toLowerCase())
  }

  generateFakeUsers() {
    if (this.isEmpty()) {
      return [
        this.insert('Lexa', 7800, new Date('2019', '03', '05'), 1).id,
        this.insert('Oleg', 3, new Date('2019', '03', '06'), 1).id,
        this.insert('Macho', 8000, new Date('2019', '03', '04'), 1).id,
        ...Array(42).fill(0).map((bot, index) => this.insert('bot' + index, 8000, new Date('2019', '03', '07'), 1).id)
      ]
    } else return []
  }

  getCurrentUser() {
    return this.find(this.sessionUserId()) || null
  }

  updateCurrentUser(login) {
    sessionStorage['sessionUserId'] = this.getId(login).id
  }

  addMoney(money) {
    const id = this.sessionUserId()
    const userMoney = +super.find(id).money
    this.changeData(id, 'money', userMoney + +money)
  }
}

export default UserDatabase
