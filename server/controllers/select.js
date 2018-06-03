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
const content = 'select * from tbl_bless_info'

module.exports = () => {
    return new Promise((resolve, reject) => {
        // 执行 .sql 文件内容
        DB.raw(content).then(res => {
            const zanLog = res[0] || [];
            const zanNum = zanLog.length;
            const data = {
                shareInfo: {
                    title: '王子龙和邱璇的婚礼',
                    imageUrl: 'https://mp.weixin.qq.com/wxopen/basicprofile?action=get_headimg&token=1367172687&t=20180601204035'
                },
                zanLog: zanLog,
                zanNum: zanNum
            }
            resolve(data)
        }, err => {
            const data = {
                shareInfo: {
                    title: '王子龙和邱璇的婚礼',
                    imageUrl: 'https://mp.weixin.qq.com/wxopen/basicprofile?action=get_headimg&token=1367172687&t=20180601204035'
                },
                zanLog: [],
                zanNum: 0
            }
            reject(data)
            throw new Error(err)
        })
    })
}