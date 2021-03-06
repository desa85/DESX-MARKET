import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import Item from './Item.js'
import Header from './Header'
import Footer from './Footer'
import Paginator from './Paginator.js'
import Money from './Money.js'
import Modal from './Modal.js'
import Shop from './Shop.js'

class Inventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalItemName: '',
      modalItemIconPath: '',
      modalInput: '',
      modalUserItemId: '',
      isModalSell: false,
      isModalConfirm: false,
      items: this.items()
    }
  }
  items() {
    const user = this.props.user || {}
    const itemsInfo = this.props.db.userItem.getItems(user.id)
    const orders = this.props.db.order.newOrders(user.id)
    return itemsInfo.map(itemInfo => {
      const order = (orders.find(order => itemInfo.userItemId === order.userItemId) || {})
      return (<Item 
        name = {itemInfo.item.name} 
        img = {itemInfo.item.iconPath} 
        orderPrice = {order.price}
        onClickSell = {() => this.toggleModal.bind(this)(itemInfo.item.name, itemInfo.item.iconPath, itemInfo.userItemId)} 
        onClickCancel = {() => {this.props.db.order.cancel(order.id); this.setState({items: this.items()})}}
      />)
    })
  }
  
  toggleModal(itemName, itemIconPath, userItemId) {
      this.setState({
        isModalSell: !this.state.isModalSell,
        modalItemName: itemName,
        modalItemIconPath: itemIconPath,
        modalUserItemId: userItemId,
        modalInput: ''
      })
  }

  clickModal() {
    this.toggleModal()
    this.props.db.order.addOrder(this.state.modalUserItemId, +this.state.modalInput)
  }
  
  render() {
    return(
      !this.props.db.user.getCurrentUser() ? 
      <Redirect to="/login" /> :
      <div>
        <Modal view = {this.state.isModalSell} toggle = {() => this.setState( {isModalSell: !this.state.isModalSell} )} >
          <div className = 'modal-inventory'>
            <div className = 'modal-inventory__name'>{this.state.modalItemName}</div>
            <div className = 'modal-inventory__img'><img src = {this.state.modalItemIconPath} /></div>
            <input
              className = 'modal-inventory__input'
              autofocus = "true"
              value = {this.state.modalInput} 
              onChange = {e => {
                let value = e.target.value 
                this.setState({modalInput: value})
              }} />
              <button className = 'modal-inventory__button'
                onClick = {() => {
                  if (!this.state.modalInput.match(/^[0-9]+(\.[0-9]{1,2})?$/i) || +this.state.modalInput === 0) return
                  this.clickModal.bind(this)() 
                  this.setState({
                    items: this.items(),
                    isModalConfirm: true
                })}} 
              >
                <Money money = {`продать за ${+this.state.modalInput || 0} `} />
              </button>
          </div>
        </Modal>
        <Modal view = {this.state.isModalConfirm} toggle = {() => this.setState( {isModalConfirm: !this.state.isModalConfirm} )} >
        <div className = 'modal-inventory'>
          <div className = 'modal-inventory__err'>
              <h1>Ваш предмет выставлен на продажу в разделе <Link to = {Shop.path} className = 'link'>Магазин</Link></h1>
              <button className = 'modal-inventory__button' onClick = {() => this.setState( {isModalConfirm: !this.state.isModalConfirm} )}>ок</button>
          </div>
        </div>
        </Modal>
        <Header user = {this.props.user} path = {Inventory.path} db = {this.props.db} />
        <div id = 'content'>
          <Paginator datas = {this.state.items} page = {this.props.page} path = {Inventory.path} />
        </div>
        <Footer />
      </div>
    )
  }
}

Inventory.path = '/inventory'

export default Inventory