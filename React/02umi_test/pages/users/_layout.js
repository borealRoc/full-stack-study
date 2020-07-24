import React from 'react';
import styles from './_layout.css';

export default props => {
  return (
    <div>
      <h1 className={styles.title}>I am users layout</h1>
      {
        props.children
      }
    </div>
  );
}
