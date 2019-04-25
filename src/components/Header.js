import React, {Component} from 'react';
import Menu from './Menu.js';
import Profile from './Profile.js';

class Header extends Component {
  render() {
    return (
      <div id = "header">
        <div id = "header__logo">DESX</div>
        <Menu path = {this.props.path}/>
        <Profile userName = {this.props.user.login} cash = {this.props.user.money} db = {this.props.db}/>
      </div>
    )
  }
}

export default Header