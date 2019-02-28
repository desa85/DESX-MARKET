import DataBase from './db.js'

class UserItemDatabase extends DataBase {
    constructor(userDb, itemDb) {
        super('userItem')
        this.userDb = userDb
        this.itemDb = itemDb
        this.arguments = ['userId', 'itemId']
      }

      addItem(user, item) {
        if(!this.userDb.find(user) && !this.itemDb.find(item)) return null
        this.insert(user, item)
      }

      present(user) {
        const presents = []

        presents.push(this.itemDb.search('name', 'Меч короля'))
        presents.push(this.itemDb.search('name', 'Шпора Матан'))

        const presentsAdd = [...this.pushSameValue(presents[0], this.random(4)), ...this.pushSameValue(presents[1], this.random(2))]
          .sort((a, b) => Math.random() -0.5)
        presentsAdd.forEach(present => this.addItem(user, present))
      }

      presentAllUsers(arrIds) {
        if (arrIds) arrIds.forEach(id => this.present(id))
      }

      getItems(userId) {
        return this.dates
          .filter(userItem => userItem.userId === userId)
          .map(userItem => this.itemDb.find(userItem.itemId))
      }
}

export default UserItemDatabase