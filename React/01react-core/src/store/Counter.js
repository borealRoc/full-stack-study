import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'add':
            return state + 1
        case 'minus':
            return state - 1
        default: 
            return state
    }
}
// 使用thunk和logger中间件
const counterStore = createStore(counter, applyMiddleware(thunk, logger))

export default counterStore