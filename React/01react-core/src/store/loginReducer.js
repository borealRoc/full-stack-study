const initialLoginState = {
    isLogin: false,
    loading: false,
    name: null,
    error: ''
}

const loginReducer = (state = { ...initialLoginState }, action) => {
    switch (action.type) {
        case 'requestLogin':
            return { ...state, loading: true, }
        case 'loginSuccess':
            return { ...state, loading: false, isLogin: true, name: '史詩王爵' }
        case 'loginFaile':
            return { ...state, loading: false, isLogin: false, err: action.err }
        case 'logout':
            return { ...state, isLogin: false, name: null }
        default:
            return state
    }
}
export default loginReducer