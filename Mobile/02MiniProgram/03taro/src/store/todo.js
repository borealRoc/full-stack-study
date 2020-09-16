import { observable } from 'mobx'
import Taro from '@tarojs/taro'

const todoStore = observable({
    todos: ['吃饭', '睡觉', '学习'],

    addTodo(todo) {
        this.todos.push(todo)
    },

    removeTodo(i) {
        Taro.showLoading({
            title: '删除中...'
        })
        setTimeout(() => {
            this.todos.splice(i, 1)
            Taro.hideLoading()
        }, 1000)
    }
})

export default todoStore