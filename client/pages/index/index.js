//index.js
//获取应用实例
const app = getApp()
var server = app.globalData.server;
var appid = app.globalData.appid;
var imgUrl = app.globalData.imgUrl;

Page({
    data: {
        userInfo: {},
        slideList: [
            `${imgUrl}2.jpg`,
            `${imgUrl}4.jpg`,
            `${imgUrl}5.jpg`,
            `${imgUrl}6.jpg`
        ],
        isPlayingMusic: true,
        isShowDialog: false
    },
    onLoad: function () {
        var that = this;

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

        // wx.getUserInfo({
        //     success: function (res) {
        //         that.setData({
        //             userInfo: res.userInfo
        //         })
        //     }
        // })

        wx.request({
            url: `${server}/weapp/main`,
            method: 'GET',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                const data = res.data.data || {};
                const musicInfo = data.musicInfo || {};
                const shareInfo = data.shareInfo || {};
                wx.playBackgroundAudio({
                    dataUrl: musicInfo.music_url,
                    title: musicInfo.title,
                    coverImgUrl: musicInfo.coverImgUrl
                });

                that.setData({
                    shareInfo: shareInfo,
                    music_url: musicInfo.music_url,
                    title: musicInfo.title,
                    coverImgUrl: musicInfo.coverImgUrl,
                });
            }
        })
    },
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
    play: function (event) {
        if (this.data.isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })
        } else {
            wx.playBackgroundAudio({
                dataUrl: this.data.music_url,
                title: this.data.title,
                coverImgUrl: this.data.coverImgUrl
            })
            this.setData({
                isPlayingMusic: true
            })
        }
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
