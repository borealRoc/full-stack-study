import React, { useState } from 'react'

export function FruitLists({ fruits, onSetFruits }) {

    const delCur = delIndex => {
        const tem = [...fruits]
        tem.splice(delIndex, 1)
        onSetFruits(tem)
    }

    return (
        <ul>
            {
                fruits.map((fruit, index) => <li key={index} onClick={() => delCur(index)}>{fruit}</li>)
            }
        </ul>
    )
}

export function AddFruit({ onAddFruit }) {
    const [name, setName] = useState('')
    return (
        <div>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button onClick={() => onAddFruit(name)}>添加水果</button>
        </div>
    )
}