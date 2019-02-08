import React, {Component} from 'react'
import { Redirect } from 'react-router'
import Header from './Header'
import Footer from './Footer'

class Shop extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      !this.props.users.getCurrentUser() ? 
      <Redirect to="/login" /> :
      <div id = 'wrapper'>
        <Header user = {this.props.user} />
          <h1>Товаров пока нет</h1>
        <Footer />
      </div>
    )
  }
}

export default Shop