const graceJS = require('../../utils/grace.js')
const Position = require('../../utils/position')
const chooseLocation = requirePlugin('chooseLocation');
var _self = null
var position = new Position()
var app = getApp()
Page({
    data: {
        positionInfo: {
            name: '定位中...',
        },
        isGochooseLocationPage: false, //是否去过选择地址页面
        current: 0,
        tabbar: [{
            icon: "home",
            text: "首页",
            size: 21
        }, {
            icon: "category",
            text: "分类",
            size: 24
        }, {
            icon: "cart",
            text: "购物车",
            size: 22
        }, {
            icon: "people",
            text: "我的",
            size: 24
        }],
        banner: [],
        category: [{
            img: "1.png",
            name: "超市百货"
        }, {
            img: "2.png",
            name: "优质蔬菜"
        }, {
            img: "3.png",
            name: "水果生鲜"
        }, {
            img: "4.png",
            name: "鲜花礼品"
        }, {
            img: "5.png",
            name: "送药到家"
        }],
        dev:1,
        shopList: [],
        pageIndex: 1,
        loadding: false,
        pullUpOn: false,
        pageSum: 1
    },
    onShow: function () {
        const location = chooseLocation.getLocation();
        if (this.data.isGochooseLocationPage && location instanceof Object) {
            this.data.positionInfo.name = location.name
            this.data.positionInfo.latitude = location.latitude
            this.data.positionInfo.longitude = location.longitude
            this.data.positionInfo.city = location.city
            this.data.positionInfo.district = location.district
            this.setData({
                positionInfo: this.data.positionInfo,
                shopList: [],
                isGochooseLocationPage: false
            })
            app.globalData.positionInfo = this.data.positionInfo
            wx.startPullDownRefresh()
        }
    },
    onLoad: function (options) {
        _self = this
        position.getPostition(
            function success(res) {
                _self.setData({
                    positionInfo: res
                })
                app.globalData.positionInfo = res
                wx.startPullDownRefresh()
            },
            function fail(res, e) {
                _self.setData({
                    positionInfo: res
                })
            }
        )
        graceJS.post( //获取banner
            'common/index/getbanner', {}, {}, {}, (res) => {
                getApp().globalData.dev = res.dev
                let noDataBtnText_ = '暂无数据'
                if (!res.dev) {
                    noDataBtnText_ = '申请入驻'
                }
                _self.setData({
                    dev:res.dev,
                    banner: res.banner,
                    noDataBtnText: noDataBtnText_
                })
            }
        )
    },
    onPullDownRefresh: function () {
        if (this.data.loadding) {
            return
        }
        this.setData({
            pullUpOn: false,
            pageIndex: 1,
            pageSum: 1
        })
        graceJS.setAfter(() => {
            wx.stopPullDownRefresh()
        })
        graceJS.post(
            'common/index/getShopList', {
                page: _self.data.pageIndex,
                city: _self.data.positionInfo.city
            }, {}, {}, (res) => {
                if (res.data.length == 0) {
                    return
                } else {
                    var pageSum_ = Math.ceil(res.total / res.per_page)
                    _self.setData({
                        shopList: res.data,
                        pullUpOn: pageSum_ != 1,
                        pageIndex: res.last_page,
                        pageSum: pageSum_
                    })
                }
            }
        )
    },
    onReachBottom: function () {
        if (!this.data.pullUpOn || this.data.loadding) return;
        this.setData({
            loadding: true
        }, () => {
            if (this.data.pageIndex == 4) {
                let loadData = JSON.parse(JSON.stringify(this.data.productList))
                loadData = loadData.splice(0, 10)
                if (this.data.pageIndex == 1) {
                    loadData = loadData.reverse();
                }
                setTimeout(function () {
                    _self.setData({
                        productList: _self.data.productList.concat(loadData),
                        pageIndex: _self.data.pageIndex + 1,
                        loadding: false
                    })
                }, 2000)
            }
        })
    },
    cate() {
        graceJS.msg('此功能即将上线~')
    },
    bannerClick(e) {
        wx.navigateTo({
            url: _self.data.banner[e.currentTarget.dataset.index].url,
        })
    },
    goSearch() {
        wx.navigateTo({
            url: '/pages/search/search',
        })
    },
    chooseLocation() {
        this.setData({
            isGochooseLocationPage: true
        })
        position.chooseLocation()
    },
    goPoster() {
        wx.navigateTo({
            url: '/pages/poster/poster'
        })
    },
    detail: function (e) {
        wx.navigateTo({
            url: '/pages/shop/shop?id=' + e.currentTarget.dataset.id
        })
    }
})