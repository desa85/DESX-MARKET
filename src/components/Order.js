import React, { Component } from 'react'

class Item extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const orderId = this.props.db.order.getId('userItemId', this.props.userItemId)
    const order = this.props.db.order.find(orderId) || null

    return (
      <div className = 'item'>
        <div className = 'item-name'>{this.props.name}</div>
        <div className = 'item-img'><img src = {this.props.img} /></div>
        <div className = 'item-buy' onClick = {() => this.props.toggleModal(this.props.db.order.toSell(this.props.orderId, this.props.db.user.sessionUserId()))} >
            <div className = 'item-buy-price' >
                {this.props.price}
            </div>
            <button className = 'item-buy-button' >КУПИТЬ</button>
        </div>
      </div>
    )
  }
}

export default Item