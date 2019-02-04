import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class Menu extends Component {
  render() {
    return (
      <ul id = 'menu'>
        <li><Link to = "/shop">Магазин</Link></li>
        <li>Пользователи</li>
        <li>Инвентарь</li>
      </ul>
    )
  }
}

export default Menu