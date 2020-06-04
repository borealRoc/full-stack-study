import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"

const mapStateToProps = state => { return { userInfo: state.loginReducer } }
@connect(mapStateToProps)
class PrivateRoute extends Component {
    render() {
        const { component: Comp, userInfo, ...rest } = this.props
        console.log('PrivateRoute--props', this.props)
        console.log('PrivateRoute--rest', rest)
        const { isLogin } = userInfo
        return (
            <Route {...rest} render={props =>
                isLogin ?
                    (<Comp {...props} />) :
                    (<Redirect to={{ pathname: '/login', state: { redirect: props.location.pathname } }} />)} />
        )
    }
}
export default PrivateRoute
