var graceJS = require('../../../utils/grace');
const app = getApp()
var _self = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopInfo: {},
        userInfo: {},
        modalShow: false,
        //以下为修改金额所需变量
        type: 0,
        content: '',
        price: 0.00
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _self = this
        if (options.id && !isNaN(parseInt(options.id))) {
            this.getData(parseInt(options.id))
        } else {
            wx.navigateBack({
                complete: () => {
                    graceJS.msg('缺少必要参数')
                }
            })
        }
    },
    getData(shopId) {
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            'admin/shop/getinfo', {
                id: shopId
            }, {}, {
                token: app.globalData.userInfo.token
            },
            (res) => {
                _self.setData({
                    userInfo: res.userInfo,
                    shopInfo: res.shopInfo
                })
            }
        )
    },
    showModal() {
        this.setData({
            modalShow: true
        })
    },
    hideModal() {
        this.setData({
            modalShow: false
        })
    },
    radioChange(e) {
        this.setData({
            type: parseInt(e.detail.value)
        })
    },
    priceInput(e) {
        this.setData({
            price: parseFloat(e.detail.value)
        })
    },
    contentInput(e) {
        this.setData({
            content: e.detail.value
        })
    },
    showOrder() {
        wx.navigateTo({
            url: '/admin/pages/order/order?shopid=' + _self.data.shopInfo.id,
        })
    },
    updateBalance() {
        if (isNaN(this.data.price) || this.data.price == 0) {
            graceJS.msg('请输入金额！')
        } else if (this.data.content == '') {
            graceJS.msg('请输入变动原因！')
        } else {
            graceJS.showLoading('Loading...')
            graceJS.setAfter(() => {
                wx.hideLoading()
            })
            graceJS.post(
                'admin/shop/updateBalance', {
                    id: _self.data.shopInfo.id,
                    type: _self.data.type,
                    content: _self.data.content,
                    price: _self.data.price
                }, {}, {
                    token: app.globalData.userInfo.token
                },
                (res) => {
                    console.log(res)
                    graceJS.msgSuccess('修改成功！', () => {
                        _self.hideModal()
                        setTimeout(() => {
                            _self.getData(_self.data.shopInfo.id)
                        }, 1500)
                    })
                }
            )
        }
    },
    frozenOrThaw() {
        var statusText = '冻结'
        var willStatus = 0
        if (this.data.shopInfo.status == 0) {
            statusText = '解冻'
            willStatus = 1
        }
        wx.showModal({
            title: '提示',
            content: '确定要' + statusText + '此店铺吗？',
            success(res) {
                if (res.confirm) {
                    graceJS.showLoading('Loading...')
                    graceJS.setAfter(() => {
                        wx.hideLoading()
                    })
                    graceJS.post(
                        'admin/shop/frozenOrThaw', {
                            id: _self.data.shopInfo.id,
                            status: willStatus
                        }, {}, {
                            token: app.globalData.userInfo.token
                        },
                        (res) => {
                            wx.navigateBack({
                                complete: () => {
                                    graceJS.msgSuccess('修改成功！')
                                }
                            })
                        }
                    )
                }
            }
        })
    }
})