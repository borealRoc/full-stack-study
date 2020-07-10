import React, { Component } from 'react'
import { Button } from 'antd'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'
// import { thunkLogin } from '../../action/Login'
import { sagaLogin } from '../../action/Login'

const mapStateToProps = state => { return { userInfo: state.loginReducer } }
// const mapDispatchToProps = { thunkLogin }
const mapDispatchToProps = { sagaLogin }
@connect(mapStateToProps, mapDispatchToProps)
class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    setName = e => {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        // const { userInfo, thunkLogin, location } = this.props
        const { userInfo, sagaLogin, location } = this.props
        const { isLogin, loading } = userInfo
        const to = location.state.redirect || "/"
        if (isLogin) {
            return <Redirect to={to} />
        }

        const { name } = this.state

        return (
            <div>
                <h3>Login Page</h3>
                <input type="text" value={name} onChange={this.setName} />
                <Button onClick={name => sagaLogin(name)}>{loading ? "登录中..." : "登录"}</Button>
            </div>
        )
    }
}
export default LoginPage
