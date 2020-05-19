import React, { Component } from 'react'
import State from '../components/State'

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <ul>
                    <li>
                        <h2>1. 状态管理</h2>
                        <State />
                    </li>
                </ul>
            </div>
        )
    }
}
