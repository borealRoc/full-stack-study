import React from "react"
import { Form, Input, Button } from "antd"
import { UserOutlined, LockOutlined } from '@ant-design/icons'
const FormItem = Form.Item;

const nameRule = {
    required: true,
    message: "请输入用户名",
};

const passwordRule = {
    required: true,
    message: "请输入密码",
};

const AntdForm = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <FormItem label="Username" name="username" rules={[nameRule]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </FormItem>
            <FormItem label="Password" name="password" rules={[passwordRule]}>
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
        </Form>
    )
}

export default AntdForm