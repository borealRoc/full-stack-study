import { createStore, applyMiddleware } from '../lib/myRedux'
import { logger } from '../lib/myLogger'
import { thunk } from '../lib/myThunk'

const myReduxCounter = (state = 4, action) => {
    switch (action.type) {
        case 'add':
            return state + 2
        case 'minus':
            return state - 2
        default:
            return state
    }
}

const counterStore = createStore(myReduxCounter, applyMiddleware(logger, thunk))
export default counterStore