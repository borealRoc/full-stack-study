import React, { Component } from 'react'
import { Button } from 'antd'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { login } from '../../action/Login'

const mapStateToProps = state => { return { userInfo: state.loginReducer } }
const mapDispatchToProps = { login }
@connect(mapStateToProps, mapDispatchToProps)
class LoginPage extends Component {
    render() {
        const { userInfo, login, location } = this.props
        const { isLogin } = userInfo
        const to = location.state.redirect || "/"
        if (isLogin) {
            return <Redirect to={to} />
        }
        return (
            <div>
                <h3>Login Page</h3>
                <Button onClick={login}>登录</Button>
            </div>
        )
    }
}
export default LoginPage
