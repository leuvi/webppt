import socket from './io'


const names = ['京东吴彦祖', '智谷刘德华', '武侯金城武', '金融彭于晏']

function setName() {
    if(localStorage.getItem('ppt_user')) {
        socket.emit('message', {
            join: localStorage.getItem('ppt_user') + '加入了!'
        })
        return
    }
    var name = prompt('请输入您的大名')
    if(name !== null && name !== '') {
        localStorage.setItem('ppt_user', name)
    } else {
        localStorage.setItem('ppt_user', names[~~(names.length * Math.random())])
    }
    socket.emit('message', {
        join: localStorage.getItem('ppt_user') + '加入了!'
    })
}

function isMaster() {
    return localStorage.getItem('ppt_user') === 'ppt_master'
}

export default {
    setName,
    isMaster
}