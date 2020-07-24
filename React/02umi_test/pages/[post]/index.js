import React from 'react';
import styles from './index.css';

export default props => {
  const { match: { params: { post } } } = props
  return (
    <div>
      <h1 className={styles.title}>Page [post] -- {post}</h1>
    </div>
  );
}
