import React, { Component } from 'react'
import { Provider } from 'mobx-react'

import counterStore from './store/counter'
import todoStore from './store/todo'

import './app.scss'

const store = {
  counterStore,
  todoStore,
}

class App extends Component {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
