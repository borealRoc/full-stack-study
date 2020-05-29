export const counter1 = (state = 0, action) => {
    switch (action.type) {
        case 'c1Add':
            return state + 1
        case 'c1Minus':
            return state - 1
        default:
            return state
    }
}