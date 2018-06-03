// pages/map/index.js

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
    markertap(e) {
        // console.log(e)
        wx.request({
            url: `${server}/weapp/map`,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                var lng = res.data.data.mainInfo.lng
                var lat = res.data.data.mainInfo.lat
                console.log(lat)
                wx.openLocation({
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lng),
                    scale: 18,
                    name: res.data.data.mainInfo.hotel,
                    address: res.data.data.mainInfo.address
                })
            }
        })
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
            url: `${server}/weapp/map`,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                // console.log(res.data)

                var lng = res.data.data.mainInfo.lng
                var lat = res.data.data.mainInfo.lat
                that.setData({
                    mainInfo: res.data.data.mainInfo,
                    lng: lng, // 全局属性，用来取定位坐标
                    lat: lat,
                    markers: [{
                        iconPath: "/images/nav.png",
                        id: 0,
                        latitude: lat, // 页面初始化 options为页面跳转所带来的参数 
                        longitude: lng,
                        width: 50,
                        height: 50
                    }],
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var that = this;
        //console.log(that.data);
        return {
            title: that.data.mainInfo.share,
            imageUrl: that.data.mainInfo.thumb,
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