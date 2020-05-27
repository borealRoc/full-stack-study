import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { counter } from './counterReducer'

// 使用thunk和logger中间件
const counterStore = createStore(counter, applyMiddleware(thunk, logger))

export default counterStore