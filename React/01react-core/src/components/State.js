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
        this.setState({A: 'aaa', B: 'bbb'})
        this.setState({A: 'aa'})

        this.setState((preState, preProps) => ({
            counter: preState.counter + 1 //1
        }), () => {
            console.log('1', this.state.counter) //1
        })
        this.setState((preState, preProps) => ({
            counter: preState.counter + 1 //2
        }), () => {
            console.log('2', this.state.counter) //2
        })

        setTimeout(() => {
            this.setState({
                counter: this.state.counter + 1 //1
            })
            console.log('3', this.state.counter) //1
            this.setState({
                counter: this.state.counter + 1 //2
            })
            console.log('4', this.state.counter) //2
        }, 0)

        document.getElementById('changeCounter').addEventListener('click', () => {
            this.setState({
                counter: this.state.counter + 1 //1
            })
            console.log('5', this.state.counter) //1
            this.setState({
                counter: this.state.counter + 1 //2
            })
            console.log('6', this.state.counter) //2
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
