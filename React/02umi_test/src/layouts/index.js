import React from 'react';
import styles from './index.css'

export default props => {
    const { location: { pathname } } = props
    if (pathname === '/login') {
        return (<>{props.children}</>)
    }
    return (
        <div>
            <h1 className={styles.title}>I am global layout.</h1>
            {
                props.children
            }
        </div>
    );
}
