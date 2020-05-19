import React, { Component } from 'react'

const CourseForm = props => {
    return (
        <div className="course-form">
            <h2>添加课程：</h2>
            <input type="text" value={props.good} onChange={e => props.inputGood(e)}></input>
            <button onClick={() => props.addToLists()}>添加课程</button>
        </div>
    )
}

const CourseLists = props => {
    return (
        <div className="course-lists">
            <h2>课程列表：</h2>
            <ul>
                {
                    props.goods.map(good => <li key={good.id}>
                        <span>{good.text}</span>
                        <span>&yen;{good.price}</span>
                        <button onClick={() => props.addToCart(good)}>添加到购物车</button>
                    </li>)
                }
            </ul>
        </div>

    )
}

const CourseTable = props => {
    return (
        <div className="course-lists">
            <h2>课程购物车：</h2>
            <table>
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>数量</th>
                        <th>价格</th>
                    </tr>
                </thead>
                <tbody>
                    {props.carts.map(cart => <tr key={cart.id}>
                        <td>{cart.text}</td>
                        <td>
                            <button onClick={() => props.minusCart(cart)}>-</button>
                            {cart.count}
                            <button onClick={() => props.addCart(cart)}>+</button>
                        </td>
                        <td>
                            {cart.price * cart.count}
                        </td>
                    </tr>)
                    }
                    <tr>
                        <td>总计：</td>
                        <td colSpan="2">{total(props.carts)}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

function total(carts) {
    let sum = 0
    carts.forEach(cart => {
        sum += cart.price * cart.count
    })
    return sum
}

export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            good: '',
            goods: [
                { id: 1, text: 'Web全栈', price: 2000 },
                { id: 2, text: 'Java高级工程师', price: 1500 },
            ],
            carts: []
        }
    }
    // 输入课程表单项双向数据绑定
    inputGood = e => {
        this.setState({
            good: e.target.value
        })
    }
    // 添加课程到课程列表
    addToLists = () => {
        if (this.state.good) {
            this.setState(preState => ({
                goods: [
                    ...preState.goods,
                    {
                        id: preState.goods.length + 1,
                        text: preState.good,
                        price: Math.ceil(Math.random() * 10000)
                    }
                ],
                good: ''
            }))
        } else {
            alert('您还没输入课程名称')
        }

    }
    // 添加商品到购物车
    addToCart = good => {
        // 为了保证视图更新，数组要保证引用地址变化，因此每次深复制一个新数组
        const cartArray = [...this.state.carts]
        const cartIndex = cartArray.findIndex(cart => cart.id === good.id)
        const cartItem = cartArray[cartIndex]
        if (cartItem) {
            cartArray.splice(cartIndex, 1, {
                ...cartItem,
                count: cartItem.count + 1
            })
        } else {
            cartArray.push({ ...good, count: 1 })
        }
        this.setState({
            carts: cartArray
        })
    }
    // 在购物车增加商品
    addCart = cart => {
        const cartArray = [...this.state.carts]
        const cartIndex = cartArray.findIndex(item => item.id === cart.id)
        const cartItem = cartArray[cartIndex]
        cartArray.splice(cartIndex, 1, {
            ...cartItem,
            count: cartItem.count + 1
        })
        this.setState({
            carts: cartArray
        })
    }
    // 在购物车减少商品
    minusCart = cart => {
        const cartArray = [...this.state.carts]
        const cartIndex = cartArray.findIndex(item => item.id === cart.id)
        const cartItem = cartArray[cartIndex]
        if (cartItem.count > 1) {
            cartArray.splice(cartIndex, 1, {
                ...cartItem,
                count: cartItem.count - 1
            })
        } else {
            cartArray.splice(cartIndex, 1)
        }
        this.setState({
            carts: cartArray
        })
    }

    render() {
        return (
            <div className="cart-comp">
                <CourseForm good={this.state.good} inputGood={this.inputGood} addToLists={this.addToLists} />
                {
                    this.state.goods && this.state.goods.length > 0 &&
                    <CourseLists goods={this.state.goods} addToCart={this.addToCart} />
                }
                {
                    this.state.carts && this.state.carts.length > 0 &&
                    <CourseTable carts={this.state.carts} addCart={this.addCart} minusCart={this.minusCart} />
                }

            </div>
        )
    }
}
