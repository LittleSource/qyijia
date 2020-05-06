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
        priceSum: 0.00
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            priceSum: options.price
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            shoppingCart: app.globalData.shoppingCart
        })
    },
    chooseAddr: function () {
        graceJS.navigate('/pages/address/address')
    }
})