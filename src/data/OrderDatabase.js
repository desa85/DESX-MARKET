import DataBase from './db.js'
import helper from '../helper.js'

const NEW = 'new'
const CANCELLED = 'cancelled'
const COMPLETED = 'completed'

class Order extends DataBase {
  constructor(userItemDb) {
    super('order')
    this.userItemDb = userItemDb
    this.arguments = ['userId', 'itemId', 'userItemId', 'price', 'status', 'created', 'updated']
  }

  addOrder(itemUserId, price) {
    const dateNow = new Date(Date.now())
    const data = this.userItemDb.find(itemUserId)
    this.insert(data.userId, data.itemId, itemUserId, price, NEW , dateNow, dateNow)
  }

  getItemsInventory(userId, action) {
    return this._dates
      .reduce((accumulator, order) => {
        order.login = this.userItemDb.itemDb.find(order.itemId).name
        if (order.userId !== userId && order.status === NEW) {
          const itemId = this.userItemDb.find(order.userItemId).itemId
          const item = this.userItemDb.itemDb.find(itemId)
          const value = {name: item.name, iconPath: item.iconPath, price: order.price, orderId: order.id, login: order.login}
          return (this.filterDates(value, action)) ? [...accumulator, value] : accumulator
        } else return accumulator
      }, [])
        .sort(this.sortDates(action))
  }

  newOrders(userId) {
    return this._dates.filter(order => order.userId === userId && order.status === NEW)
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