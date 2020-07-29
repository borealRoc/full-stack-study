import React from "react"
import styles from "./index.css"
import { Login } from "ant-design-pro"
import { connect } from "dva"
const { UserName, Password, Submit } = Login

export default connect()(function(props) {
  // let from = props.location.state.from || "/" // 重定向地址
  const onSubmit = (err, values) => {
    console.log("用户输入：", values)
    if (!err) {
      // 校验通过，提交登录
      props.dispatch({ type: "users/login", payload: values })
    }
  }
  return (
    <div className={styles.loginForm}>
      {/* logo */}
      <img className={styles.logo} src="https://img.kaikeba.com/logo-new.png" alt=""/>
      {/* 登录表单 */}
      <Login onSubmit={onSubmit}>
        <UserName
          name="username"
          placeholder="请输入用户名"
          rules={[{ required: true, message: "请输入用户名" }]}
        />
        <Password
          name="password"
          placeholder="请输入密码"
          rules={[{ required: true, message: "请输入密码" }]}
        />
        <Submit>登录</Submit>
      </Login>
    </div>
  )
})
