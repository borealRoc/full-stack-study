import React, { Component } from 'react'
import { unmountComponentAtNode, unstable_renderSubtreeIntoContainer } from 'react-dom'

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
                        {
                            props.children ? props.children : '正文'
                        }
                    </p>
                </section>
                <footer className="my-dialog-ft">
                    {
                        props.cancel && <button className="my-dialog-btn cancel" onClick={() => props.hideLaterDialog()}>{props.cancel}</button>
                    }
                    {
                        props.confirm && <button className="my-dialog-btn confirm" onClick={() => props.hideLaterDialog()}> {props.confirm}</button>
                    }
                </footer>
            </div>
        </div >
    )
}

export default class MyDialogLaterVersion extends Component {
    render() {
        return null
    }

    componentDidMount() {
        this.node = document.createElement('div')
        this.node.className = 'later-dialog-wrapper'
        document.body.appendChild(this.node)
        this.createProtal(this.props)
    }

    componentDidUpdate() {
        this.createProtal(this.props)
    }

    componentWillUnmount() {
        unmountComponentAtNode(this.node)
        document.body.removeChild(this.node)
    }

    createProtal(props) {
        unstable_renderSubtreeIntoContainer(
            this, //当前组件
            <DialogStr {...props} />, //塞进传送门的JSX
            this.node //传送门所在节点
        )
    }
}
