const delay = (data, tick) => new Promise(resolve => {
    setTimeout(() => {
        resolve(data)
    }, tick)
})

// module.exports = {
//     getName() {
//         return delay('言午', 1000)
//     },
//     getAge() {
//         return 20
//     }
// }

module.exports = app => ({
    getName() {
        return app.$model.user.findAll()
    },
    getAge() {
        return 20
    }
})