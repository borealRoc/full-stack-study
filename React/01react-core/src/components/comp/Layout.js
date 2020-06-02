import React, { Component, Children } from 'react'

export default class Layout extends Component {
    render() {
        const { children } = this.props
        // 把children处理成layoutStr是为了兼容匿名插槽与具名插槽
        const layoutStr = []
        if (Array.isArray(children)) {
            // 只有匿名插槽，或同时有匿名和具名插槽
            children.forEach(child => {
                if (child.$$typeof) {
                    // 匿名插槽
                    layoutStr.push(child)
                } else {
                    // 具名插槽
                    for (let name in child) {
                        layoutStr.push(child[name])
                    }
                }
            })
        } else {
            // 只有具名插槽
            for (let name in Children) {
                layoutStr.push(children[name])
            }
        }
        return (
            <div className="layout">
                <div className="fixed-ctn">
                    <p>我是Header，不管children是什么，我一直都存在</p>
                </div>
                <ul className="slot-ctn">
                    {layoutStr.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })}
                </ul>
                <div className="fixed-ctn">
                    <p>我是Footer，不管children是什么，我一直都存在</p>
                </div>
            </div>
        )
    }
}
