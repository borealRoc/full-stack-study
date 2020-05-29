export const counter2 = (state = 2, action) => {
    switch (action.type) {
        case 'c2Add':
            return state + 1
        case 'c2Minus':
            return state - 1
        default:
            return state
    }
}