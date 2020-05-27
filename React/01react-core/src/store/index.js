import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { counter1 } from './counterReducer1'
import { counter2 } from './counterReducer2'


const counterStore = createStore(
    // 模块化：使用多个reducer
    combineReducers({ counter1, counter2 }),
    // 使用thunk和logger中间件
    applyMiddleware(thunk, logger))

export default counterStore