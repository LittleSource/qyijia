const graceJS = require('../../utils/grace.js');
const app = getApp()
var _self = null
Page({
    data: {
        tabs: [{
            name: "全部"
        }, {
            name: "待付款"
        }, {
            name: "待接单"
        }, {
            name: "待送达"
        }, {
            name: "退款/售后"
        }],
        statusColors: ['#01AAED', '#FF5722', '#FFB800', '#5FB878', '#393D49'],
        dataList: [],
        currentTab: 0,
        pageIndex: 1,
        pageSum: 1,
        loadding: false,
        pullUpOn: true,
        isRefresh: false,
        isAcceptData: false
    },
    onShow: function () {
        if (this.data.isAcceptData) {
            this.setData({
                isAcceptData: false,
                dataList: [],
                pageIndex: 1,
                pullUpOn: true
            })
            wx.startPullDownRefresh()
        }
    },
    onLoad: function (options) {
        _self = this
        app.checkLogin()
        if (options.index) {
            this.setData({
                currentTab: Number(options.index)
            })
        }
        wx.startPullDownRefresh()
    },
    onPullDownRefresh() {
        if (this.data.isRefresh) {
            wx.stopPullDownRefresh()
            return
        }
        this.setData({
            pageIndex: 1,
            pullUpOn: true,
            isRefresh: true
        })
        graceJS.setAfter(() => {
            wx.stopPullDownRefresh({
                success: function () {
                    _self.setData({
                        isRefresh: false
                    })
                }
            })
        })
        graceJS.post(
            'shop/order/getlist', {
                status_index: _self.data.currentTab,
                page: _self.data.pageIndex
            }, {}, {
                token: app.globalData.userInfo.token
            },
            (res) => {
                var pageSum_ = Math.ceil(res.total / res.per_page)
                _self.setData({
                    pullUpOn: pageSum_ != 1,
                    pageIndex: res.last_page,
                    pageSum: pageSum_
                })
                _self.initData(res.data, true)
            }
        )
    },
    initData(res, isRefresh) {
        for (let i = 0; i < res.length; i++) {
            res[i].create_time = graceJS.fromTime(graceJS.toTimeStamp(res[i].create_time))
            res[i].shopping_cart = JSON.parse(res[i].shopping_cart)
            var count = 0
            for (let j = 0; j < res[i].shopping_cart.length; j++) {
                count += res[i].shopping_cart[j].count
            }
            res[i].count = count
        }
        if (isRefresh) {
            this.setData({
                dataList: res
            })
        } else {
            var dataList_ = this.data.dataList
            dataList_ = dataList_.concat(res)
            this.setData({
                dataList: dataList_
            })
        }
    },
    change(e) {
        this.setData({
            dataList: [],
            currentTab: e.detail.index
        })
        wx.startPullDownRefresh()
    },
    detail(e) {
        var id = this.data.dataList[e.currentTarget.dataset.index].id
        wx.navigateTo({
            url: '/pages/orderDetail/orderDetail?id=' + id,
            events: {
                //获取被打开页面传送到当前页面的数据
                acceptDataFromDetail: function (res) {
                    if (res.data === true) {
                        _self.setData({
                            isAcceptData: true
                        })
                    }
                }
            }
        })
    },
    goShop(e) {
        var order = this.data.dataList[e.currentTarget.dataset.index]
        wx.navigateTo({
            url: '/pages/shop/shop?id=' + order.shop_id + '&hasdata=1',
            success: function (res) {
                res.eventChannel.emit('orderPage', order)
            }
        })
    },
    secondPay(e) {
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            '/wepay/pay/secondpay', {
                order_id: e.currentTarget.dataset.orderid
            }, {}, {
                token: app.globalData.userInfo.token
            }, (res) => {
                wx.requestPayment({
                    timeStamp: res.timeStamp,
                    nonceStr: res.nonceStr,
                    package: res.package,
                    signType: res.signType,
                    paySign: res.paySign,
                    success: function () {
                        graceJS.msgSuccess('付款成功!')
                        wx.startPullDownRefresh()
                    },
                    fail: function () {
                        graceJS.msg("您已取消付款!")
                    }
                })
            }
        )
    },
    confirmReceipt(e) {
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            '/shop/order/confirmReceipt', {
                id: e.currentTarget.dataset.orderid
            }, {}, {
                token: app.globalData.userInfo.token
            }, (res) => {
                wx.startPullDownRefresh({
                    complete:()=>{
                        graceJS.msgSuccess('收货成功！')
                    }
                })
            }
        )
    },
    onReachBottom() {
        if (this.data.loadding || !this.data.pullUpOn) {
            return
        }
        this.setData({
            loadding: true
        })
        graceJS.post(
            'shop/order/getlist', {
                status_index: _self.data.currentTab,
                page: _self.data.pageIndex
            }, {}, {
                token: app.globalData.userInfo.token
            },
            (res) => {
                this.setData({
                    loadding: false,
                    pullUpOn: _self.data.pageSum != _self.data.pageIndex,
                    pageIndex: res.last_page,
                })
                _self.initData(res.data, false)
            }
        )
    }
})