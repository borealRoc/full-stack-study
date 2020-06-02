import React, { useReducer, useEffect } from 'react'
import { FruitLists, AddFruit } from './Fruits'

function fruitReducer(state, action) {
    switch (action.type) {
        case 'init':
            return action.payload
        case 'replace':
            return action.payload
        case 'add':
            return [...state, action.payload]
        default:
            return state
    }
}

export default function UseReducer() {
    const [fruits, dispatch] = useReducer(fruitReducer, ['apple'])

    useEffect(() => {
        const timeId = setTimeout(() => {
            dispatch({ type: 'init', payload: ['荔枝', '菠萝'] })
        }, 2000)
        return () => clearTimeout(timeId)
    }, [])

    return (
        <div>
            <AddFruit onAddFruit={fruit => dispatch({ type: 'add', payload: fruit })} />
            <FruitLists fruits={fruits} onSetFruits={cur => dispatch({ type: 'replace', payload: cur })} />
        </div>
    )
}
