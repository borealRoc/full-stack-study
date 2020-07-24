import React from 'react';
import styles from './index.css';
import { Link } from 'umi'

const Index = props => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}
Index.title = '首页'
export default Index