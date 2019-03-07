import React, {Component} from 'react'
import { Redirect } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import Pages from './Pages'
import Order from './Order'

class Shop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModal: false,
      modalValue: {}
    }
  }

  items() {
    return this.props.db.order.getItemsInventory(this.props.db.user.sessionUserId())
      .map(item => {
        return {name: item.name, iconPath: item.iconPath, price: item.price, orderId: item.orderId}
      })
  }

  toggleModal(values) {
      this.setState({
        isModal: !!values,
        modalValue: values || {}
      })
  }

  render() {
    const modal = (
      <div className = 'shadow foreground' onClick = {e => {if (e.target.className === 'shadow foreground') this.toggleModal.bind(this)()}} >
        <div className = 'modal-inventory'>
          <div className = 'modal-inventory-err'>
              <p>Недостаточно средств</p>
              <div>
                <p>Ваш Баланс: <span>{this.state.modalValue.userBalance}</span></p>
                <p>Стоимость предмета: <span>{this.state.modalValue.price}</span></p>
              </div>
              <p>Вам не хватает: <span>{this.state.modalValue.lacks}</span></p>
              <button className = 'input-form modal-inventory-button' onClick = {this.toggleModal.bind(this, false)}>ок</button>
          </div>
        </div>
      </div>
    )
    return (
      !this.props.db.user.getCurrentUser() ?
      <Redirect to="/login" /> :
      <div id = 'wrapper'>
      {this.state.isModal && modal}
        <div>
          <Header user = {this.props.user} path = {Shop.path} />
          <div id = 'contents'>
              <div id = 'search'>
                <div>
                  <input placeholder = 'Ник' className = 'input-form-search' />
                </div>
                <div>
                  <span>Цена от</span>
                  <input placeholder = '0' className = 'input-form-search' />
                </div>
                <div>
                  <span>до</span>
                  <input placeholder = '999' className = 'input-form-search' />
                </div>
                  
              </div>
              <div id = 'filter'>
                <input type = 'radio' name = 'filter' id = 'radio-po-date'  className = 'filter-radio' />
                <label for = 'radio-po-date' className = 'filter-button'>ПО ДАТЕ</label>
                <input type = 'radio' name = 'filter' id = 'radio-po-niku' className = 'filter-radio' />
                <label for = 'radio-po-niku' className = 'filter-button'>ПО НИКУ</label>
                <input type = 'radio' name = 'filter' id = 'radio-po-balansu' className = 'filter-radio' />
                <label for = 'radio-po-balansu' className = 'filter-button'>ПО БАЛАНСУ</label>
              </div>
              <div id = 'items'>
                {this.items().map(item => <Order 
                  db = {this.props.db} 
                  userItemId = {item.userItemId} 
                  name = {item.name} 
                  img = {item.iconPath} 
                  price = {item.price} 
                  orderId = {item.orderId}
                  toggleModal = {this.toggleModal.bind(this)}
                />)}
              </div>
              <Pages count = {5} />
          </div>
          <Footer />
        </div>
      </div>
  )
  }
}

Shop.path = '/shop'

export default Shop