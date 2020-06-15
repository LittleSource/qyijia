const app = getApp()
Page({
    data: {
        dev: 1, //是否程序sh模式
        userInfo: null
    },
    onShow: function () {
        this.setData({
            dev: app.globalData.dev,
            userInfo: app.globalData.userInfo
        })
    },
    login() {
        //判断是否为登录状态
        if (this.data.userInfo === null) {
            wx.navigateTo({
                url: '/pages/login/login?path=/pages/mine/mine&type=1',
            })
        } else {
            wx.navigateTo({
                url: '/pages/userInfo/userInfo',
            })
        }
    },
    detail(e) {
        if (e.currentTarget.dataset.url) {
            wx.navigateTo({
                url: e.currentTarget.dataset.url
            })
        } else {
            wx.showToast({
                title: "功能尚未完善~",
                icon: "none"
            })
        }
    },
    goPoster() {
        if (this.data.dev) {
            return
        }
        wx.navigateTo({
            url: '/pages/poster/poster',
        })
    },
    myShop() {
        if (!this.data.userInfo) {
            wx.navigateTo({
                url: '/pages/login/login?type=1&path=/pages/mine/mine',
                success: function (e) {
                    wx.showToast({
                        title: '请先登录!',
                        icon: 'none'
                    })
                }
            })
        } else if (this.data.userInfo.type == 1) {
            this.goPoster()
        } else {
            wx.navigateTo({
                url: '/manage/pages/index/index',
            })
        }
    },
    goAdmin() {
        wx.navigateTo({
            url: '/admin/pages/index/index',
        })
    },
    href(e) {
        let index = Number(e.currentTarget.dataset.index)
        if (index !== 5) {
            wx.navigateTo({
                url: "/pages/order/order?index=" + index
            })
        } else {
            wx.showToast({
                title: "此功能内测中，即将上线~",
                icon: "none"
            })
        }
    }
})