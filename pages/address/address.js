// pages/address/address.js
const app = getApp()
const graceJS = require('../../utils/grace.js');
var _self = null
var eventChannel = null
Page({
    /**
     * 页面的初始数据
     */
    data: {
        toggle: false,
        isSelect: false, //是否从下单页面进入 以控制地址列表点击事件
        isFirstAdd: false, //是否第一次添加
        actions: [{
            name: '修改',
            color: '#fff',
            fontsize: '22',
            width: 60,
            background: '#ff7900'
        }, {
            name: '删除',
            color: '#fff',
            fontsize: '22',
            width: 60,
            background: '#ed3f14'
        }],
        addressList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.type == 'cashier') {
            eventChannel = this.getOpenerEventChannel()
            this.setData({
                isSelect: true
            })
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.checkLogin()
        _self = this
        graceJS.showLoading('Loading...')
        graceJS.setAfter(() => {
            wx.hideLoading()
        })
        graceJS.post(
            '/common/address/getAddressList', {}, {}, {
                token: app.globalData.userInfo.token
            }, (res) => {
                _self.setData({
                    addressList: res.addressList
                })
                if (res.addressList.length == 0) {
                    _self.setData({
                        isFirstAdd: true
                    })
                }
            }
        )
    },
    handlerCloseButton(e) {
        if (e.detail.index) { //删除
            if(e.detail.item.is_default){
                graceJS.msg('默认地址不可删除！')
            }else{
                wx.showModal({
                    title: '提示',
                    content: '确定删除此地址吗？',
                    success(res) {
                        if (res.confirm) {
                            graceJS.post(
                                'common/address/delete', {
                                    id: e.detail.item.id
                                }, {}, {
                                    token: app.globalData.userInfo.token
                                },
                                (res) => {
                                    graceJS.msgSuccess('删除成功', () => {
                                        _self.onShow()
                                    })
                                }
                            )
                        }
                    }
                })
            }
            //let id = e.detail.item.id
        } else { //修改
            let isOnlyOne = 0
            if(this.data.addressList.length == 1){
                isOnlyOne = 1
            }
            wx.navigateTo({
                url: '/pages/editAddress/editAddress?isadd=0&isonlyone='+isOnlyOne,
                success: function (res) { //向被打开页面传送数据
                    res.eventChannel.emit('addressData', e.detail.item)
                }
            })
        }
        setTimeout(() => {
            this.setData({ //list中可以每一项都设置toggle
                toggle: this.data.toggle ? false : true
            })
        }, 200)
    },
    addAddress(e) {
        let url = '/pages/editAddress/editAddress?isadd=1&isfirst=0'
        if (this.data.isFirstAdd) {
            url = '/pages/editAddress/editAddress?isadd=1&isfirst=1'
        }
        graceJS.navigate(url)
    },
    selectAddress(e) {
        if (this.data.isSelect) {
            eventChannel.emit('acceptAddress', this.data.addressList[e.currentTarget.dataset.index])
            wx.navigateBack()
        }
    }
})