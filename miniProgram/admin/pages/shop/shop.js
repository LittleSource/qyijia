var graceJS = require('../../../utils/grace');
const app = getApp()
var _self = null
Page({
    data: {
        dataList: [],
        pageIndex: 1,
        pageSum: 1,
        loadding: false,
        pullUpOn: true,
    },
    onShow() {
        wx.startPullDownRefresh()
    },
    onLoad: function () {
        _self = this
    },
    goDetails(e) {
        wx.navigateTo({
            url: '/admin/pages/shopDetails/shopDetails?id=' + e.currentTarget.dataset.id,
        })
    },
    onPullDownRefresh: function () {
        this.setData({
            pageIndex: 1,
            pageSum: 1,
            loadding: false,
            pullUpOn: true,
        })
        graceJS.setAfter(() => {
            wx.stopPullDownRefresh()
        })
        graceJS.post(
            'admin/shop/getlist', {
                page: _self.data.pageIndex
            }, {}, {
                token: app.globalData.userInfo.token
            },
            (res) => {
                var pageSum_ = Math.ceil(res.total / res.per_page)
                _self.setData({
                    dataList: res.data,
                    pullUpOn: pageSum_ != 1,
                    pageIndex: res.last_page,
                    pageSum: pageSum_
                })
                console.log(res.data)
            }
        )
    },
    onReachBottom: function () {
        if (this.data.loadding || !this.data.pullUpOn) {
            return
        }
        this.setData({
            loadding: true
        })
        graceJS.post(
            'admin/shop/getlist', {
                page: _self.data.pageIndex
            }, {}, {
                token: app.globalData.userInfo.token
            },
            (res) => {
                _self.setData({
                    loadding: false,
                    pullUpOn: _self.data.pageSum != _self.data.pageIndex,
                    pageIndex: res.last_page,
                })
                _self.setData({
                    dataList: _self.dataList.concat(res.data)
                })
            }
        )
    }
})