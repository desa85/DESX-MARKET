import React, {Component} from 'react'
import { Redirect, Router, Route } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import Pages from './Pages'
import Order from './Order'
import Paginator from './Paginator'
import Money from './Money.js'

class Shop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModal: false,
      modalValue: {},
      loginFilter: '',
      moneyFilterFrom: '',
      moneyFilterTo: '',
      sortBy: this.props.db.user.CREATED
    }
  }

  items(actions) {
    return this.props.db.order.getItemsInventory(this.props.db.user.sessionUserId(), actions)
      .map(item => {
        return {name: item.name, iconPath: item.iconPath, price: item.price, orderId: item.orderId}
      })
  }

  toggleModal(values) {
      this.setState({
        isModal: !!values,
        modalValue: values || {}
      })
  }

  sortOut(sort){
    this.setState({
      sortBy: sort
    })
  }

  render() {
    const modal = (
      <div className = 'shadow' onClick = {e => {if (e.target.className === 'shadow') this.toggleModal.bind(this)()}} >
        <div className = 'modal-inventory'>
          <div className = 'modal-inventory__err'>
              <p><h3>Недостаточно средств</h3></p>
              <div className = 'modal-inventory__info'>
                <p>Ваш Баланс: <Money money = {this.state.modalValue.userBalance} /></p>
                <p>Стоимость предмета: <Money money = {this.state.modalValue.price} /></p>
              </div>
              <p>Вам не хватает: <Money money = {this.state.modalValue.lacks} /></p>
              <button className = 'modal-inventory__button' onClick = {this.toggleModal.bind(this, false)}>ок</button>
          </div>
        </div>
      </div>
    )
    const typeSort =  {
      byDate: this.props.db.user.CREATED,
      byNumber: this.props.db.order.PRICE,
      byString: this.props.db.user.LOGIN
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
    const actions = {
      filters: {
        login: loginFilter, 
        price: moneyFilter
      },
      sortBy: this.state.sortBy
    } 

    const orders = this.items(actions).map(item => <Order 
      db = {this.props.db} 
      userItemId = {item.userItemId} 
      name = {item.name} 
      img = {item.iconPath} 
      price = {item.price} 
      orderId = {item.orderId}
      toggleModal = {this.toggleModal.bind(this)}
    />)

    return (
      !this.props.db.user.getCurrentUser() ?
      <Redirect to="/login" /> :
      <div id = 'wrapper'>
      {this.state.isModal && modal}
        <div>
          <Header user = {this.props.user} path = {Shop.path} db = {this.props.db} />
          {/*TODO refactoring (logic to database)*/}
          <div id = 'content'>
            <Paginator datas = {orders} page = {this.props.page} path = {Shop.path}>
              <div>
                <div className = 'filter'>
                  <div>
                    <input placeholder = 'Предмет' className = 'filter__input filter__input_full' value = {this.state.loginFilter} onChange = {e => this.setState({loginFilter: e.target.value})} />
                  </div>
                  <div>
                    <span>Цена от</span>
                    <input placeholder = '0' className = 'filter__input' value = {this.state.moneyFilterFrom} onChange = {e => this.setState({moneyFilterFrom: e.target.value})} />
                  </div>
                  <div>
                    <span>до</span>
                    <input placeholder = '999' className = 'filter__input' value = {this.state.moneyFilterTo} onChange = {e => this.setState({moneyFilterTo: e.target.value})} />
                  </div>
                </div>
                <div className = 'filter'>
                  <input type = 'radio' name = 'filter' id = {typeSort.byDate} className = 'filter__radio' />
                  <label for = {typeSort.byDate} className = 'filter__button'>ПО ДАТЕ</label>
                  <input type = 'radio' name = 'filter' id = {typeSort.byString} className = 'filter__radio' />
                  <label for = {typeSort.byString} className = 'filter__button'>ПО НАЗВАНИЮ</label>
                  <input type = 'radio' name = 'filter' id = {typeSort.byNumber} className = 'filter__radio' />
                  <label for = {typeSort.byNumber} className = 'filter__button'>ПО ЦЕНЕ</label>
                </div>
              </div>
            </Paginator>
          </div>
          <Footer />
        </div>
      </div>
  )
  }

  componentDidMount() {
    const radio = document.getElementsByClassName('filter__radio')
      for (let i = 0; i <= radio.length -1; i++) {
        radio[i].addEventListener('change', () => this.setState({sortBy: radio[i].id}))
      }
  }
}

Shop.path = '/shop'

export default Shop