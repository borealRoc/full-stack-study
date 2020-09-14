// miniprogram/pages/myDemo/book/book.js
const db = wx.cloud.database()
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
        // // 云端 book 函数
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
          title: '添加中...',
        })
        // 调用云函数
        wx.cloud.callFunction({
          name: 'book',
          data: {
            isbn,
          },
          success({ result }) {
            if (result) {
              // 前端入库
              db.collection('books_collections').add({
                data: result,
                success(add) {
                  console.log('add', add)
                  // 入库成功
                  if (add._id) {
                    wx.hideLoading()
                    wx.showModal({
                      title: '添加成功',
                      content: `您添加的图书为《${result.title}》`
                    })
                  }
                }
              })
              // wx.hideLoading()
              // wx.showModal({
              //   title: '添加成功',
              //   content: `您添加的图书为《${result.title}》`
              // })
            }
          }
        })
      }
    })
  }
})