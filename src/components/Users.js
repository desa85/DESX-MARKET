import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import User from './User.js'
import Pages from './Pages.js'
import Paginator from './Paginator.js'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginFilter: '',
      moneyFilterFrom: '',
      moneyFilterTo: ''
    }
  }

  render() {

    const loginFilter = {
      type: this.props.db.user.FILTER_SEARCH,
      value: this.state.loginFilter
    }
    const moneyFilter = {
      type: this.props.db.user.FILTER_FROM_TO,
      from: this.state.moneyFilterFrom,
      to: this.state.moneyFilterTo

    }
    const users = this.props.db.user.filteredData({login: loginFilter, money: moneyFilter})
      .map(user => <User userImgPath = {5} userName = {user.login} cash = {user.money} />)

      return (
        !this.props.db.user.getCurrentUser() ?
        <Redirect to="/login" /> :
        <div>
          <Header user = {this.props.user} path = {Users.path} />
          <Paginator page = {this.props.page} datas = {users} path = {Users.path}>
            <div>
              <div id = 'search'>
                <div>
                  <input placeholder = 'Ник' className = 'input-form-search' value = {this.state.loginFilter} onChange = {e => this.setState({loginFilter: e.target.value})} />
                </div>
                <div>
                  <span>Баланс от</span>
                  <input placeholder = '0' className = 'input-form-search' value = {this.state.moneyFilterFrom} onChange = {e => this.setState({moneyFilterFrom: e.target.value})} />
                </div>
                <div>
                  <span>до</span>
                  <input placeholder = '999' className = 'input-form-search' value = {this.state.moneyFilterTo} onChange = {e => this.setState({moneyFilterTo: e.target.value})} />
                </div>
                            
              </div>
              <div id = 'filter'>
                <input type = 'radio' name = 'filter' id = 'radio-po-date'  className = 'filter-radio' />
                <label for = 'radio-po-date' className = 'filter-button'>ПО ДАТЕ</label>
                <input type = 'radio' name = 'filter' id = 'radio-po-niku' className = 'filter-radio' />
                <label for = 'radio-po-niku' className = 'filter-button'>ПО НИКУ</label>
                <input type = 'radio' name = 'filter' id = 'radio-po-balansu' className = 'filter-radio' />
                <label for = 'radio-po-balansu' className = 'filter-button'>ПО БАЛАНСУ</label>
              </div>
            </div>
          </Paginator>
          <Footer />
        </div>
    )
  }
}

Users.path = '/users'

export default Users
