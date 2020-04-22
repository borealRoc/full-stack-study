// 处理浏览器的cookies信息：令牌[Token]
import Cookies from 'js-cookie'

const Token = 'token'

export const getToken = () => Cookies.get(Token)
export const setToken = token => Cookies.set(Token, token)
export const removeToken = () => Cookies.remove(Token)
