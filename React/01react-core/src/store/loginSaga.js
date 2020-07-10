import { call, put, takeEvery } from "redux-saga/effects"
// call: 调用异步操作
// put: 状态更新
// takeEvery: saga监听

// 模拟登录接口
const loginServer = {
    login(name) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                if (name === 'xu') {
                    res({ name: 'xu' })
                } else {
                    rej('用户名或密码错误')
                }
            }, 2000)
        })
    }
}

// worker saga
function* loginWatcher(action) {
    try {
        yield put({ type: 'requestLogin' })
        const res = yield call(loginServer.login, action.name)
        yield put({ type: 'loginSuccess', res })
    } catch (error) {
        yield put({ type: 'loginFaile', error })
    }
}

// watcher saga
function* loginSaga() {
    yield takeEvery('loginSaga', loginWatcher)
}

export default loginSaga