import React, {Component} from 'react';

class Profile extends Component {
constructor(props) {
    super(props)
}

  render() {
    return (
      <div id = 'profile'>
        <div>
          <div id = 'top-username'>{this.props.userName}</div>
          <div id = 'top-cash'>{this.props.cash}<b>$</b></div>
        </div>
        <div id = 'top-avatar'>

        </div>
      </div>
    )
  }
}

export default Profile