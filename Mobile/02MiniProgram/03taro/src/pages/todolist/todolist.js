import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtInput, AtList, AtListItem } from 'taro-ui'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Todolist extends Component {
    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    constructor(props) {
        super(props)
        this.state = {
            // todos: ['吃饭', '睡觉', '学习'],
            val: ''
        }
    }

    handleInput = (val) => {
        this.setState({ val })
    }
    handleClick = () => {
        // this.setState({
        //     todos: [...this.state.todos, this.state.val],
        //     val: ''
        // })
        // 改用mobx
        this.props.store.todoStore.addTodo(this.state.val)
        this.setState({
            val: ''
        })
    }
    removeTodo = i => {
        this.props.store.todoStore.removeTodo(i)
    }
    render() {
        console.log('this.props', this.props)
        const { todoStore } = this.props.store

        return (
            <View className="todolist-page">
                <Text>Todo List</Text>
                <View className='at-icon at-icon-bullet-list'></View>
                <AtInput value={this.state.val} onChange={this.handleInput}></AtInput>
                <AtButton type='primary' onClick={this.handleClick}>添加</AtButton>
                <AtList>
                    {
                        // this.state.todos.map((todo, i) => {
                        todoStore.todos.map((todo, i) => {
                            return (
                                // <View key={i}>
                                //     <Text>第{i + 1}项: {todo}</Text>
                                // </View>
                                <AtListItem title={i + ':' + todo} isSwitch onSwitchChange={() => this.removeTodo(i)}></AtListItem>
                            )
                        })
                    }
                </AtList>
            </View>
        )
    }
}

export default Todolist
