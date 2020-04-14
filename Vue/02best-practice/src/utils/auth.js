import Cookies from "js-cookie";

const Token = 'token'

export function getToken() {
  return Cookies.get("token");
}

export function setToken(token) {
  return Cookies.set("token", token);
}

export function removeToken() {
  return Cookies.remove(Token);
}
