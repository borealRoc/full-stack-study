import { createStore } from '../lib/myRedux'

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

const counterStore = createStore(myReduxCounter)
export default counterStore