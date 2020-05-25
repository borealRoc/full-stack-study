import React, { Component } from 'react'
import { createPortal } from "react-dom"

function DialogStr(props) {
    return (
        <div className="my-dialog">
            <div className="my-dialog-gray"></div>
            <div className="my-dialog-ctn">
                <h4 className="my-dialog-hd">
                    {props.title ? props.title : '标题'}
                </h4>
                <section className="my-dialog-ctt">
                    <p className="inner-dialog-ctt">
                        {props.content ? props.content : '正文'}
                    </p>
                </section>
                <footer className="my-dialog-ft">
                    {
                        props.cancel && <button className="my-dialog-btn cancel" onClick={() => props.hideDialog()}>{props.cancel}</button>
                    }
                    {
                        props.confirm && <button className="my-dialog-btn confirm" onClick={() => props.hideDialog()}> {props.confirm}</button>
                    }
                </footer>
            </div>
        </div >
    )
}

export default class MyDialog extends Component {
    constructor(props) {
        super(props)
        this.dialogNode = document.createElement("div")
        this.dialogNode.className = "my-dialog-wrapper"
        document.body.appendChild(this.dialogNode)
    }

    componentWillUnmount() {
        // 在弹窗消失时，销毁弹窗节点
        document.body.removeChild(this.dialogNode)
    }

    render() {
        return createPortal(<DialogStr {...this.props} />, this.dialogNode)
    }
}
