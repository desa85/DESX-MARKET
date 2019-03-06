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
        <button className = 'item-sell' onClick = {this.props.orderPrice ? () => this.props.onClickCancel() : () => this.props.onClickSell()} >
          {this.props.orderPrice ? <span>Снять с продажи<p>{this.props.orderPrice}</p></span> : 'Продать'}
        </button>
      </div>
    )
  }
}

export default Item