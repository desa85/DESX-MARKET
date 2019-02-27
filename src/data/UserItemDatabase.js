import DataBase from './db.js'

class UserItemDatabase extends DataBase {
    constructor(users, items) {
        super('userIteam')
        this.users = users
        this.items = items
        this.arguments = ['user_id', 'item_id']
      }

      addItem(user, item) {
        if(!this.users.find(user) && !this.items.find(item)) return null
        this.insert(user, item)
      }

      present(user) {
        let presents = []

        presents.push(this.items.search('name', 'Меч короля'))
        presents.push(this.items.search('name', 'Шпора Матан'))

        let presentsAdd = [...this.pushSameValue(presents[0], this.random(4)), ...this.pushSameValue(presents[1], this.random(2))]
          .sort((a, b) => Math.random() -0.5)
        presentsAdd.forEach(present => this.addItem(user, present))
      }

      presentAllUsers(arrId) {
        if (arrId) arrId.forEach(id => this.present(id))
      }

      getItem(userId) {
        let connect = this.searchAll('user_id', userId)
        if (!connect) return null
        let items = connect
          .map((id) => this.find(id)['item_id'])
          .map(itemId => this.items.find(itemId))
        return items
      }

      getThisItem() {
        return this.getItem(sessionStorage['login'])
      }
}

export default UserItemDatabase