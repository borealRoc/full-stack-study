import React, { Component } from "react";
import { Form, Input, Icon, Button } from "antd";
const FormItem = Form.Item;

const nameRule = {
    required: true,
    message: "please input your name",
};
const passwordRule = {
    required: true,
    message: "please input your password",
};

export default class AntdForm extends Component {
    submit = () => {
        const { getFieldsValue, getFieldValue, validateFields } = this.props.form;
        validateFields((err, values) => {
            if (err) {
                console.log("err", err);
            } else {
                console.log("submit", values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.props.form);
        return (
            <div>
                <Form>
                    <FormItem label="姓名">
                        {getFieldDecorator("name", { rules: [nameRule] })(
                            <Input prefix={<Icon type="user" />} />,
                        )}
                    </FormItem>
                    <FormItem label="密码">
                        {getFieldDecorator("password", { rules: [passwordRule] })(
                            <Input type="password" prefix={<Icon type="lock" />} />,
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={() => this.submit()}>提交</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}