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

  addOrder(itemUserId, prise) {
    const dataNow = new Date(Date.now())
    const data = this.userItemDb.find(itemUserId)
    this.insert(data.userId, data.itemId, itemUserId, prise, NEW , dataNow, dataNow)
  }

  getAllItems(userId) {
    return this._dates
      .filter(order => order.userId !== userId && order.status === NEW)
      .map(order => {
        const itemId = this.userItemDb.find(order.userItemId).itemId
        const item = this.userItemDb.itemDb.find(itemId)
        return {name: item.name, iconPath: item.iconPath, price: order.price, orderId: order.id}
      })
  }

  newOrders(userId) {
    return this._dates.filter(order => order.userId === userId && order.status === NEW)
  }
/*
  [
    {
      item: {
        name: string,
        iconPath: string
      },
      userItemId: UUID,
      price: numeric,
      orderId: UUID
    },
    {
      item: {
        name: string,
        iconPath: string
      },
      userItemId: UUID,
    }
  ]
 */

 /* getUserItems(userId) {
    const orders = this._dates
      .filter(order => order.userId === userId && order.status === NEW)
      .map(order => {return {price: order.price, orderId: order.id, userItemId: order.userItemId }})
    return this.userItemDb.getItems(userId)
      .map(item => {
        for (let orderItemKey in orders) if (orders[orderItemKey].userItemId === item.userItemId) 
          for (let itemKey in orders) item[itemKey] = orders[orderItemKey][itemKey]
        return item
      })
  }*/

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