import React, { Component } from 'react'
import { Input, Button } from "antd"
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const nameRule = {
    required: true,
    message: "please input your name",
};

const passwordRule = {
    required: true,
    message: "please input your password",
};

// 创建一个高阶组件：扩展现有表单，事件处理、数据收集、校验
const MyFormCreate = Comp => {
    return class extends Component {
        constructor(props) {
            super(props)
            this.options = {} //校验字段
            this.state = {} //表单value
        }

        // 表单输入项的双向数据绑定
        handleChange = e => {
            const { name, value } = e.target
            this.setState({
                [name]: value
            }, () => {
                // 值发生变化再校验
                this.validateFiled(name)
            })
        }

        // 单项校验
        validateFiled = field => {
            // 获取校验规则
            const rules = this.options[field].rules
            // rules中有任意一项不通过则返回false
            const result = !rules.some(rule => {
                if (rule.required) {
                    if (!this.state[field]) {
                        //校验失败
                        this.setState({
                            [field + "Message"]: rule.message
                        });
                        return true;
                    }
                    return false
                }
                return false
            });
            if (result) {
                // 校验通过
                this.setState({
                    [field + "Message"]: ""
                })
            }
            // 返回单项校验所有rule校验后的结果
            return result
        }
        // 全部校验
        validateFields = cb => {
            const results = Object.keys(this.options).map(field => this.validateFiled(field))
            // 如果所有表单校验通过，校验的结果才是成功
            const ret = results.every(r => r === true)
            cb(ret, this.state)
        }

        myGetFieldsValue = () => {
            return { ...this.state }
        }
        myGetFieldValue = field => {
            return this.state[field]
        }
        myGetFieldDecorator = (field, option, { label }) => {
            //保存当前输入项配置
            this.options[field] = option
            return InuptComp => (
                <div className="my-form-item">
                    <div className="my-form-label">
                        <label>{label}</label>
                    </div>
                    {/* 由React.createElement生成的元素不能修改，需要克隆一份再扩展 */}
                    {
                        React.cloneElement(InuptComp, {
                            name: field,
                            value: this.state[field] || '',
                            onChange: this.handleChange
                        })
                    }
                    {/* 显示校验信息 */}
                    {
                        this.state[field + 'Message'] && <p className="errorMes">{this.state[field + "Message"]}</p>
                    }
                </div>
            )
        }

        render() {
            return <Comp
                myGetFieldDecorator={this.myGetFieldDecorator} 
                myGetFieldsValue = {this.myGetFieldsValue}
                myGetFieldValue = {this.myGetFieldValue}
                validateFields={this.validateFields} />
        }
    }
}

@MyFormCreate
class MyAntdForm extends Component {

    onSubmit() {
        console.log('submit')
        this.props.validateFields((isValid, data) => {
            if (isValid) {
                console.log('登录成功', data)
                // 后续登录逻辑
            } else {
                alert('登录不成功')
            }
        })
    }

    render() {
        const { myGetFieldDecorator } = this.props
        return (
            <div className="my-antd-form">
                {
                    myGetFieldDecorator('user', { rules: [nameRule] }, { label: '姓名' })(<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />)
                }
                {
                    myGetFieldDecorator('pass', { rules: [passwordRule] }, { label: '密码' })(<Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />)
                }
                <Button onClick={() => this.onSubmit()}>提交</Button>
            </div>
        )
    }
}

export default MyAntdForm