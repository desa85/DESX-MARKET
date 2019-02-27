import DataBase from './db.js'

class ItemDatabase extends DataBase {
    constructor() {
        super('iteams')
        this.arguments = ['name', 'iconPath']
      }

    generateitems() {
        if (!localStorage.getItem('iteams')) {
            this.insert('Меч короля', '../img/item_sword.jpg')
            this.insert('Шпора Матан', '../img/item_shpora.jpg')
          }
    }

}

export default ItemDatabase