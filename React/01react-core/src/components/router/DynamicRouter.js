import React from 'react'

export default function DynamicRouter(props) {
    const { id } = props.match.params
    return (
        <div>
            <h4>您访问的页面是/dynamic/:{id}</h4>
        </div>
    )
}
