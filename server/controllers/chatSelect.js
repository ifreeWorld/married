const { mysql: config } = require('../config')

const DB = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: config.db,
        charset: config.char,
        multipleStatements: true
    }
})

// 读取 .sql 文件内容
const content = 'select * from tbl_chat_info'

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const handleData = data => {
    if (data && data.length > 0) {
        data.forEach(item => {
            if (item.time) {
                item.time = formatTime(item.time);
            }
        });
    }
    return data;
}

module.exports = () => {
    return new Promise((resolve, reject) => {
        // 执行 .sql 文件内容
        DB.raw(content).then(res => {
            const chatList = res[0] || [];
            const chatNum = chatList.length;
            const handleChatList = handleData(chatList);
            const data = {
                shareInfo: {
                    title: '王子龙和邱璇的婚礼',
                    imageUrl: 'https://mp.weixin.qq.com/wxopen/basicprofile?action=get_headimg&token=1367172687&t=20180601204035'
                },
                chatList: handleChatList,
                chatNum: chatNum
            }
            resolve(data)
        }, err => {
            const data = {
                shareInfo: {
                    title: '王子龙和邱璇的婚礼',
                    imageUrl: 'https://mp.weixin.qq.com/wxopen/basicprofile?action=get_headimg&token=1367172687&t=20180601204035'
                },
                chatList: [],
                chatNum: 0
            }
            reject(data)
            throw new Error(err)
        })
    })
}