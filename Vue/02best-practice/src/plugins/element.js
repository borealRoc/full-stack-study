import Vue from 'vue'
import { Button,Message } from 'element-ui'

Vue.prototype.$message = Message
Vue.use(Button, Message)
