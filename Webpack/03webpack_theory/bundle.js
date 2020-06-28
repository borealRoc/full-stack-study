const opts = require('./webpack.config')
const Compiler = require('./lib/compiler')
new Compiler(opts).run()
