import React from 'react';
import styles from './_layout.css';

const Users = props => {
  return (
    <div>
      <h2 className={styles.title}>
        I am users layout.
      </h2>
      {
        props.children
      }
    </div>
  );
}
Users.wrappers = ['@/routes/PrivateRoute']

export default Users