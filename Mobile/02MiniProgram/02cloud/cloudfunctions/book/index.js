// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const doubanbook = require('doubanbook')
const cheerio = require('cheerio')
// const db = wx.cloud.database()
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
    const detailPage = await axios.get(bookinfo.url)
    const $ = cheerio.load(detailPage.data)
    const summary = $('#link-report .intro').text()

    const ret = {
      create_time: new Date().getTime(),
      image: bookinfo.cover_url,
      rate: bookinfo.rating.value,
      url: bookinfo.url,
      title: bookinfo.title,
      summary,
    }
    return ret

    // 后端入库
    // await db.collection('books_collections').add({
    //   data: ret,
    //   success(add) {
    //     if (add._id) {
    //       return ret
    //     } else {
    //       return {
    //         code: -1,
    //         msg: '您的图书未添加成功'
    //       }
    //     }
    //   }
    // })

  } else {
    return {
      code: -1,
      msg: '请扫描正确的图书'
    }
  }
}