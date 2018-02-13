const Koa = require('koa')
const app = new Koa()
const static = require('koa-static')
const path = require('path')
const util = require('./util')
const opener = require('opener')

const PORT = process.env.npm_package_config_port
const io = require('socket.io').listen(app.listen(PORT))

let page = 0

app.use(static(path.join(__dirname, './dist')))

app.use(async ctx => {
    if(ctx.url == '/') {
        ctx.body = await util.render()
    } else {
        ctx.status = 404
    }
})

io.on('connection', socket => {
    //广播当前页
    io.sockets.emit('currentpage', {page})
    //消息广播
    socket.on('message', msg => {
        io.sockets.emit('message', msg)
    })
    //页面控制
    socket.on('change', msg => {
        page = msg.page
        io.emit('receiveChange', {page})
    })
    socket.on('disconnect', () => {
        console.log('disconnected~')
    })
})

console.log('服务已启动: ' + util.getLocalIp() + ':' + PORT)
opener('http://' + util.getLocalIp() + ':' + PORT)