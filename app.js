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
      wx.navigateTo({
        url: '/pages/login/login?type=1&path=/pages/mine/mine',
        success:function (e) {
          wx.showToast({
            title: '请先登录!',
            icon:'none'
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    goodsInfo: {},
  }
})