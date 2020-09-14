// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const doubanbook = require('doubanbook')

cloud.init()

// 豆瓣爬虫：根据图书isbn搜索图书
async function searchDouban(isbn) {
  const url = 'https://search.douban.com/book/subject_search?search_text=' + isbn
  let searchInfo = await axios.get(url)
  let reg = /window\.__DATA__ = "(.*)"/
  if (reg.test(searchInfo.data)) {
    let searchData = doubanbook(RegExp.$1)[0]
    return searchData
  }
}


// 云函数入口函数
exports.main = async (event, context) => {
  // const { a, b } = event
  // return {
  //   sum: a + b
  // }
  const { isbn } = event
  if (isbn) {
    const bookinfo = await searchDouban(isbn)
    return bookinfo
  } else {
    return {
      code: -1,
      msg: '请扫描正确的图书'
    }
  }
}