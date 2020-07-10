import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'
import { counter1 } from './counterReducer1'
import { counter2 } from './counterReducer2'

import loginReducer from './loginReducer'
import createSagaMiddleware from 'redux-saga'
import loginSaga from './loginSaga'
const sagaMiddleware = createSagaMiddleware()

const counterStore = createStore(
    // 模块化：使用多个reducer
    combineReducers({ counter1, counter2, loginReducer }),
    // 使用thunk和logger中间件
    // applyMiddleware(thunk, logger)
    // 使用redux-saga和logger中间件
    applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(loginSaga)
export default counterStore