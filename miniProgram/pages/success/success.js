let config = getApp().globalData.config;
Page({
  data: {
    appName: config.name
  },
  go(e) {
    let page = e.currentTarget.dataset.page
    if (page == 1) {
      wx.switchTab({
        url: "/pages/index/index"
      })
    } else {
      wx.redirectTo({
        url: '/pages/order/order'
      })
    }
  }
})