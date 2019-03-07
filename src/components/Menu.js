import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Shop from './Shop.js'
import Users from './Users.js'
import Inventory from './Inventory.js'

class Menu extends Component {
  isActive(path) {
    return (this.props.path === path) ? 'is-active' : ''
  }

  render() {
    return (
      <ul id = 'menu'>
        <li><Link to = {Shop.path} className = {this.isActive(Shop.path) + ' menu-li'} >Магазин</Link></li>
        <li><Link to = {Users.path } className = {this.isActive(Users.path) + ' menu-li'} >Пользователи</Link></li>
        <li><Link to = {Inventory.path} className = {this.isActive(Inventory.path) + ' menu-li'} >Инвентарь</Link></li>
      </ul>
    )
  }
}

export default Menu