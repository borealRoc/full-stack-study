export const add = () => {
    return {
        type: 'c2Add'
    }
}
export const minus = () => {
    return {
        type: 'c2Minus'
    }
}
export const asyncAdd = () => dispatch => {
    setTimeout(() => {
        dispatch({
            type: "c2Add",
        })
    }, 1000)
}