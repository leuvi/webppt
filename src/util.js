import socket from './io'


const names = ['吴彦祖', '古天乐', '金城武', '彭于晏', '梁朝伟']

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