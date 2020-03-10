// 用来发送https请求
const originRequest = require("request");
// 类似服务端jquery
const cheerio = require("cheerio");
// 解码
const iconv = require("iconv-lite");

const request = (url, callback) => {
    const opts = {
        url,
        encoding: null //不要对返回数据进行解码，直接返回Buffer数据
    }
    originRequest(url, opts, callback);
}
const url = 'https://news.163.com/'
request(url, (err, res, body) => {
    const html = iconv.decode(body, 'gb2312')
    const $ = cheerio.load(html)
    const spiderData = []
    $(".top_news_ul li").each((index, item) => {
        $(item).find('a').each((index, item) => {
            spiderData.push($(item).text())
        })
    })
    console.log(spiderData)
})
