import React, {Component} from 'react';
import Menu from './Menu.js';
import Profile from './Profile.js';

class Header extends Component {
    render() {
        return (
            <div id = "header">
                <div id = "logo">DESX</div>
                <Menu />
                <Profile userName = {this.props.user.login} cash = {this.props.user.money}/>
            </div>
        )
    }
}

export default Header