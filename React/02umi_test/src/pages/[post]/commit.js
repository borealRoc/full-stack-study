import React from 'react';
import styles from './commit.css';
import { Link } from 'umi'

export default props => {
  const { match: { params: { post } } } = props
  return (
    <div>
      <h1 className={styles.title}>Page post -- {post} commit.</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}
