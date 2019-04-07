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
        <button className = {`item__sell ${this.props.orderPrice ? 'item__sell_active' : ''}`} onClick = {this.props.orderPrice ? () => this.props.onClickCancel() : () => this.props.onClickSell()} >
          {this.props.orderPrice ? <span>Снять с продажи<p>{this.props.orderPrice}<span className = 'money'></span></p></span> : 'Продать'}
        </button>
      </div>
    )
  }
}

export default Item