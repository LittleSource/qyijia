//app.js
var _self = null
App({
  onLaunch: function () {
    _self = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        _self.globalData.userInfo = res.data
      }
    })
  },
  checkLogin() {
    if (!this.globalData.userInfo) {
      wx.redirectTo({
        url: '/pages/login/login?type=1&path=/pages/mine/mine',
        success: function (e) {
          wx.showToast({
            title: '请先登录!',
            icon: 'none'
          })
        }
      })
    }
  },
  globalData: {
    dev: 1,
    config: {
      name: '麒亿家',
      phone: '13388888888',
      email: '13388888888@163.com',
      version: '1.1.0',
      qrcode: 'https://cdn.ymkj8.com/qyj/static/qrcode.jpg'
    },
    userInfo: null,
    positionInfo: null,
    goodsInfo: {},
  }
})