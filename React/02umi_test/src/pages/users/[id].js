import React from 'react';
import styles from './[id].css';

export default props => {
  const { match: { params: { id } } } = props
  return (
    <div>
      <h3 className={styles.title}>I am users--{id} page.</h3>
    </div>
  );
}
