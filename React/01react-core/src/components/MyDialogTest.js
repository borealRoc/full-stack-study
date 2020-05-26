import React, { Component } from 'react'
import MyDialog from './MyDialog'
import MyDialogLaterVersion from './MyDialogLaterVersion';
import { Button } from 'antd'

export default class MyDialogTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDialogShow: false,
            isLaterDialogShow: false,
        };
    }

    showDialog() {
        this.setState({
            isDialogShow: true
        })
    }
    showLaterDialog() {
        this.setState({
            isLaterDialogShow: true
        })
    }
    hideDialog() {
        this.setState({
            isDialogShow: false
        })
    }
    hideLaterDialog() {
        this.setState({
            isLaterDialogShow: false
        })
    }


    render() {
        const { isDialogShow, isLaterDialogShow } = this.state
        return (
            <div className="dialog-test">
                <div>
                    <h3>React 16之后，利用createPortal实现传送门</h3>
                    <Button onClick={() => this.showDialog()}>Show Dialog</Button>
                </div>
                <div>
                    <h3>React 16之前，利用unmountComponentAtNode和unstable_renderSubtreeIntoContainer这两个API实现传送门</h3>
                    <Button onClick={() => this.showLaterDialog()}>Show Later Dialog</Button>
                </div>
                {
                    isDialogShow &&
                    <MyDialog
                        title="React V16之后的弹窗"
                        content="弹，弹， 弹~弹走鱼尾纹"
                        cancel="取消"
                        confirm="确定"
                        hideDialog={() => this.hideDialog()}
                    ></MyDialog>
                }
                {
                    isLaterDialogShow &&
                    <MyDialogLaterVersion
                        title="React V16之前的弹窗"
                        cancel="取消"
                        confirm="确定"
                        hideLaterDialog={() => this.hideLaterDialog()}
                    >
                        <span>我这段内容是通过组件复合props.children插进来的</span>
                    </MyDialogLaterVersion>
                }
            </div>
        )
    }
}
