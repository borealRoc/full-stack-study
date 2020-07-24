import React from 'react';
import styles from './[id].css';

export default props => {
  const { match: { params: { id } } } = props
  return (
    <div>
      <h1 className={styles.title}>Page ./users/[id] -- {id}</h1>
    </div>
  );
}
