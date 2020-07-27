import React, { useState, useEffect } from 'react';
import styles from './index.css';
import { connect } from 'umi'

export default connect(
  state => ({
    goods: state.goods
  }),
  {
    addGoods: title => {
      return {
        type: 'goods/addGoods',
        payload: { title }
      }
    },
    getGoods: () => {
      return {
        type: 'goods/getGoods'
      }
    },
    delGoods: goodId => {
      return {
        type: 'goods/delGoods',
        payload: { goodId }
      }
    }
  }
)(function ({ goods, addGoods, getGoods, delGoods }) {
  const [fruit, setFruit] = useState('')
  useEffect(() => {
    getGoods()
  }, [])
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <label htmlFor="fruit">你想要吃什么水果：</label>
      <input id="fruit" type="text" value={fruit} onChange={e => setFruit(e.target.value)} />
      <button onClick={() => addGoods(fruit)}>添加</button>
      {
        goods && goods.length > 0 ?
          <ul>
            {
              goods.map(good =>
                <li key={good.id} >
                  {good.title}
                  <button onClick={() => delGoods(good.id)}>-</button>
                </li>)
            }
          </ul> :
          <div>加载中...</div>
      }

    </div>
  );
})

// const Index = ({ goods }) => {
//   return (
//     <div>
//       <h1 className={styles.title}>Page index</h1>
//       <ul>
//         {
//           goods.map(good => <li key={good.id}>{good.title}</li>)
//         }
//       </ul>
//       <Link to="/login">Login</Link>
//     </div>
//   );
// }
// Index.title = '首页'
// export default Index