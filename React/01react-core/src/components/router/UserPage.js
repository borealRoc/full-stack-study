import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../action/Login'

const mapStateToProps = state => { return { userInfo: state.loginReducer } }
const mapDispatchToProps = { logout }
@connect(mapStateToProps, mapDispatchToProps)
class UserPage extends Component {
    render() {
        const { userInfo, logout } = this.props
        const { name } = userInfo
        return (
            <div>
                <h3>欢迎您：{name}</h3>
                <Button onClick={logout}>退出登录</Button>
            </div>
        )
    }
}
export default UserPage
