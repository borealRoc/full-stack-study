module.exports = {
    get url() {
        return this.req.url
    },
    get method() {
        return this.req.method.toLowerCase()
    },
    get body() {
        return this._body
    },
    set body(val) {
        this._body = val
    }
}