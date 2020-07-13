export const thunkLogin = () => dispatch => {
    dispatch({ type: 'requestLogin' })
    setTimeout(() => {
        dispatch({ type: 'loginSuccess' })
    }, 2000)
}
export const sagaLogin = name => ({ type: 'login', name })

export const logout = () => {
    return {
        type: 'logout'
    }
} 