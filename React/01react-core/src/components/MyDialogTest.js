import React, { Component } from 'react'
import MyDialog from './MyDialog'
import { Button } from 'antd'

export default class MyDialogTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDialogShow: false,
        };
    }

    showDialog() {
        this.setState({
            isDialogShow: true
        })
    }
    hideDialog() {
        this.setState({
            isDialogShow: false
        })
    }


    render() {
        const { isDialogShow } = this.state
        return (
            <div className="dialog-test">
                <Button onClick={() => this.showDialog()}>Show Dialog</Button>
                {
                    isDialogShow &&
                    <MyDialog
                        content="弹，弹， 弹~弹走鱼尾纹"
                        cancel="取消"
                        confirm="确定"
                        hideDialog={() => this.hideDialog()}
                    ></MyDialog>
                }
            </div>
        )
    }
}
