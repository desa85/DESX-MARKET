import React, {Component} from 'react'
import { Route, Redirect } from 'react-router'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

class Shop extends Component {
    render() {
        return (
            !sessionStorage['login'] ? 
            <Redirect to="/login" /> :
            <div id = 'wrapper'>
                <Header user = {this.props.user} />
                <Content />
                <Footer />
            </div>
        )
    }
}

export default Shop