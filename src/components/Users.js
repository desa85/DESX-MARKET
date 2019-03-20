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
      moneyFilterTo: '',
      sortActive: this.props.db.user.SORT_BY_DATE
    }
  }

  render() {

    const sorts =  {
      byDate: this.props.db.user.SORT_BY_DATE,
      byNumber: this.props.db.user.SORT_BY_NUMBER,
      byString: this.props.db.user.SORT_BY_STRING
    }
    const loginFilter = {
      type: this.props.db.user.FILTER_SEARCH,
      value: this.state.loginFilter
    }
    const moneyFilter = {
      type: this.props.db.user.FILTER_FROM_TO,
      from: this.state.moneyFilterFrom,
      to: this.state.moneyFilterTo

    }
    const users = this.props.db.user.filteredData({
      filters: {
        login: loginFilter, 
        money: moneyFilter
      },
      sorts: {
        created: this.state.sortActive === sorts.byDate && sorts.byDate,
        money: this.state.sortActive === sorts.byNumber && sorts.byNumber,
        login: this.state.sortActive === sorts.byString && sorts.byString
      }
    }).map(user => <User userImgPath = {5} userName = {user.login} cash = {user.money} />)

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
                <input type = 'radio' name = 'filter' id = {sorts.byDate}  className = 'filter-radio' />
                <label for = {sorts.byDate} className = 'filter-button'>ПО ДАТЕ</label>
                <input type = 'radio' name = 'filter' id = {sorts.byString} className = 'filter-radio' />
                <label for = {sorts.byString} className = 'filter-button'>ПО НИКУ</label>
                <input type = 'radio' name = 'filter' id = {sorts.byNumber} className = 'filter-radio' />
                <label for = {sorts.byNumber} className = 'filter-button'>ПО БАЛАНСУ</label>
              </div>
            </div>
          </Paginator>
          <Footer />
        </div>
    )
  }

  componentDidMount() {
    const radio = document.getElementsByClassName('filter-radio')
      for (let i = 0; i <= radio.length -1; i++) {
        radio[i].addEventListener('change', () => this.setState({sortActive: radio[i].id}))
      }
  }
}

Users.path = '/users'

export default Users
