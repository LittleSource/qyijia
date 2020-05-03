//app.js
var _self = null
App({
  onLaunch: function () {
    _self = this
    wx.getStorage({
      key: 'userInfo',
      success (res) {
        _self.globalData.userInfo = res.data
      }
    })
  },
  globalData: {
    userInfo: null,
    shoppingCart:[]
  }
})