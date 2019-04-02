import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Shop from './Shop.js'
import Users from './Users.js'
import Inventory from './Inventory.js'

class Menu extends Component {
  isActive(path) {
    return (this.props.path === path) ? 'menu__li_active' : ''
  }

  render() {
    return (
      <ul className = 'menu'>
        <li><Link to = {Shop.path} className = {'menu__li ' + this.isActive(Shop.path)} >Магазин</Link></li>
        <li><Link to = {Users.path } className = {'menu__li ' + this.isActive(Users.path)} >Пользователи</Link></li>
        <li><Link to = {Inventory.path} className = {'menu__li ' + this.isActive(Inventory.path)} >Инвентарь</Link></li>
      </ul>
    )
  }
}

export default Menu