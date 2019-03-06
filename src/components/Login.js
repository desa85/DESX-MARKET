import React, {Component} from 'react'
import Authorization from './Authorization.js' 

class Login extends Component {
  render() {
    return (
      <div>
        <h1 id = 'hello-message'>Добро пожаловать</h1>
        <Authorization db = {this.props.db} />
      </div>
    )
  }
}

export default Login