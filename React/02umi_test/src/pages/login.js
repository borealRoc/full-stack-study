import React from 'react';
import styles from './login.less';
import { useHistory } from "umi"

export default () => {
  const history = useHistory()
  return (
    <div>
      <h1 className={styles.title}>Page login</h1>
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
}
