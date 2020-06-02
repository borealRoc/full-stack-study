import React, { Component } from 'react'
import Layout from './Layout'

export default class Composition extends Component {
    render() {
        return (
            <div className="composition">
                <Layout>
                    {
                        {
                            header: <p>具名插槽内容一</p>,
                            content: <p>具名插槽内容二</p>
                        }
                    }
                    <p>匿名插槽内容一</p>
                    <p>匿名插槽内容二</p>
                </Layout>
            </div>
        )
    }
}
