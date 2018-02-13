const fs = require('fs')
const os = require('os')

const render = async () => {
    return await new Promise((res, rej) => {
        fs.readFile(`./dist/index.html`, 'utf-8', (err, data) => {
            if(err) {
                rej(err)
            } else {
                res(data)
            }
        })
    })
}

const getLocalIp = () => {
    let ip = ''
    let interFaces = os.networkInterfaces()
    for(let i in interFaces) {
        interFaces[i].forEach(details => {
            if(details.family == 'IPv4') {
                ip = details.address
            }
        })
    }
    return ip
}

module.exports = {
    render,
    getLocalIp
}