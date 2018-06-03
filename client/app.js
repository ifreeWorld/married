// app.js
App({
    onLaunch: function () {
        var that = this;
        // if (this.globalData.userInfo) {
        //     typeof cb == "function" && cb(this.globalData.userInfo)
        // } else {
        //     //调用登录接口
        //     wx.login({
        //         success: function () {
        //             wx.getUserInfo({
        //                 success: function (res) {
        //                     that.globalData.userInfo = res.userInfo;
        //                     typeof cb == "function" && cb(that.globalData.userInfo)
        //                 }
        //             })
        //         }
        //     });
        // }
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    globalData: {
        userInfo: null,
        appid: 'wxade372ce7f2da061',//wx4343c0fed4e0ecb3
        server: 'https://bhluwkdp.qcloud.la',
        imgUrl: 'https://wangzilong-1256848957.cos.ap-guangzhou.myqcloud.com/'
    }
});

