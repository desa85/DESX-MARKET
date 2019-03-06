import React, { Component } from 'react'

class Item extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className = 'item'>
        <div className = 'item-name'>{this.props.name}</div>
        <div className = 'item-img'><img src = {this.props.img} /></div>
        <div className = 'item-buy' onClick = {() => {
          const isSell = this.props.db.order.toSell(this.props.orderId, this.props.db.user.sessionUserId())
          this.props.toggleModal(isSell)
        }} >
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