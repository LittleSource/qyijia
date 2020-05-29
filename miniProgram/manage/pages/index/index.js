// manage/index/index.js
const app = getApp()
const graceJS = require('../../../utils/grace.js');
var _self = null
Page({
    /**
     * 页面的初始数据
     */
    data: {
        todayPriceSum: '0.00',
        todayOrderCount: 0,
        yesterdayCount: 0,
        thisMonthCount: 0,
        menuList: [{
            name: '订单管理',
            icon: 'calendar',
            color: 'orangered',
            url: '/manage/pages/order/order'
        }, {
            name: '商品管理',
            icon: 'member',
            color: '#fbbd08',
            url: '/manage/pages/product/product'
        }, {
            name: '分类管理',
            icon: 'label',
            color: '#2BAF3D',
            url: '/manage/pages/classify/classify'
        }, {
            name: '资金记录',
            icon: 'wealth',
            color: '#e54d42',
            url: '/manage/pages/fundDetails/fundDetails'
        }, {
            name: '店铺信息',
            icon: 'about',
            color: '#0081ff',
            url: '/manage/pages/shopInfo/shopInfo'
        }]
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
    href: function (e) {
        graceJS.navigate(this.data.menuList[e.currentTarget.dataset.index].url)
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