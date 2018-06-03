// pages/bless/index.js

const app = getApp()
var server = app.globalData.server;
var appid = app.globalData.appid;
var imgUrl = app.globalData.imgUrl;
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
            url: `${server}/weapp/bless/select`,
            method: 'GET',
            data: {},
            success: function (res) {
                that.setData({
                    shareInfo: res.data.data.shareInfo,
                    zanLog: res.data.data.zanLog,
                    zanNum: res.data.data.zanNum
                });
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        var that = this;
        wx.request({
            url: `${server}/weapp/bless/select`,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                // console.log(res.data)
                that.setData({
                    shareInfo: res.data.data.shareInfo,
                    zanLog: res.data.data.zanLog,
                    zanNum: res.data.data.zanNum
                });
            }
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

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
    zan: function (event) {
        var that = this;

        var userInfo = that.data.userInfo;
        var nickname = userInfo.nickName;
        var avatar = userInfo.avatarUrl;
        var storage = wx.getStorageSync('insert');
        if (storage == 1) {
            wx.showModal({
                title: '提示',
                content: '您已经送过祝福了',
                showCancel: false
            })
            return;
        }
        wx.request({
            url: `${server}/weapp/bless/insert`,
            data: {
                'nickname': nickname,
                'avatar': avatar
            },
            header: {},
            method: "GET",
            dataType: "json",
            success: res => {
                // console.log(res.data);
                if (res.data.data.success) {

                    that.setData({
                        zanLog: res.data.data.zanLog,
                        zanNum: res.data.data.zanNum
                    });
                    wx.showModal({
                        title: '提示',
                        content: '您送出了祝福',
                        showCancel: false
                    })
                    wx.setStorageSync('insert', 1)
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '送祝福失败',
                        showCancel: false
                    })
                }
            }
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