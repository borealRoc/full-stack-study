import React, { useState, useEffect } from 'react'

export default function FunState() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timeId = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(timeId)
    })

    return (
        <div>
            <p>现在是: {time.toLocaleTimeString()}</p>
        </div>
    )
}
