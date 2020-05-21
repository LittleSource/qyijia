var graceJS = require('../../../utils/grace');
const app = getApp()
var _self = null
Page({
    data: {
        dataList: [],
        btnList: [{
            bgColor: "#16C2C2",
            text: "增加",
            fontSize: 26,
            color: "#fff"
        }],
        //手风琴效果
        current: -1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        _self = this
        wx.startPullDownRefresh()
    },
    onPullDownRefresh: function () {
        graceJS.setAfter(() => {
            wx.stopPullDownRefresh()
        })
        graceJS.post(
            'manage/product/getlist', {}, {}, {
                token: app.globalData.userInfo.token
            },
            (res) => {
                _self.setData({
                    dataList: res
                })
            }
        )
    },
    change(e) {
        //可关闭自身
        let index = e.detail.index
        this.setData({
            current: this.data.current == index ? -1 : index
        })
    },
    onClick(e) {
        //此处跳转新增页面
    },
    delete(e) {
        wx.showModal({
            title: '提示',
            content: '确定删除此商品吗？',
            success(res) {
                if (res.confirm) {
                    graceJS.showLoading('Loading...')
                    graceJS.setAfter(() => {
                        wx.hideLoading()
                    })
                    graceJS.post(
                        'manage/product/delete', {
                            id: e.currentTarget.dataset.proid
                        }, {}, {
                            token: app.globalData.userInfo.token
                        },
                        (res) => {
                            graceJS.msgSuccess('删除成功', () => {
                                wx.startPullDownRefresh()
                            })
                        }
                    )
                }
            }
        })
    }
})