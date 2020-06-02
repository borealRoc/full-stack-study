import React, { useContext } from 'react'
const Context = React.createContext()
const Provider = Context.Provider

export default function UseContextDemo() {
    const store = {
        user: '史诗王爵'
    }
    return (
        <div>
            <Provider value={store}>
                <Child />
            </Provider>
        </div>
    )
}

function Child() {
    const { user } = useContext(Context)
    return (
        <div>
            <p>I am Child. My name "{user}" is from ancestor on <strong>UseContxt</strong>.</p>
        </div>
    )
}