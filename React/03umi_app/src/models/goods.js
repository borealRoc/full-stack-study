import axios from 'axios'

// 初始状态
const goods = {
    courses: {},
    tags: []
}

// 商品请求方法
function GET_GOODS_API() {
    return axios.get("/api/goods")
}

export default {
    namespace: 'goods',
    state: { goods },
    effects: {
        *getGoods(action, {call, put}) {
            const {data: {data: courses}} = yield call(GET_GOODS_API)
            yield put({type: 'initGoods', payload: courses})
        }
    },
    reducers: {
        initGoods(state, {payload}) {
            const {tags, data: courses} = payload
            return {...state, courses, tags}
        }
    }
}