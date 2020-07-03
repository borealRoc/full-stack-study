{/* <div id="app">
    <p class='item'>子节点</p>
</div> */}

const createElement = () => {
    return {
        tag: 'div',
        data: {
            id: 'app'
        },
        children: [
            {
                tag: 'p',
                data: {
                    class: 'item',
                },
                children: '子节点'
            }
        ]
    }
}

// 虚拟DOM就是用JS对象描述真实DOM