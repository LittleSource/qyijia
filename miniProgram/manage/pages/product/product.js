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
                if (res.length == 0) {
                    wx.navigateBack({
                        complete: () => {
                            graceJS.msg('请先添加分类')
                        }
                    })
                } else {
                    _self.setData({
                        dataList: res
                    })
                }
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
    edit: function (e) {
        var pro = this.data.dataList[e.currentTarget.dataset.classindex].product[e.currentTarget.dataset.proindex]
        pro.classIndex = e.currentTarget.dataset.classindex
        wx.navigateTo({
            url: '/manage/pages/editProduct/editProduct?isadd=0',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                someEvent: function (data) {
                    console.log(data)
                }
            },
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('proData', pro)
            }
        })
    },
    onClick(e) {
        //跳转新增页面
        graceJS.navigate('/manage/pages/editProduct/editProduct?isadd=1')
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