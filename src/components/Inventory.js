import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Item from './Item.js'
import Header from './Header'
import Footer from './Footer'

class Inventory extends Component {
    constructor(props) {
        super(props)
    }
   items() {
        return this.props.userItemDb.getThisItem()
            .map(item => {return {name: item.name, iconPath: item.iconPath}})
    }

    render() {
        return(
            !this.props.users.getCurrentUser() ? 
            <Redirect to="/login" /> :
            <div>
                <Header user = {this.props.user} />
                <div id = 'items'>
                    {this.items().map(item => <Item name = {item.name} img = {item.iconPath} />)}
                </div>
                <Footer />
            </div>
        )
    }
}

export default Inventory