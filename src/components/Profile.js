import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class Profile extends Component {
constructor(props) {
    super(props)
}

  render() {
    return (
      <div id = 'profile'>
        <div>
          <div id = 'top-username'>{this.props.userName}</div>
          <Link to = "/balance" id = 'top-cash'>{this.props.cash}<b>$</b></Link>
        </div>
        <div id = 'top-avatar'>

        </div>
      </div>
    )
  }
}

export default Profile