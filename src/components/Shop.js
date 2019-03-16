import React, {Component} from 'react'
import { Redirect, Router, Route } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import Pages from './Pages'
import Order from './Order'
import Paginator from './Paginator'

class Shop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModal: false,
      modalValue: {},
      loginFilter: '',
      moneyFilterFrom: '',
      moneyFilterTo: ''
    }
  }

  items(actions) {
    return this.props.db.order.getItemsInventory(this.props.db.user.sessionUserId(), actions)
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

    const loginFilter = {
      type: this.props.db.user.FILTER_SEARCH,
      value: this.state.loginFilter
    }
    const moneyFilter = {
      type: this.props.db.user.FILTER_FROM_TO,
      from: this.state.moneyFilterFrom,
      to: this.state.moneyFilterTo
    }
    const actions = {login: loginFilter, price: moneyFilter} 

    const orders = this.items(actions).map(item => <Order 
      db = {this.props.db} 
      userItemId = {item.userItemId} 
      name = {item.name} 
      img = {item.iconPath} 
      price = {item.price} 
      orderId = {item.orderId}
      toggleModal = {this.toggleModal.bind(this)}
    />)

    return (
      !this.props.db.user.getCurrentUser() ?
      <Redirect to="/login" /> :
      <div id = 'wrapper'>
      {this.state.isModal && modal}
        <div>
          <Header user = {this.props.user} path = {Shop.path} />
          {/*TODO refactoring (logic to database)*/}
          <Paginator datas = {orders} page = {this.props.page} path = {Shop.path}>
            <div id = 'contents'>
                <div id = 'search'>
                  <div>
                    <input placeholder = 'Предмет' className = 'input-form-search' value = {this.state.loginFilter} onChange = {e => this.setState({loginFilter: e.target.value})} />
                  </div>
                  <div>
                    <span>Цена от</span>
                    <input placeholder = '0' className = 'input-form-search' value = {this.state.moneyFilterFrom} onChange = {e => this.setState({moneyFilterFrom: e.target.value})} />
                  </div>
                  <div>
                    <span>до</span>
                    <input placeholder = '999' className = 'input-form-search' value = {this.state.moneyFilterTo} onChange = {e => this.setState({moneyFilterTo: e.target.value})} />
                  </div>
                    
                </div>
                <div id = 'filter'>
                  <input type = 'radio' name = 'filter' id = 'radio-po-date'  className = 'filter-radio' />
                  <label for = 'radio-po-date' className = 'filter-button'>ПО ДАТЕ</label>
                  <input type = 'radio' name = 'filter' id = 'radio-po-niku' className = 'filter-radio' />
                  <label for = 'radio-po-niku' className = 'filter-button'>ПО НАЗВАНИЮ</label>
                  <input type = 'radio' name = 'filter' id = 'radio-po-balansu' className = 'filter-radio' />
                  <label for = 'radio-po-balansu' className = 'filter-button'>ПО ЦЕНЕ</label>
                </div>
                <div id = 'items'>
                </div>
            </div>
          </Paginator>
          <Footer />
        </div>
      </div>
  )
  }
}

Shop.path = '/shop'

export default Shop