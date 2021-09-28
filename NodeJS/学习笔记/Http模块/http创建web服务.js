const http = require('http')
const url = require('url')

// req - 客户端传递信息
// res - 浏览器响应信息
http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return
  }
  console.log(req.url)
  let param = url.parse(req.url, true).query
  console.log('姓名'+param.name,'年龄'+param.age)
  // 设置响应头
  res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'})
  res.write('<head><meta charset="utf-8" /><title>APP</title></head>')
  res.end('你好 nodejs')
}).listen(3000)

// url  http://127.0.0.1:3000?name=zhangsan&age=20

console.log('Server is running at http://127.0.0.1:3000')
