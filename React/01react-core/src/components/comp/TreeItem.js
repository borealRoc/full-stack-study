import React, { useState } from 'react'
import classnames from "classnames";

export default function TreeItem(props) {
    let [expanded, setExpanded] = useState(false)
    const handleExpanded = () => {
        setExpanded(!expanded)
    }

    const { title, children } = props.data
    const hasChildren = children && Array.isArray(children) && children.length > 0

    return (
        <div className="tree-item" >
            <div className="nodeInner" onClick={() => handleExpanded()}>
                {
                    hasChildren &&
                    <i className={classnames('tri', expanded ? "tri-open" : "tri-close")}></i>
                }
                <span>{title}</span>
            </div>
            {
                hasChildren && expanded && (
                    <div className="children">
                        {
                            children.map(child => <TreeItem key={child.key} data={child} />)
                        }
                    </div>
                )
            }
        </div>
    )
}
