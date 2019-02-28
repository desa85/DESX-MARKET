import DataBase from './db.js'

class ItemDatabase extends DataBase {
    constructor() {
        super('items')
        this.arguments = ['name', 'iconPath']
      }

    generateItems() {
        if (this.isEmpty()) {
            this.insert('Меч короля', '/img/item_sword.jpg')
            this.insert('Шпора Матан', '/img/item_shpora.jpg')
          }
    }

}

export default ItemDatabase