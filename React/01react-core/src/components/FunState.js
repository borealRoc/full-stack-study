import React, { useState, useEffect } from 'react'

export default function FunState() {
    const [time, setState] = useState(new Date())

    useEffect(() => {
        const timeId = setInterval(() => {
            setState(new Date())
        }, 1000)
        return () => clearInterval(timeId)
    })

    return (
        <div>
            <p>现在是: {time.toLocaleTimeString()}</p>
        </div>
    )
}
