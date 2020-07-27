import axios from 'axios'

// 包装接口
function GET_GOODS_API() {
    return axios.get("/api/goods")
}

export default {
    // model 命名空间
    namespace: 'goods',
    // 初始状态
    state: [
        // { id: 0, title: '苹果' },
        // { id: 1, title: '香蕉' },
    ],
    // 用于修改state, 由aciton触发,
    // reducer 是一个纯函数，它接受当前的 state 以及一个 action 对象。action 对象 可以包含数据体(payload)作为传入参，需要返回一个新的 state。
    reducers: {
        initGoods(state, action) {
            return action.payload
        },
        addGoods(state, action) {
            return [...state, { id: state.length, title: action.payload.title }]
        },
        delGoods(state, action) {
            const tempState = [...state]
            const goodIndex = state.findIndex(item => item.id === action.payload.goodId)
            tempState.splice(goodIndex, 1)
            return tempState
        }
    },
    // 用于处理异步操作( 如:与服务端交互)和业务逻辑，也是由 action 触发。
    // 它不可以修改 state，要通过触发 action 调用 reducer 实现对 state 的间接操作
    effects: {
        *getGoods(action, { call, put }) {
            const res = yield call(GET_GOODS_API)
            yield put({ type: 'initGoods', payload: res.data.result })
        }
    }
    /*
    * action:是 reducers 及 effects 的触发器，一般是一个对象，形如{ type: 'add', payload: todo }
    * 通过 type 属性可以匹配到具体某个 reducer 或者 effect, payload 属性则是数据体，用于传送给 reducer 或 effect
    */
}