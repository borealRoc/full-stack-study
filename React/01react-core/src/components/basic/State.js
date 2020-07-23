import React, { Component } from 'react'

export default class State extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
            A: 'a',
            B: 'b',
        }
    }

    componentDidMount() {
        this.setState({ A: 'aaa', B: 'bbb' })
        this.setState({ A: 'aa' })

        // console.log('0', this.state.counter) //0
        
        // // 下面两个setState的更新会被合并，所以第一个回调counter也为2
        // this.setState((preState, preProps) => ({
        //     counter: preState.counter + 1
        // }), () => {
        //     console.log('1', this.state.counter) //2
        // })
        // this.setState((preState, preProps) => ({
        //     counter: preState.counter + 1
        // }), () => {
        //     console.log('2', this.state.counter) //2
        // })

        // setTimeout(() => {
        //     this.setState({
        //         counter: this.state.counter + 1
        //     })
        //     console.log('3', this.state.counter) //3
        //     this.setState({
        //         counter: this.state.counter + 1
        //     })
        //     console.log('4', this.state.counter) //4
        // }, 0)

        document.getElementById('changeCounter').addEventListener('click', () => {
            this.setState({
                counter: this.state.counter + 1
            })
            console.log('5', this.state.counter) //5
            this.setState({
                counter: this.state.counter + 1
            })
            console.log('6', this.state.counter) //6
        })
    }

    render() {
        return (
            <div>
                <p>A是{this.state.A}</p>
                <p>B是{this.state.B}</p>
                <p>counter是{this.state.counter}</p>
                <button id="changeCounter">changeCounter</button>
            </div>
        )
    }
}
