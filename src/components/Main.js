import React, {Component} from 'react'
import { Route, Redirect } from 'react-router'


class Main extends Component {
    render() {
        return (
            !sessionStorage['login'] ? 
            <Redirect to="/login" /> : <Redirect to="/shop" />
        )
    }
}

export default Main