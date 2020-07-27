let data = [
    { id: 0, title: '苹果' },
    { id: 1, title: '香蕉' },
];
export default {
    "GET /api/goods": function (req, res) {
        setTimeout(() => {
            res.json({ result: data });
        }, 1000);
    }
}