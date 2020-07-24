import mockjs from 'mockjs';

export default {
    // 使用 mockjs 等三方库
    'GET /api/tags': mockjs.mock({
        'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
    }),
    //动态的mock
    '/api/random': (req, res) => {
        res.send(
            mockjs.mock({
                // 每次请求均产 随机值 
                'number|1-100': 100,
            })
        )
    }
};
