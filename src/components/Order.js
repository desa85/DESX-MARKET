import React, { Component } from 'react'

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
            <div className = 'item__price' >
                {this.props.price}
                <span className = 'money'></span>
            </div>
            <button className = 'item__button' >КУПИТЬ</button>
        </div>
      </div>
    )
  }
}

export default Item