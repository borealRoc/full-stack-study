import React, { useState } from 'react'


export default function Hook() {
    const [fruits, setFruits] = useState(['apple', 'banana', 'peach'])

    const delFruit = index => {
        const temp = [...fruits]
        temp.splice(index, 1)
        setFruits(temp)
    }

    return (
        <div>
            <AddFruit onAddFruit={item => setFruits([...fruits, item])} />
            <FruitLists fruits={fruits} onSetFruits={delFruit} />
        </div>
    )
}

function FruitLists({ fruits, onSetFruits }) {
    return (
        <ul>
            {
                fruits.map((fruit, index) => <li key={index} onClick={() => onSetFruits(index)}>{fruit}</li>)
            }
        </ul>
    )
}

function AddFruit({ onAddFruit }) {
    const [name, setName] = useState('')
    return (
        <div>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button onClick={() => onAddFruit(name)}>添加水果</button>
        </div>
    )
}