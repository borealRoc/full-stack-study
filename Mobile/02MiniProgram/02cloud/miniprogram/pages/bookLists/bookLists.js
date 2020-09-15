// pages/bookLists/bookLists.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    page: 0,
  },

  // 获取图书列表
  getBookLists() {
    let isInit = this.data.page === 0

    wx.showLoading({ title: '加载中' })
    // 每页显示5个
    const PAGE_ACCOUNT = 5
    // 第 n 页要显示的数目
    const offset = this.data.page * PAGE_ACCOUNT
    let ret = db.collection('books_collections').orderBy('create_time', 'desc')
    if (offset > 0) {
      // 不是第一页
      ret = ret.skip(offset)
    }
    ret = ret.limit(PAGE_ACCOUNT).get().then(books => {
      let newBooks = books.data.map(book => {
        const rate = Math.round(book.rate / 2)
        book.rateStart = "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate)
        return book
      })
      if (isInit) {
        // 不是第一页
        this.setData({
          books: newBooks
        })
      } else {
        // 第一页
        this.setData({
          books: this.data.books.concat(newBooks)
        })
      }
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查库
    this.getBookLists()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 下拉刷新
    this.setData({
      page: 0
    }, () => {
      this.getBookLists()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    }, () => {
      this.getBookLists()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})