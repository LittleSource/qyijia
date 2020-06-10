const util = require('../../utils/util')
const graceJS = require('../../utils/grace.js');
const app = getApp()
var _self = null
Page({
    data: {
        history: [],
        key: "",
        shopList: [],
        productList: [],
        isStart: false, //是否开始搜索
    },
    onLoad: function () {
        _self = this
        try {
            var searchHistory = wx.getStorageSync('searchHistory')
            if (!searchHistory) {
                searchHistory = []
            }
        } catch (e) {
            var searchHistory = []
        }
        this.setData({
            history: searchHistory
        })
    },
    back: function () {
        wx.navigateBack();
    },
    input: function (e) {
        let key = util.trim(e.detail.value);
        let start = false
        if (key !== '') {
            start = true
            graceJS.post(
                'common/index/search', {
                    key: key,
                    city: app.globalData.positionInfo.city
                }, {}, {},
                (res) => {
                    if (res.productList.length > 0) {
                        for (let i = 0; i < res.productList.length; i++) {
                            res.productList[i].labels = res.productList[i].labels.split("$")
                        }
                    }
                    console.log(res)
                    _self.setData({
                        shopList: res.shopList,
                        productList: res.productList
                    })
                }
            )
        } else {
            start = false
        }
        this.setData({
            key: key,
            isStart: start
        })
        return key
    },
    goDetail(e) {
        var history_ = this.data.history
        history_.push(this.data.key)
        this.setData({
            history: history_
        })
        wx.setStorage({
            key: "searchHistory",
            data: _self.data.history
        })
        if (e.currentTarget.dataset.type) {
            var id = this.data.productList[e.currentTarget.dataset.index].shop_id
        } else {
            var id = this.data.shopList[e.currentTarget.dataset.index].id
        }
        wx.redirectTo({
            url: '/pages/shop/shop?id=' + id,
        })
    },
    cleanKey: function () {
        this.setData({
            key: ''
        })
    },
    clearHistory: function () {
        wx.showModal({
            title: '提示',
            content: '确认清空搜索历史吗？',
            success(res) {
                if (res.confirm) {
                    wx.setStorage({
                        key: "searchHistory",
                        data: []
                    })
                    _self.setData({
                        history: []
                    })
                }
            }
        })
    }
})