import axios from 'axios'
import router from 'umi/router'

// 初始状态：本地存储或空值对象
const userinfo = JSON.parse(localStorage.getItem('userinfo')) || {
    token: '',
    role: '',
    username: '',
    balance: '',
}

// 登录请求方法
function LOGIN_API(payload) {
    return axios.post('/api/login', payload)
}

export default {
    namespace: 'users',
    state: userinfo,
    effects: {
        *login({ payload }, { call, put }) {
            try {
                const { data: { code, data: userinfo } } = yield call(LOGIN_API, payload)
                if (code === 0) {
                    // 登录成功
                    localStorage.setItem('userinfo', JSON.stringify(userinfo))
                    yield put({ type: 'init', payload: userinfo })
                    router.push('/')
                }
            } catch (error) {
                // 登录失败：错误信息已在拦截器实现，可执行其它业务
            }

        }
    },
    reducers: {
        init(state, action) {
            return action.payload
        }
    },
}


