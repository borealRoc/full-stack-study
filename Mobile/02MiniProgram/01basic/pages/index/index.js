//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function () {

  },
  goCamera() {
    wx.redirectTo({
      url: '../camera/camera'
    })
  },
  goConcact() {
    wx.redirectTo({
      url: '../concact/concact'
    })
  },
  goHttp() {
    wx.redirectTo({
      url: '../Http/http'
    })
  }
})