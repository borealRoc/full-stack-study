import React, { Component } from 'react'
import ReduxDemo from '../components/ReduxDemo'

export default class Redux extends Component {
    render() {
        return (
            <div className="redux-page">
                <h2>Redux是JavaScript应用的状态容器，而不单单是React应用的状态容器</h2>
                <ReduxDemo/>
            </div>
        )
    }
}
