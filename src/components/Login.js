import React, {Component} from 'react'
import Authorization from './Authorization.js' 

class Login extends Component {
  render() {
    return (
      <div>
        <h1 id = 'hello-message'>Добро пожаловать</h1>
        <Authorization dataOfUsers = {this.props.dataOfUsers} user = {this.props.user} updateUser = {this.props.updateUser} userItemDb = {this.props.userItemDb}/>
      </div>
    )
  }
}

export default Login