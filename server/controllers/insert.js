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

module.exports = (data) => {
    const content = `insert into tbl_bless_info(nickname, avatar) values ("${data.nickname}", "${data.avatar}")`
    return new Promise((resolve, reject) => {
        // 执行 .sql 文件内容
        DB.raw(content).then(res => {
            resolve(1)
        }, err => {
            reject(0)
            throw new Error(err)
        })
    })
}