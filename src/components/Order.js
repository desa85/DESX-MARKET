import React, { Component } from 'react'
import Money from './Money'

class Item extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className = 'item'>
        <div className = 'item__name'>{this.props.name}</div>
        <div className = 'item__img'><img src = {this.props.img} /></div>
        <div className = 'item__buy' onClick = {() => {
          const isSell = this.props.db.order.toSell(this.props.orderId, this.props.db.user.sessionUserId())
          this.props.toggleModal(isSell)
        }} >
            <Money money = {this.props.price}  className = 'item__price' />
            <button className = 'item__button' style = { this.props.isItUser ? {color: '#ff8800'} : {} } >{!this.props.isItUser ? 'КУПИТЬ' : 'Снять с продажи'}</button>
        </div>
      </div>
    )
  }
}

export default Item