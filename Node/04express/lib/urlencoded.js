const querystring = require('querystring')

module.exports = {
    urlencoded() {
        return (req, res, next) => {
            let data = []
            req.on('data', buf => {
                data.push(buf)
            })
            req.on('end', () => {
                const post = querystring.parse(Buffer.concat(data).toString())
                req.body = post
                next()
            })
        }
    }
}