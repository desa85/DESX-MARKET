import React, {Component} from 'react'
import { Route, Redirect } from 'react-router'

class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      !this.props.user.getCurrentUser() ? 
      <Redirect to="/login" /> : <Redirect to="/shop" />
    )
  }
}

export default Main