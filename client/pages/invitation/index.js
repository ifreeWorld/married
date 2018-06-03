// pages/invitation/index.js
//获取应用实例
const app = getApp()
var server = app.globalData.server;
var appid = app.globalData.appid;
var imgUrl = app.globalData.imgUrl;

var touchDot = 0;//触摸时的原点  
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this

        // wx.getUserInfo({
        //     success: function (res) {
        //         that.setData({
        //             userInfo: res.userInfo
        //         })
        //     }
        // })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            app.globalData.userInfo = res.userInfo;
                            that.setData({
                                userInfo: res.userInfo
                            })

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                } else {
                    this.setData({
                        isShowDialog: true
                    });
                }
            }
        });

        wx.request({
            url: `${server}/weapp/invitation`,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                const data = res.data.data || {};
                const mainInfo = data.mainInfo || {};
                const shareInfo = data.shareInfo || {};

                that.setData({
                    shareInfo: shareInfo,
                    mainInfo: mainInfo,
                });
            }
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var that = this;
        return {
            title: that.data.shareInfo.title,
            imageUrl: that.data.shareInfo.imageUrl,
            path: 'pages/index/index',
            success: function (res) {
                wx.showToast({
                    title: '分享成功',
                })
            },
            fail: function (res) {
                // 转发失败
                wx.showToast({
                    title: '分享取消',
                })
            }
        }
    },
    callhe: function (event) {
        wx.makePhoneCall({
            phoneNumber: this.data.mainInfo.he_tel
        })
    },
    callshe: function (event) {
        wx.makePhoneCall({
            phoneNumber: this.data.mainInfo.she_tel
        })
    },
    cancel: function () {
        this.setData({
            isShowDialog: false
        })
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            isShowDialog: false
        });
    }
})