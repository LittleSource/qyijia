// pages/cashier/cashier.js
const app = getApp()
const graceJS = require('../../utils/grace.js');
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shoppingCart: [],
        priceSum: 0.00,
        deliveryPrice: '0.00', //配送费
        realSum: 0.00, //加上配送费的总价
        address: null
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        _self = this
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            '/shop/shop/getdeliveryprice', {}, {}, {}, (res) => {
                var priceSum_ = app.globalData.goodsInfo.priceSum
                _self.setData({
                    priceSum: priceSum_,
                    realSum: (parseFloat(priceSum_) + res.deliveryPrice).toFixed(2),
                    shoppingCart: app.globalData.goodsInfo.shoppingCart,
                    deliveryPrice: res.deliveryPrice.toFixed(2)
                })
                graceJS.post(
                    '/common/address/getdefault', {}, {}, {
                        token: app.globalData.userInfo.token
                    }, (res2) => {
                        _self.setData({
                            address: res2.defaultAddress
                        })
                    }
                )
            }
        )
    },
    chooseAddr: function () {
        wx.navigateTo({
            url: '/pages/address/address?type=cashier',
            events: {//获取被打开页面传送到当前页面的数据
                acceptAddress: function (data) {
                    _self.setData({
                        address:data
                    })
                },
            }
        })
    }
})