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
        backPath: '/pages/index/index' //登录成功跳转页面  默认首页
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _self = this
        this.setData({
            backPath: options.path
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
                                isGetUserPhoneShow: true,
                                isLoading: false
                            })
                        });
                        console.log(res.detail)
                        graceJS.post(
                            'common/login/login', {
                                code: loginRes.code,
                                encryptedData: res.detail.encryptedData,
                                iv: res.detail.iv,
                                signature:res.detail.signature,
                                rawData:res.detail.rawData
                            }, {}, {},
                            function (res) {
                                console.log(res)
                                _self.setData({
                                    openid: res.data.openid
                                })
                                graceJS.msgSuccess("获取成功!")
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
            //console.log(postData)
            graceJS.setAfter(() => {
                wx.hideLoading()
            });
            //发起网络请求
            graceJS.post(
                'common/login/getPhone', {
                    encryptedData: res.detail.encryptedData,
                    iv: res.detail.iv,
                    openid: _self.data.openid
                }, {}, {},
                function (res) {
                    console.log(res)
                    _self.setData({

                    })
                    // app.globalData.userInfo = _self.data.loginData.userInfo
                    // wx.setStorage({
                    //     key: "userInfo",
                    //     data: app.globalData.userInfo
                    // })
                    console.log(app.globalData.userInfo)
                }
            )
        } else {
            this.errorModel(res.detail.errMsg)
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