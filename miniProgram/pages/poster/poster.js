// pages/poster/poster.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        capsuleHeight: 50,
        capsuleTop: 80
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var capsuleButton = wx.getMenuButtonBoundingClientRect() //获取胶囊的布局信息
        this.setData({
            capsuleHeight: capsuleButton.height,
            capsuleTop: capsuleButton.top
        })
    },
    back() {
        wx.navigateBack()
    }
})