const selectFun = require('./chatSelect')
const insertFun = require('./chatInsert')

const select  = async ctx => {
    const data = await selectFun()

    ctx.state.data = data
}
const insert  = async ctx => {
    const param = ctx.query
    const success = await insertFun(param)
    const data = await selectFun()

    ctx.state.data = data
    ctx.state.data.success = success
}
module.exports = {
    select,
    insert
}