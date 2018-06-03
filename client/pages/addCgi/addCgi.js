//index.js
var util = require('../../utils/util.js')
const app = getApp();
var server = app.globalData.server;
var appid = app.globalData.appid;

Page({
    data: {
        requestResult: '',
        canIUseClipboard: wx.canIUse('setClipboardData')
    },

    testCgi: function () {
        util.showBusy('请求中...')
        var that = this
        // qcloud.request({
        //     url: `${config.service.host}/weapp/comment`,
        //     login: false,
        //     success (result) {
        //         util.showSuccess('请求成功完成')
        //         that.setData({
        //             requestResult: JSON.stringify(result.data)
        //         })
        //     },
        //     fail (error) {
        //         util.showModel('请求失败', error);
        //         console.log('request fail', error);
        //     }
        // })
        wx.request({
            url: `${server}/weapp/comment`,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                util.showSuccess('请求成功完成');
                that.setData({
                    requestResult: JSON.stringify(res.data)
                })
            }
        })
    },

    copyCode: function (e) {
        var codeId = e.target.dataset.codeId
        wx.setClipboardData({
            data: code[codeId - 1],
            success: function () {
                util.showSuccess('复制成功')
            }
        })
    }
})

var code = [
`router.get('/demo', controllers.demo)`,
`module.exports = ctx => {
    ctx.state.data = {
        msg: 'Hello World'
    }
}`
]
