// pages/login/login.js
const graceJS = require('../../utils/grace.js');
const app = getApp()
var _self = null
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isGetUserPhoneShow: false,
        isLoading: false,
        openid: '',
        backPath: {
            path: '/pages/index/index', //登录成功跳转页面  默认首页
            type: 0 //默认不是tab  1是 0不是  
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _self = this
        this.setData({
            backPath: {
                path: options.path,
                type: options.type ? 1 : 0
            }
        })
    },
    getUserInfo: function (res) {
        if (res.detail.errMsg == "getUserInfo:ok") {
            wx.login({
                success(loginRes) {
                    if (loginRes.code) {
                        _self.setData({
                            isLoading: true
                        })
                        graceJS.setAfter(() => {
                            _self.setData({
                                isLoading: false
                            })
                        });
                        graceJS.post(
                            'common/login/login', {
                                code: loginRes.code,
                                encryptedData: res.detail.encryptedData,
                                iv: res.detail.iv,
                                signature: res.detail.signature,
                                rawData: res.detail.rawData
                            }, {}, {},
                            function (res) {
                                _self.setData({
                                    openid: res.openid,
                                    isGetUserPhoneShow: true,
                                })
                                graceJS.msg("获取成功!")
                            }
                        )
                    } else {
                        this.errorModel(res.errMsg)
                    }
                }
            })
        } else {
            this.errorModel(res.detail.errMsg)
        }
    },
    getPhoneNumber: function (res) {
        if (res.detail.errMsg == "getPhoneNumber:ok") {
            graceJS.showLoading('loading...')
            graceJS.setAfter(() => {
                wx.hideLoading()
            });
            graceJS.post( //发起网络请求
                'common/login/getPhone', {
                    encryptedData: res.detail.encryptedData,
                    iv: res.detail.iv,
                    openid: _self.data.openid
                }, {}, {},
                function (res) {
                    res.userInfo.token = res.token
                    app.globalData.userInfo = res.userInfo
                    wx.setStorage({
                        key: "userInfo",
                        data: app.globalData.userInfo
                    })
                    graceJS.msgSuccess("登录成功!", () => {
                        _self.backPage()
                    })
                }
            )
        } else {
            this.errorModel(res.detail.errMsg)
        }
    },
    backPage: function () {
        if (this.data.backPath.type) {
            wx.switchTab({
                url: this.data.backPath.path,
            })
        } else {
            wx.redirectTo({
                url: this.data.backPath.path,
            })
        }
    },
    errorModel: function (errorMsg) {
        wx.showModal({
            title: '提示',
            showCancel: false,
            content: '需要通过授权才能继续，请重新点击并授权!\n' + errorMsg
        })
    }
})