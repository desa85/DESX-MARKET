import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class Menu extends Component {
  render() {
    return (
      <ul id = 'menu'>
        <li><Link to = "/shop">Магазин</Link></li>
        <li><Link to = "/users">Пользователи</Link></li>
        <li><Link to = "/inventory">Инвентарь</Link></li>
      </ul>
    )
  }
}

export default Menu