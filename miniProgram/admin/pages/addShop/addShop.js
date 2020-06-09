var graceJS = require('../../../utils/grace');
const app = getApp()
var _self = null
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userId: '',
        userInfo: null
    },
    onLoad() {
        _self = this
    },
    idInput(e) {
        this.setData({
            userId: e.detail.value
        })
    },
    search() {
        var id = parseInt(this.data.userId)
        if (!isNaN(id)) {
            graceJS.showLoading('Loading...')
            graceJS.setAfter(() => {
                wx.hideLoading()
            })
            graceJS.post(
                'admin/shop/getUserInfo', {
                    id: id
                }, {}, {
                    token: app.globalData.userInfo.token
                },
                (res) => {
                    _self.setData({
                        userInfo: res
                    })
                }
            )
        } else {
            graceJS.msg('请输入正确的亿家号！')
        }
    },
    addShop() {
        if (!this.data.userInfo || this.data.userInfo.type == 2) {
            return
        }
        wx.showModal({
            title: '提示',
            content: '确定要此用户开通店铺吗？',
            success(res) {
                if (res.confirm) {
                    graceJS.showLoading('Loading...')
                    graceJS.setAfter(() => {
                        wx.hideLoading()
                    })
                    graceJS.post(
                        'admin/shop/add', {
                            id: _self.data.userInfo.id
                        }, {}, {
                            token: app.globalData.userInfo.token
                        },
                        (res) => {
                            wx.navigateBack({
                                complete: () => {
                                    graceJS.msgSuccess('开通成功！')
                                }
                            })
                        }
                    )
                }
            }
        })
    }
})