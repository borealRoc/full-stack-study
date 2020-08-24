const proxy = require('./proxy')
const api = require('./api')

proxy.listen(3000)
api.listen(4000)