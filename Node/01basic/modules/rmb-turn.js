let rate
const rmbTurn = rmb => rmb / rate
module.exports = r => {
    rate = r
    return { rmbTurn }
}
