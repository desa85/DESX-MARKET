import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Item from './Item.js'
import Header from './Header'
import Footer from './Footer'

class Inventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalItemName: '',
      modalItemIconPath: '',
      modalInput: '0',
      modalUserItemId: '',
      modal: false,
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
        modal: !this.state.modal,
        modalItemName: itemName,
        modalItemIconPath: itemIconPath,
        modalUserItemId: userItemId,
        modalInput: '0'
      })
  }

  clickModal() {
    this.toggleModal(this.props.name, this.props.img)
    this.props.db.order.addOrder(this.state.modalUserItemId, +this.state.modalInput)
  }
  
  render() {
    const modal = (
        <div className = 'shadow foreground' onClick = {e => {if (e.target.className === 'shadow foreground') this.toggleModal.bind(this)()}} >
          <div className = 'modal-inventory'>
            <div className = 'modal-inventory-name'>{this.state.modalItemName}</div>
            <div className = 'modal-inventory-img'><img src = {this.state.modalItemIconPath} /></div>
            <div className = 'input-form  modal-inventory-form' >
            <input
              value = {this.state.modalInput} 
              onChange = {e => {
                let value = e.target.value 
                this.setState({modalInput: value})
              }} /><span>р</span></div>
              <button className = 'input-form modal-inventory-button'
                onClick = {() => {
                  if (!this.state.modalInput.match(/^[0-9]+(\.[0-9]{1,2})?$/i) || +this.state.modalInput === 0) return
                  this.clickModal.bind(this)() 
                  this.setState({items: this.items()
                })}} 
              >{`продать за ${+this.state.modalInput || 0} р`}</button>
          </div>
        </div>
    )

    return(
      !this.props.db.user.getCurrentUser() ? 
      <Redirect to="/login" /> :
      <div>
        {this.state.modal && modal}
        <Header user = {this.props.user} />
        <div id = 'items'>
          {this.state.items}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Inventory