const graceJS = require('../../utils/grace.js');
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderId: 0,
        orderData: {},
        dTime: 0, //倒计时 秒
        deleteMsg: '删除成功！'
        //status 0-已完成 1-待付款 2-待接单 3-待收货  4 退款中 5-已退款
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _self = this
        if (options.id) {
            this.setData({
                orderId: options.id
            })
            setTimeout(()=>{
                wx.startPullDownRefresh()
            },800)
        } else {
            wx.navigateBack({
                success: () => {
                    graceJS.msg('缺少必要参数!')
                }
            })
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        graceJS.setAfter(() => {
            wx.stopPullDownRefresh()
        })
        graceJS.post(
            'shop/order/getorder', {
                id: _self.data.orderId
            }, {}, {
                token: app.globalData.userInfo.token
            },
            (res) => {
                _self.initData(res)
            }
        )
    },
    initData(data) {
        data.shopping_cart = JSON.parse(data.shopping_cart)
        var dTime_ = 0
        if (data.status == 1) {
            var miao = graceJS.now('number') - graceJS.toTimeStamp(data.create_time)
            dTime_ = 1200 - miao / 1000
            if (dTime_ <= 0) {
                //删除订单
                this.setData({
                    deleteMsg: '该订单已超时，请重新下单'
                })
                this.deleteOrder()
            }
        }
        _self.setData({
            dTime: dTime_,
            orderData: data
        })
    },
    copyOrderId() {
        wx.setClipboardData({
            data: _self.data.orderId
        })
    },
    deleteOrder2() {
        wx.showModal({
            title: '提示',
            content: '确定要删除当前订单吗？',
            success(res) {
                if (res.confirm) {
                    _self.deleteOrder()
                }
            }
        })
    },
    deleteOrder() {
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            'shop/order/deleteOne', {
                id: _self.data.orderId
            }, {}, {
                token: app.globalData.userInfo.token
            },
            (res) => {
                const pages = getCurrentPages()
                if (pages.length > 1) {
                    const eventChannel = this.getOpenerEventChannel()
                    eventChannel.emit('acceptDataFromDetail', {
                        data: true
                    })
                    wx.navigateBack({
                        complete: (res) => {
                            graceJS.msg(_self.data.deleteMsg)
                        }
                    })
                } else {
                    wx.redirectTo({
                        url: '/pages/order/order',
                        complete: (res) => {
                            graceJS.msg(_self.data.deleteMsg)
                        }
                    })
                }
            }
        )
    },
    getShopPhone() {
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            'shop/shop/getShopPhone', {
                id: _self.data.orderData.shop_id
            }, {}, {},
            (res) => {
                wx.makePhoneCall({
                    phoneNumber: res.phone,
                    fail: (e) => {
                        graceJS.msg('联系取消')
                    }
                })
            }
        )
    }
})