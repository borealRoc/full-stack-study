const initialLoginState = {
    isLogin: false,
    name: null
}

const loginReducer = (state = { ...initialLoginState }, action) => {
    switch (action.type) {
        case 'login':
            return { ...state, isLogin: true, name: '史詩王爵' }
        case 'logout':
            return { ...state, isLogin: false, name: null }
        default:
            return state
    }
}
export default loginReducer