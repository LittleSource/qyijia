const app = getApp()
const graceJS = require('../../utils/grace.js');
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        _self = this
        app.checkLogin()
    },
    onShow: function () {
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },
    loginOut: function () {
        wx.showModal({
            title: '提示',
            content: '确定要退出登录吗？',
            success(res) {
                if (res.confirm) {
                    app.globalData.userInfo = null
                    wx.clearStorage({
                        complete: (res) => {
                            wx.navigateBack({
                                complete: (res) => {
                                    graceJS.msgSuccess('已退出登录')
                                }
                            })
                        }
                    })
                }
            }
        })
    }
})