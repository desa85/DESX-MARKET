import Authorization from '../src/components/Authorization.js'
import Profile from '../src/components/Profile.js'
import UserDatabase from '../src/data/UserDatabase.js'
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

describe('Тестирование авторизации', () => {

    let wrapper
    let userDb
    let updateUser
    let profile
    let profileCreate

    const logIn = (userName) => {
        let result = {}
        wrapper.find('input').simulate('change', {
            target: {value: userName}
        })
        wrapper.find('#button-login').simulate('click', { preventDefault() {} })
        const user = userDb.getCurrentUser()
        const profile = profileCreate(user.login, user.money) 
        result.cash = '' + profile.find('#top-cash').props().children[0]
        result.name = profile.find('#top-username').props().children
        return result
       }

    beforeEach(() => {
        userDb = new UserDatabase()
        updateUser = () => {
            wrapper.setState({user: userDb.getCurrentUser()})
        }

        userDb.generateFakeUsers()
        wrapper = shallow(<Authorization user = {userDb.getCurrentUser()} dataOfUsers = {userDb} updateUser = {updateUser} />)
        
       profileCreate = (userName, cash) => shallow(<Profile userName = {userName} cash = {cash} />)

    })

    


    it('Ввод пустого поля', () => {
        wrapper.find('#button-login').simulate('click', { preventDefault() {} })
        let err = wrapper.find('#error-message').text()

        expect(err).toEqual('Логин содержит запрещенные символы')
    })

    it('Ввод невалидного значения', () => {
        wrapper.find('input').simulate('change', {
            target: {value: '//*/*zek'}
        })
        wrapper.find('#button-login').simulate('click', { preventDefault() {} })
        let err = wrapper.find('#error-message').text()

        expect(err).toEqual('Логин содержит запрещенные символы')
    })

    it('Ввод валидного значения', () => {
        wrapper.find('input').simulate('change', {
            target: {value: 'Lexa_555'}
        })
        wrapper.find('#button-login').simulate('click', { preventDefault() {} })
        const pathShop = wrapper.props().to
        const user = userDb.getCurrentUser()

        expect(pathShop).toEqual('/shop')
    })

    it ('Ввод несуществующего пользователя', () => {
        const userName = 'Lexa_555'
        const user = logIn(userName)

        expect(user.cash).toEqual('100')
        expect(user.name).toEqual(userName)
    })

    it ('Ввод существующего пользователя', () => {
        const userName = 'Lexa'
        const user = logIn(userName)

        expect(user.cash).toEqual('7800')
        expect(user.name).toEqual(userName)
    })

    
})

