// miniprogram/pages/myDemo/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  scanCode() {
    // 微信扫码 api
    wx.scanCode({
      success(res) {
        // console.log('你添加的图书是:', res)
        // // 调用云端 book 函数
        // wx.cloud.callFunction({
        //   name: 'book',
        //   data: {
        //     a: 1,
        //     b: 2,
        //   },
        //   success(res) {
        //     console.log('调用云端 book 函数的结果是：', res)
        //   }
        // })
        const isbn = res.result
        wx.showLoading({
          title: '查询中...',
        })
        wx.cloud.callFunction({
          name: 'book',
          data: {
            isbn,
          },
          success(res) {
            const { title } = res.result
            if (title) {
              wx.hideLoading()
              wx.showModal({
                title: '查询成功',
                content: `您查询的图书为《${title}》`
              })
            }
          }
        })
      }
    })
  }
})