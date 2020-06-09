var graceJS = require('../../../utils/grace');
const app = getApp()
var _self = null
Page({
    data: {
        bgColor: "linear-gradient(90deg, rgb(255, 118, 38), rgb(252, 30, 82))",
        tabs: [{
            name: "待接单"
        }, {
            name: "待送达"
        }, {
            name: "已完成"
        }],
        shopId: 0,
        isRefresh: false,
        dataList: [],
        pageIndex: 1,
        pageSum: 1,
        loadding: false,
        pullUpOn: true,
        isShowModal: false,
        orderData: {}
    },
    onLoad: function (options) {
        _self = this
        if (options.shopid) {
            this.setData({
                shopId: parseInt(options.shopid)
            })
        }
        wx.startPullDownRefresh()
    },
    change(e) {
        this.setData({
            dataList: [],
            currentTab: e.detail.index
        })
        wx.startPullDownRefresh()
    },
    detail(e) {
        var orderData = this.data.dataList[e.currentTarget.dataset.index]
        this.setData({
            isShowModal: true,
            orderData: orderData
        })
    },
    hideModal() {
        this.setData({
            isShowModal: false
        })
    },
    acceptOrder(e) {
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            'manage/order/acceptorder', {
                id: _self.data.dataList[e.currentTarget.dataset.index].id
            }, {}, {
                token: app.globalData.userInfo.token
            },
            (res) => {
                wx.startPullDownRefresh({
                    complete: (res) => {
                        graceJS.msg('接单成功,请尽快送出!')
                    }
                })
            }
        )
    },
    onPullDownRefresh() {
        if (this.data.isRefresh) {
            wx.stopPullDownRefresh()
            return
        }
        this.setData({
            pageIndex: 1,
            pageSum: 1,
            loadding: false,
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
            'admin/order/getlist', {
                shop_id: _self.data.shopId,
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
    onReachBottom() {
        if (this.data.loadding || !this.data.pullUpOn) {
            return
        }
        this.setData({
            loadding: true
        })
        graceJS.post(
            'admin/order/getlist', {
                shop_id: _self.data.shopId,
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
    },
    initData(res, isRefresh) {
        for (let i = 0; i < res.length; i++) {
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
    }
})