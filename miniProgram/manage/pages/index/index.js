// manage/index/index.js
const app = getApp()
const graceJS = require('../../../utils/grace.js');
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        todayPriceSum: 0,
        todayOrderCount: 0,
        yesterdayCount: 0,
        thisMonthCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _self = this
        wx.startPullDownRefresh()
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        graceJS.setAfter(() => {
            wx.stopPullDownRefresh()
        })
        graceJS.post(
            'manage/index/getdata', {}, {}, {
                token: app.globalData.userInfo.token
            },
            (res) => {
                _self.setData({
                    todayPriceSum: res.todayPriceSum.toFixed(2),
                    todayOrderCount: res.todayOrderCount,
                    yesterdayCount: res.yesterdayCount,
                    thisMonthCount: res.thisMonthCount
                })
            }
        )
    },
})