import React, { Component } from "react"
import ReactDom from "react-dom"
class App extends Component {
    render() {
        return <div>hello react</div>
    }
}
ReactDom.render(<App />, document.getElementById("react"))