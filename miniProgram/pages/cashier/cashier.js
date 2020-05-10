// pages/cashier/cashier.js
const app = getApp()
const graceJS = require('../../utils/grace.js');
const Position = require('../../utils/position')
var position = new Position()
var _self = null
Page({
    data: {
        shopId: 1,
        shoppingCart: [],
        priceSum: 0.00,
        deliveryPrice: '0.00', //配送费
        realSum: 0.00, //加上配送费的总价
        address: null,
        distanceOut: false,
        time: '00:00'
    },
    onShow: function () {
        app.checkLogin()
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
                    shopId: app.globalData.goodsInfo.shopId, //暂时留着
                    shopPosition: app.globalData.goodsInfo.shopPosition,
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
                        _self.getDeliveryDistance()
                    }
                )
            }
        )
    },
    chooseAddr: function () {
        wx.navigateTo({
            url: '/pages/address/address?type=cashier',
            events: { //获取被打开页面传送到当前页面的数据
                acceptAddress: function (data) {
                    _self.setData({
                        address: data
                    })
                    _self.getDeliveryDistance()
                },
            }
        })
    },
    //获取当前商家和选择的地址的距离与所需时间
    getDeliveryDistance: function () {
        let form = this.data.shopPosition
        let to = [{
            latitude: this.data.address.latitude,
            longitude: this.data.address.longitude
        }]
        position.calculateDistance(form, to, (res) => {
            if (res.distance > 3000) { //距离超出3000
                _self.setData({
                    distanceOut: true,
                })
            } else {
                let timeArr = graceJS.now('str', res.duration + 1800) //加上半小时商家准备时间
                _self.setData({
                    distanceOut: false,
                    time: timeArr[3] + ':' + timeArr[4]
                })
            }
        })
    },
    submitOrder: function () {
        console.log(this.data.address)
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            '/wepay/pay/createorder', {
                shop_id:_self.data.shopId,
                shopping_cart:JSON.stringify(_self.data.shoppingCart),
                address_id:_self.data.address.id
            }, {}, {
                token: app.globalData.userInfo.token
            }, (res) => {
                console.log(res)
            }
        )
    }
})