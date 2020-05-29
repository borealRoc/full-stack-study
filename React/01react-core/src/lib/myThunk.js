export const thunk = ({ dispatch, getState }) => dispatch => action => {
    if (typeof action === 'function') {
        return action(dispatch, getState)
    }
    return dispatch(action)
}