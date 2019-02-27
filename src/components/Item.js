import React, { Component } from 'react'

class Item extends Component {
    render() {
        return (
            <div className = 'item'>
                <div className = 'item-name'>{this.props.name}</div>
                <div className = 'item-img'><img src = {this.props.img} /></div>
                <div className = 'item-sell'>Продать</div>
            </div>
        )
    }
}

export default Item