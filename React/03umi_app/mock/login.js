export default {
    "post /api/login"(req, res, next) {
        console.log(req.body)
        const { username, password } = req.body;
        if (username === 'xu' && password === "123") {
            return res.json({
                code: 0,
                data: {
                    token: "XXToken",
                    role: "admin",
                    balance: 1000,
                    username: 'xu'
                }
            });
        }
        if (username === "tony" && password === "123") {
            return res.json({
                code: 0,
                data: {
                    token: "TTToken",
                    role: "user",
                    balance: 100,
                    username: "jerry"
                }
            });
        }
        return res.status(401).json({
            code: -1,
            msg: "用户名或密码错误"
        });
    }
};