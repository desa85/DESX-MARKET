import DataBase from './db.js'
import helper from '../helper.js'

const NEW = 'new'
const CANCELLED = 'cancelled'
const COMPLETED = 'completed'

class Order extends DataBase {
  constructor(userItemDb) {
    super('order')
    this.userItemDb = userItemDb
    this.PRICE = 'price'
    this.arguments = ['userId', 'itemId', 'userItemId', this.PRICE, 'status', 'created', 'updated']
  }

  addOrder(itemUserId, price) {
    const dateNow = new Date(Date.now())
    const data = this.userItemDb.find(itemUserId)
    this.insert(data.userId, data.itemId, itemUserId, price, NEW , dateNow, dateNow)
  }

  generateOrders() {
    if (this.isEmpty()) {
      const prices = [30, 40, 120, 150]
      const users = Array(4).fill(0).map((userId, index) => this.userItemDb.userDb._datas[index + 3].id)
      const items = [
        this.userItemDb.itemDb.getByColumn('name', 'Шпора Матан'),
        this.userItemDb.itemDb.getByColumn('name', 'Меч короля')
      ]
      const userItemId = users.forEach((user, index) => {
        this.addOrder(
          this.userItemDb.getItems(user)
            .find(item => item.item.id === [...items, ...items][index]).userItemId,
          prices[index]
        )
      })
    }
  }

  getItemsInventory(userId, action) {
    return this._datas
      .reduce((accumulator, order) => {
        order.login = this.userItemDb.itemDb.find(order.itemId).name
        if (order.status === NEW) {
          const itemId = this.userItemDb.find(order.userItemId).itemId
          const item = this.userItemDb.itemDb.find(itemId)
          const value = {
            name: item.name, 
            iconPath: item.iconPath, 
            price: order.price, 
            orderId: order.id, 
            login: order.login, 
            userId: order.userId,
            isUserSession: order.userId === this.sessionUserId()
          }
          return (this.filterDatas(value, action)) ? [...accumulator, value] : accumulator
        } else return accumulator
      }, [])
        .sort(this.sortDatas(action))
  }

  newOrders(userId) {
    return this._datas.filter(order => order.userId === userId && order.status === NEW)
  }

  cancel(orderId) {
    this.changeData(orderId, 'status', CANCELLED )
  }

  toSell(orderId, userId) {
    const sellerId = this.find(orderId).userId
    const userBalance = this.userItemDb.userDb.find(userId).money
    const sellerBalance = this.userItemDb.userDb.find(sellerId).money
    const price = this.find(orderId).price

    if (userBalance < price) return {userBalance: userBalance, price: price, lacks: price - userBalance }
    this.userItemDb.changeData(this.find(orderId).userItemId, 'userId', userId)
    this.changeData(orderId, 'status', COMPLETED )
    this.userItemDb.userDb.changeData(userId, 'money', helper.sumMoney(userBalance, -price))
    this.userItemDb.userDb.changeData(sellerId, 'money', helper.sumMoney(sellerBalance, price))
    return null
  }


}
export default Order