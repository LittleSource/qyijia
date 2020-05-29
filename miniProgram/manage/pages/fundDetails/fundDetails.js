const app = getApp()
const graceJS = require('../../../utils/grace.js');
var _self = null
Page({
    data: {
        balance: '0.00',
        thisMonth: {},
        lastMonth: {},
        lastLastMonth: {},
        scrollTop: 0
    },
    onLoad: function (options) {
        _self = this
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            'manage/fund/getlist', {}, {}, {
                token: app.globalData.userInfo.token
            }, (res) => {
                console.log(res)
                _self.initData(res)
            }
        )
    },
    initData(data) {
        var expenditure = 0;
        var income = 0;
        for (let i = 0; i < data.thisMonth.length; i++) {
            if (data.thisMonth[i].type) {
                income += parseFloat(data.thisMonth[i].price)
            } else {
                expenditure += parseFloat(data.thisMonth[i].price)
            }
        }
        this.data.thisMonth.expenditure = expenditure.toFixed(2)
        this.data.thisMonth.income = income.toFixed(2)
        this.data.thisMonth.list = data.thisMonth
        this.setData({
            thisMonth: this.data.thisMonth
        })
        expenditure = 0;
        income = 0;
        for (let i = 0; i < data.lastMonth.length; i++) {
            if (data.lastMonth[i].type) {
                income += parseFloat(data.lastMonth[i].price)
            } else {
                expenditure += parseFloat(data.lastMonth[i].price)
            }
        }
        this.data.lastMonth.expenditure = expenditure.toFixed(2)
        this.data.lastMonth.income = income.toFixed(2)
        this.data.lastMonth.list = data.lastMonth
        this.setData({
            lastMonth: this.data.lastMonth
        })
        expenditure = 0;
        income = 0;
        for (let i = 0; i < data.lastLastMonth.length; i++) {
            if (data.lastLastMonth[i].type) {
                income += parseFloat(data.lastLastMonth[i].price)
            } else {
                expenditure += parseFloat(data.lastLastMonth[i].price)
            }
        }
        this.data.lastLastMonth.expenditure = expenditure.toFixed(2)
        this.data.lastLastMonth.income = income.toFixed(2)
        this.data.lastLastMonth.list = data.lastLastMonth
        this.setData({
            lastLastMonth: this.data.lastLastMonth
        })
        console.log(this.data.thisMonth)
        console.log(this.data.lastMonth)
        console.log(this.data.lastLastMonth)
    },
    onChange(e) {
        console.log(e.detail, 'click right menu callback data')
    },
    //页面滚动执行方式
    onPageScroll(e) {
        this.setData({
            scrollTop: e.scrollTop
        })
    },
    detail(e) {
        return
    }
});